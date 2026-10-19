"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const SHOTS_PER_ROUND = 5;
const COLS = 3;
const ROWS = 2;
const ZONE_NAMES = ["top left", "top center", "top right", "bottom left", "bottom center", "bottom right"];

// Goal frame, in percent of the play area (aspect 16 / 11).
const GOAL = { x: 10, y: 8, w: 80, h: 58 };
const SPOT = { x: 50, y: 88 };

type Phase = "aim" | "flight" | "result" | "done";
type Shot = { zone: number; keeper: number; goal: boolean };

function zoneCenter(zone: number) {
  const col = zone % COLS;
  const row = Math.floor(zone / COLS);
  return {
    x: GOAL.x + (GOAL.w / COLS) * (col + 0.5),
    y: GOAL.y + (GOAL.h / ROWS) * (row + 0.5),
  };
}

// Where the keeper's center ends up for each dive, plus body rotation.
function keeperPose(zone: number | null) {
  if (zone === null) return { x: 50, y: 47, rotate: 0 };
  const col = zone % COLS;
  const top = zone < COLS;
  const x = zoneCenter(zone).x;
  if (col === 1) return { x, y: top ? 36 : 52, rotate: 0 };
  const dir = col === 0 ? -1 : 1;
  return { x, y: top ? 34 : 52, rotate: dir * (top ? 65 : 85) };
}

// Small seeded PRNG so the keeper is deterministic per visit but feels random.
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Keeper leans toward the columns of the player's last two shots.
function pickKeeperZone(rng: () => number, recent: number[]) {
  const row = rng() < 0.5 ? 0 : 1;
  if (recent.length > 0 && rng() < 0.55) {
    const col = recent[Math.floor(rng() * recent.length)] % COLS;
    return row * COLS + col;
  }
  return Math.floor(rng() * COLS * ROWS);
}

// Low shots are saved if the keeper picks the right side; top shots need the exact corner.
function isSaved(shot: number, keeper: number) {
  const sameCol = shot % COLS === keeper % COLS;
  const shotLow = shot >= COLS;
  return sameCol && (shot === keeper || shotLow);
}

function verdict(goals: number) {
  if (goals === 5) return "Top corner merchant.";
  if (goals === 4) return "Clinical.";
  if (goals === 3) return "Solid. The keeper got a couple.";
  return "Keeper read you like a PDF.";
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function PenaltyBox() {
  const [phase, setPhase] = useState<Phase>("aim");
  const [shots, setShots] = useState<Shot[]>([]);
  const [current, setCurrent] = useState<Shot | null>(null);
  const [aim, setAim] = useState(1);
  const [announcement, setAnnouncement] = useState("");

  const rng = useRef(mulberry32(2026));
  const timers = useRef<number[]>([]);
  const zoneRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const againRef = useRef<HTMLButtonElement>(null);

  const goals = shots.filter((s) => s.goal).length;

  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (phase === "done") againRef.current?.focus();
  }, [phase]);

  const shoot = useCallback(
    (zone: number) => {
      if (phase !== "aim") return;
      const recent = shots.slice(-2).map((s) => s.zone);
      const keeper = pickKeeperZone(rng.current, recent);
      const shot = { zone, keeper, goal: !isSaved(zone, keeper) };
      const reduced = prefersReducedMotion();

      setAim(zone);
      setCurrent(shot);
      setPhase("flight");

      timers.current.push(
        window.setTimeout(
          () => {
            const next = [...shots, shot];
            const total = next.filter((s) => s.goal).length;
            setShots(next);
            setPhase("result");
            setAnnouncement(
              `${shot.goal ? "Goal!" : "Saved."} Shot ${next.length} of ${SHOTS_PER_ROUND}. Score ${total}.`,
            );
            timers.current.push(
              window.setTimeout(
                () => {
                  setCurrent(null);
                  if (next.length >= SHOTS_PER_ROUND) {
                    setPhase("done");
                    setAnnouncement(`Final score ${total} out of ${SHOTS_PER_ROUND}. ${verdict(total)}`);
                  } else {
                    setPhase("aim");
                    zoneRefs.current[zone]?.focus();
                  }
                },
                reduced ? 900 : 1100,
              ),
            );
          },
          reduced ? 0 : 450,
        ),
      );
    },
    [phase, shots],
  );

  const restart = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setShots([]);
    setCurrent(null);
    setPhase("aim");
    setAnnouncement("New round. Five shots.");
    zoneRefs.current[aim]?.focus();
  }, [aim]);

  function moveAim(e: React.KeyboardEvent, from: number) {
    const col = from % COLS;
    const row = Math.floor(from / COLS);
    let next = from;
    if (e.key === "ArrowLeft") next = row * COLS + Math.max(0, col - 1);
    else if (e.key === "ArrowRight") next = row * COLS + Math.min(COLS - 1, col + 1);
    else if (e.key === "ArrowUp") next = col;
    else if (e.key === "ArrowDown") next = COLS + col;
    else return;
    e.preventDefault();
    setAim(next);
    zoneRefs.current[next]?.focus();
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if ((e.key === "r" || e.key === "R") && !e.metaKey && !e.ctrlKey && !e.altKey) {
      e.preventDefault();
      restart();
    }
  }

  const target = current ? zoneCenter(current.zone) : SPOT;
  const ball = phase === "flight" || phase === "result" ? target : SPOT;
  const keeper = keeperPose(current && phase !== "aim" ? current.keeper : null);
  const resultShot = phase === "result" ? shots[shots.length - 1] : null;
  const zoneW = GOAL.w / COLS;
  const zoneH = GOAL.h / ROWS;

  return (
    <div onKeyDown={onKeyDown} className="w-full max-w-2xl">
      {/* Scoreboard */}
      <div className="mb-4 flex items-center justify-between font-mono text-xs uppercase tracking-[0.14em] text-muted">
        <ol className="flex gap-2" aria-label="Shots this round">
          {Array.from({ length: SHOTS_PER_ROUND }, (_, i) => {
            const s = shots[i];
            return (
              <li
                key={i}
                aria-label={s ? (s.goal ? `Shot ${i + 1}: goal` : `Shot ${i + 1}: saved`) : `Shot ${i + 1}: not taken`}
                className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                  s ? (s.goal ? "border-ink bg-ink" : "border-mark text-mark") : "border-rule"
                }`}
              >
                {s && !s.goal && <span aria-hidden="true">×</span>}
              </li>
            );
          })}
        </ol>
        <span>
          Score <span className="font-display text-lg text-ink">{goals}</span> / {SHOTS_PER_ROUND}
        </span>
      </div>

      {/* Pitch */}
      <div className="relative aspect-[16/11] w-full select-none overflow-hidden border border-rule">
        <svg
          aria-hidden="true"
          viewBox="0 0 160 110"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
        >
          <defs>
            <pattern id="pb-net" width="4" height="4" patternUnits="userSpaceOnUse">
              <path d="M0 0 L4 4 M4 0 L0 4" stroke="var(--rule)" strokeWidth="0.4" />
            </pattern>
          </defs>
          <g className="pb-net" data-ripple={resultShot?.goal ?? false}>
            <rect x="16" y="8.8" width="128" height="63.8" fill="url(#pb-net)" />
          </g>
          {/* ground line, penalty spot, six-yard box */}
          <line x1="0" y1="72.6" x2="160" y2="72.6" stroke="var(--rule)" strokeWidth="0.6" />
          <path d="M34 72.6 L30 84 L130 84 L126 72.6" fill="none" stroke="var(--rule)" strokeWidth="0.5" />
          <circle cx="80" cy="96.8" r="0.9" fill="var(--muted)" />
          {/* posts and crossbar */}
          <path
            d="M16 72.6 L16 8.8 L144 8.8 L144 72.6"
            fill="none"
            stroke="var(--ink)"
            strokeWidth="1.6"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {/* Keeper */}
        <div
          aria-hidden="true"
          className="pb-keeper pointer-events-none absolute h-[34%] w-[14%]"
          style={{
            left: `${keeper.x}%`,
            top: `${keeper.y}%`,
            transform: `translate(-50%, -50%) rotate(${keeper.rotate}deg)`,
          }}
        >
          <svg viewBox="0 0 40 60" className="h-full w-full">
            <circle cx="20" cy="8" r="5.5" fill="var(--ink)" />
            <rect x="12" y="15" width="16" height="22" rx="3" fill="var(--ink)" />
            <path d="M12 18 L3 6 M28 18 L37 6" stroke="var(--ink)" strokeWidth="4" strokeLinecap="round" />
            <circle cx="3" cy="5" r="3.2" fill="var(--pool)" />
            <circle cx="37" cy="5" r="3.2" fill="var(--pool)" />
            <path d="M15 37 L13 56 M25 37 L27 56" stroke="var(--ink)" strokeWidth="4.5" strokeLinecap="round" />
          </svg>
        </div>

        {/* Ball */}
        <div
          aria-hidden="true"
          className="pb-ball pointer-events-none absolute aspect-square w-[5.5%]"
          style={{
            left: `${ball.x}%`,
            top: `${ball.y}%`,
            transform: `translate(-50%, -50%) scale(${ball === SPOT ? 1 : 0.72})`,
          }}
        >
          <svg viewBox="0 0 20 20" className="h-full w-full">
            <circle cx="10" cy="10" r="9" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1.5" />
            <path d="M10 6 L13.8 8.8 L12.4 13.2 L7.6 13.2 L6.2 8.8 Z" fill="var(--ink)" />
          </svg>
        </div>

        {/* Target zones */}
        {ZONE_NAMES.map((name, i) => {
          const col = i % COLS;
          const row = Math.floor(i / COLS);
          return (
            <button
              key={name}
              ref={(el) => {
                zoneRefs.current[i] = el;
              }}
              type="button"
              tabIndex={phase !== "done" && i === aim ? 0 : -1}
              aria-label={`Shoot ${name}`}
              aria-disabled={phase !== "aim"}
              onClick={() => shoot(i)}
              onKeyDown={(e) => moveAim(e, i)}
              onFocus={() => setAim(i)}
              className="group absolute flex touch-manipulation items-center justify-center focus-visible:outline-none"
              style={{
                left: `${GOAL.x + zoneW * col}%`,
                top: `${GOAL.y + zoneH * row}%`,
                width: `${zoneW}%`,
                height: `${zoneH}%`,
              }}
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 40 40"
                className={`h-10 w-10 text-mark transition-opacity duration-150 ${
                  phase === "aim" ? "opacity-0 group-hover:opacity-70 group-focus-visible:opacity-100" : "opacity-0"
                }`}
              >
                <path
                  d="M33 9 C 27 2, 10 3, 6 13 C 2 24, 12 36, 23 34 C 35 32, 38 20, 32 11"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path d="M20 13 V27 M13 20 H27" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          );
        })}

        {/* Result flash */}
        {resultShot && (
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute inset-x-0 top-[74%] text-center font-mono text-sm font-semibold uppercase tracking-[0.3em] ${
              resultShot.goal ? "text-ink" : "text-mark"
            }`}
          >
            {resultShot.goal ? "Goal" : "Saved"}
          </div>
        )}

        {/* End of round */}
        {phase === "done" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-paper/90 px-6 text-center">
            <p className="font-display text-6xl font-extrabold tracking-[-0.03em] sm:text-7xl">
              {goals} / {SHOTS_PER_ROUND}
            </p>
            <p className="text-lg">{verdict(goals)}</p>
            <button
              ref={againRef}
              type="button"
              onClick={restart}
              className="mt-2 border border-ink px-5 py-2.5 font-mono text-xs uppercase tracking-[0.16em] hover:bg-ink hover:text-paper"
            >
              Again
            </button>
          </div>
        )}
      </div>

      <p className="sr-only" aria-live="polite">
        {announcement}
      </p>

      <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
        <span className="sm:hidden">Tap a zone to shoot.</span>
        <span className="hidden sm:inline">Click a zone, or use arrow keys + Enter. R restarts.</span>
      </p>
    </div>
  );
}

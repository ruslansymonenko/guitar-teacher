"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Metronome component with tempo control, start/stop, and beat visualization.
 */
export default function Metronome() {
  const [bpm, setBpm] = useState<number>(100);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [beatTick, setBeatTick] = useState<number>(0);

  const intervalIdRef = useRef<number | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const playClick = () => {
    if (typeof window === "undefined") return;
    if (!audioCtxRef.current) {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      audioCtxRef.current = ctx;
    }
    const ctx = audioCtxRef.current!;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "square";
    osc.frequency.value = 1000;
    gain.gain.value = 0.0001;
    osc.connect(gain);
    gain.connect(ctx.destination);
    const t = ctx.currentTime;
    gain.gain.setValueAtTime(0.001, t);
    gain.gain.exponentialRampToValueAtTime(0.3, t + 0.001);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.05);
    osc.start();
    osc.stop(t + 0.06);
  };

  const start = () => {
    if (isRunning) return;
    setIsRunning(true);
  };

  const stop = () => {
    setIsRunning(false);
  };

  useEffect(() => {
    if (!isRunning) {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
        intervalIdRef.current = null;
      }
      return;
    }
    const intervalMs = Math.max(30, Math.round(60000 / bpm));
    playClick();
    setBeatTick((n) => n + 1);
    const id = window.setInterval(() => {
      playClick();
      setBeatTick((n) => n + 1);
    }, intervalMs);
    intervalIdRef.current = id;
    return () => {
      clearInterval(id);
      intervalIdRef.current = null;
    };
  }, [isRunning, bpm]);

  useEffect(() => {
    return () => {
      if (intervalIdRef.current) clearInterval(intervalIdRef.current);
      if (audioCtxRef.current) audioCtxRef.current.close().catch(() => {});
    };
  }, []);

  const handleTempoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = Number(e.target.value);
    if (Number.isNaN(next)) return;
    setBpm(Math.min(240, Math.max(30, Math.round(next))));
  };

  return (
    <div className="rounded border p-4 space-y-4">
      <div className="flex items-center gap-4">
        <label htmlFor="bpm" className="text-sm text-gray-600">Tempo (BPM)</label>
        <input
          id="bpm"
          type="number"
          min={30}
          max={240}
          value={bpm}
          onChange={handleTempoChange}
          className="w-24 rounded border px-2 py-1 bg-white/60 dark:bg-black/30"
        />
        <input
          type="range"
          min={30}
          max={240}
          value={bpm}
          onChange={handleTempoChange}
          className="flex-1"
        />
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={start}
          disabled={isRunning}
          className="rounded bg-primary text-primary-foreground px-4 py-2 disabled:opacity-60"
        >
          Start
        </button>
        <button
          onClick={stop}
          disabled={!isRunning}
          className="rounded border px-4 py-2 disabled:opacity-60"
        >
          Stop
        </button>
      </div>

      <BeatVisualizer key={beatTick} />
    </div>
  );
}

function BeatVisualizer() {
  return (
    <div className="flex items-center justify-center pt-2">
      <div
        aria-label="beat-visualizer"
        className="h-16 w-16 rounded-full bg-secondary shadow-inner"
        style={{
          animation: "metronomeBeat 120ms ease-out 1",
        }}
      />
      <style jsx>{`
        @keyframes metronomeBeat {
          0% { transform: scale(0.9); filter: brightness(0.9); }
          50% { transform: scale(1.1); filter: brightness(1.2); }
          100% { transform: scale(1.0); filter: brightness(1.0); }
        }
      `}</style>
    </div>
  );
}



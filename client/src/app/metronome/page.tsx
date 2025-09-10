"use client";

import Metronome from "@/components/Metronome";

export default function MetronomePage() {
  return (
    <div className="min-h-screen p-8 max-w-xl mx-auto">
      <h1 className="text-xl font-semibold mb-4">Metronome</h1>
      <Metronome />
    </div>
  );
}


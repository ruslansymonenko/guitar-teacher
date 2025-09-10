import CircleOfFifths from "@/components/CircleOfFifths";

export default function Page() {
  return (
    <main className="mx-auto max-w-xl px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4">Circle of Fifths</h1>
      <p className="text-sm text-muted-foreground mb-6">
        Explore key relationships around the circle.
      </p>
      <CircleOfFifths />
    </main>
  );
}



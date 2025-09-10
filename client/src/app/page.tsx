import Link from "next/link";

async function fetchChords() {
	const res = await fetch(process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/chords", { cache: "no-store" });
	if (!res.ok) throw new Error("Failed to fetch chords");
	return res.json() as Promise<Array<{ id: number; name: string }>>;
}

export default async function Home() {
	const chords = await fetchChords();
	return (
		<div className="min-h-screen p-8 max-w-xl mx-auto">
			<h1 className="text-3xl font-bold mb-6 text-primary">Guitar Teacher</h1>
			<p className="text-sm text-gray-500 mb-4">Saved chords</p>
			<ul className="space-y-2">
				{chords.map((chord) => (
					<li key={chord.id}>
						<Link className="block rounded border px-4 py-2 hover:bg-gray-50" href={`/chord/${encodeURIComponent(chord.id)}`}>
							{chord.name}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}

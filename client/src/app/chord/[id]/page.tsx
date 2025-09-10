import Link from "next/link";

type Chord = {
	id: number;
	name: string;
	tuning: string;
	frets: number[]; // length 6 from low E to high e, -1 for muted
	fingers: number[];
	baseFret: number;
};

async function fetchChord(idOrName: string): Promise<Chord> {
	const url = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"}/chords/${encodeURIComponent(idOrName)}`;
	const res = await fetch(url, { cache: "no-store" });
	if (!res.ok) throw new Error("Failed to fetch chord");
	return res.json();
}

function ChordDiagram({ chord }: { chord: Chord }) {
	// Simple grid: 5 frets tall x 6 strings wide
	const numFrets = 5;
	const width = 240;
	const height = 260;
	const padding = 24;
	const gridWidth = width - padding * 2;
	const gridHeight = height - padding * 2;
	const stringSpacing = gridWidth / 5; // 6 strings -> 5 gaps
	const fretSpacing = gridHeight / numFrets;

	const xForString = (s: number) => padding + s * stringSpacing;
	const yForFret = (f: number) => padding + f * fretSpacing;

	const minFret = Math.max(1, chord.baseFret);

	return (
		<svg width={width} height={height} className="border rounded bg-white">
			{/* strings */}
			{Array.from({ length: 6 }).map((_, s) => (
				<line key={s} x1={xForString(s)} y1={padding} x2={xForString(s)} y2={height - padding} stroke="#333" strokeWidth={2} />
			))}
			{/* frets */}
			{Array.from({ length: numFrets + 1 }).map((_, f) => (
				<line key={f} x1={padding} y1={yForFret(f)} x2={width - padding} y2={yForFret(f)} stroke="#666" strokeWidth={f === 0 && minFret === 1 ? 6 : 2} />
			))}
			{/* nuts label */}
			{textLabel(`${minFret}fr`, padding, padding - 6)}
			{/* dots */}
			{chord.frets.map((fret, s) => {
				if (fret <= 0) return null; // open or muted handled below
				const fretOffset = fret - minFret + 1;
				if (fretOffset < 1 || fretOffset > numFrets) return null;
				return (
					<circle key={s} cx={xForString(s)} cy={yForFret(fretOffset) - fretSpacing / 2} r={10} fill="#111" />
				);
			})}
			{/* open (0) and muted (-1) markers above nut */}
			{chord.frets.map((fret, s) => {
				const x = xForString(s);
				const y = padding - 10;
				if (fret === 0) {
					return <circle key={`o-${s}`} cx={x} cy={y} r={6} stroke="#111" fill="none" strokeWidth={2} />;
				}
				if (fret < 0) {
					return (
						<text key={`x-${s}`} x={x} y={y + 4} textAnchor="middle" fontSize={12} fill="#111">X</text>
					);
				}
				return null;
			})}
		</svg>
	);
}

function textLabel(text: string, x: number, y: number) {
	return (
		<text x={x} y={y} fontSize={12} fill="#444">
			{text}
		</text>
	);
}

export default async function ChordPage({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	const chord = await fetchChord(id);
	return (
		<div className="min-h-screen p-8 max-w-xl mx-auto">
			<Link href="/" className="text-sm text-blue-600">← Back</Link>
			<h1 className="text-3xl font-bold mt-2 mb-6">{chord.name}</h1>
			<div className="mb-4 text-gray-600 text-sm">Tuning: {chord.tuning}</div>
			<ChordDiagram chord={chord} />
		</div>
	);
}

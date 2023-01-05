const BASES = Array.from({ length: 36 }, (_, i) => i).map(i => i + 1);

const REGEX = BASES.map(i => {
	const chars = "0123456789abcdefghijklmnopqrstuvwxyz".slice(0, i);
	return `^[${chars}.]+(?:e\\+[0-9]+)?$` as const;
});

export enum Type {
	Input,
	Output,
}

export type ControlProps = {
	type: Type;
	bases: () => [number, number];
	setBases: (bases: [number, number]) => void;
	value: () => string;
	setValue: (value: string) => void;
};

export default function Control({ type, bases, setBases, value, setValue }: ControlProps) {
	type = type === Type.Input ? Type.Input : Type.Output;
	const base = () => bases()[type];

	const computedValue = () => {
		if (type === Type.Input) return value();
		if (bases()[0] === bases()[1]) return value();
		// Handle base-1
		if (bases()[0] === 1) return value().length.toString(bases()[1]);
		if (bases()[1] === 1) return "1".repeat(parseInt(value(), bases()[0]));
		const num = parseInt(value(), bases()[0]);
		if (Number.isNaN(num)) return "";
		return num.toString(bases()[1]);
	};

	return (
		<div class="flex flex-col items-center gap-2 rounded bg-gray-200 p-4">
			<div class="flex items-center gap-2">
				<label for={`${base()}`}>Base</label>
				<select
					id={`${base()}`}
					name={`${base()}`}
					class="rounded"
					value={base()}
					onInput={e => {
						const base = parseInt((e.target as HTMLSelectElement).value);
						setBases([type === Type.Input ? base : bases()[0], type === Type.Output ? base : bases()[1]]);
					}}
				>
					{BASES.map(i => (
						<option value={i}>{i}</option>
					))}
				</select>
			</div>
			<div class="flex items-center gap-2">
				<label for={Type[type]}>{type === Type.Input ? "Input" : "Output"}</label>
				<input
					type="text"
					id={Type[type]}
					name={Type[type]}
					pattern={REGEX[base() - 1]}
					class="rounded px-1"
					value={computedValue()}
					onInput={e => setValue((e.target as HTMLInputElement).value)}
					readOnly={type === Type.Output}
				/>
			</div>
		</div>
	);
}

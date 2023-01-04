const BASES = Array.from({ length: 35 }, (_, i) => i).map(i => i + 2);

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
	const base = () => bases()[type === Type.Input ? 0 : 1];

	const computedValue = () => {
		if (type === Type.Input) return value();
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
					{REGEX.map((_, i) => (
						<option value={i + 2}>{i + 2}</option>
					))}
				</select>
			</div>
			<div class="flex items-center gap-2">
				<label for={Type[type]}>{type === Type.Input ? "Input" : "Output"}</label>
				<input
					type="text"
					id={Type[type]}
					name={Type[type]}
					pattern={REGEX[base() - 2]}
					class="rounded"
					value={computedValue()}
					onInput={e => setValue((e.target as HTMLInputElement).value)}
					readOnly={type === Type.Output}
				/>
			</div>
		</div>
	);
}

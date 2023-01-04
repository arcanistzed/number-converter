import { Component, createSignal } from "solid-js";
import Control, { Type } from "./components/Control";

const App: Component = () => {
	const [bases, setBases] = createSignal([10, 2] as [number, number]);
	const [value, setValue] = createSignal("");

	return (
		<>
			<header class="py-8">
				<h1 class="text-center text-2xl font-bold text-gray-700">Number Converter</h1>
			</header>
			<main class="p-4">
				<form class="flex flex-wrap justify-evenly gap-4">
					<Control type={Type.Input} bases={bases} setBases={setBases} value={value} setValue={setValue} />
					<Control type={Type.Output} bases={bases} setBases={setBases} value={value} setValue={setValue} />
				</form>
			</main>
		</>
	);
};

export default App;

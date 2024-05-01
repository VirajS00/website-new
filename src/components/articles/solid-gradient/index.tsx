import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import styles from "./solid-gradient.module.scss";

export const SolidGradientExample = component$(() => {
	const rangeValue = useSignal(60);

	return (
		<div class='example-container'>
			<div
				class={styles.gradientExample}
				style={`--gradient-percentage:${rangeValue.value}%`}></div>
			<div class={styles.ControlsContainer}>
				<input
					type='range'
					name='range-solid-gradient'
					id='range-solid-gradient'
					value={rangeValue.value}
					onInput$={(e) => (rangeValue.value = (e as any).target.value)}
					max={60}
					min={20}
					class='rangeInput'
					step={10}
				/>
				<label for='range-solid-gradient' class='hidden'>
					Blue gradient percentage
				</label>
				<div>
					<p>Gradient Blue Percentage: {rangeValue.value}%</p>
					<p>Gradient White start percent: 60%</p>
				</div>
			</div>
		</div>
	);
});

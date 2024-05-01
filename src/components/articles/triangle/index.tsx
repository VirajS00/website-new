import { component$, useSignal } from "@builder.io/qwik";
import styles from "./triangle.module.scss";

export const Triangle = component$(() => {
	const rangeValue = useSignal(80);

	return (
		<div class='example-container'>
			<div
				class={styles.triangles}
				style={`--border-width:${rangeValue.value}px`}></div>
			<div class={styles.ControlsContainer}>
				<input
					type='range'
					name='range-triangle'
					id='range-triangle'
					value={rangeValue.value}
					onInput$={(e) => (rangeValue.value = (e as any).target.value)}
					max={80}
					min={5}
					class='rangeInput'
					step={5}
				/>
				<label for='range-triangle' class='hidden'>
					Blue gradient percentage
				</label>
				<p>Border Thickness: {rangeValue.value}px</p>
			</div>
		</div>
	);
});

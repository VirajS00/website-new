import { createSignal, type Component, createEffect } from "solid-js";
import styles from "./triangle.module.scss";

export const Triangle: Component = () => {
	const [rangeValue, setRangeValue] = createSignal(80);
	let trianglesEl: HTMLDivElement | undefined;

	createEffect(() => {
		if (!trianglesEl) return;

		trianglesEl.style.setProperty("--border-width", `${rangeValue()}px`);
	});

	return (
		<div class='example-container'>
			<div class={styles.triangles} ref={trianglesEl}></div>
			<div class={styles.ControlsContainer}>
				<input
					type='range'
					name='range-triangle'
					id='range-triangle'
					oninput={(e) => setRangeValue(parseInt(e.target.value))}
					value={rangeValue()}
					max={80}
					min={5}
					class='rangeInput'
					step={5}
				/>
				<label for='range-triangle' class='hidden'>
					Blue gradient percentage
				</label>
				<p>
					Border Thickness:{" "}
					{rangeValue() < 10 ? `0${rangeValue()}` : rangeValue()}px
				</p>
			</div>
		</div>
	);
};

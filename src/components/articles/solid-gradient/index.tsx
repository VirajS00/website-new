import { createSignal, type Component, createEffect } from "solid-js";
import styles from "./solid-gradient.module.scss";

export const SolidGradientExample: Component = () => {
	const [rangeValue, setRangeValue] = createSignal(60);
	let gradientEl: HTMLDivElement | undefined;

	createEffect(() => {
		if (!gradientEl) return;

		gradientEl.style.setProperty("--gradient-percentage", `${rangeValue()}%`);
	});

	return (
		<div class='example-container'>
			<div class={styles.gradientExample} ref={gradientEl}></div>
			<div class={styles.ControlsContainer}>
				<input
					type='range'
					name='range-solid-gradient'
					id='range-solid-gradient'
					onchange={(e) => setRangeValue(parseInt(e.target.value))}
					value={rangeValue()}
					max={60}
					min={20}
					class='rangeInput'
					step={10}
				/>
				<label for='range-solid-gradient' class='hidden'>
					Blue gradient percentage
				</label>
				<div>
					<p>
						Gradient Blue Percentage:{" "}
						{rangeValue() < 10 ? `0${rangeValue()}` : rangeValue()}%
					</p>
					<p>Gradient White start percent: 60%</p>
				</div>
			</div>
		</div>
	);
};

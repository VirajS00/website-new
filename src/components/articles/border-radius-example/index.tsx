import { createSignal, type Component, createEffect } from "solid-js";
import styles from "./border-radius.module.scss";

export const BorderRadiusExample: Component = () => {
	const [rangeValue, setRangeValue] = createSignal(10);
	const [unit, setUnit] = createSignal<"px" | "percent">("px");
	let borderRadiusEl: HTMLDivElement | undefined;

	createEffect(() => {
		if (!borderRadiusEl) return;

		borderRadiusEl.style.setProperty(
			"--border-radius",
			`${rangeValue()}${unit() === "px" ? "px" : "%"}`
		);
	});

	return (
		<div class={`example-container ${styles.exampleContent}`}>
			<div class={styles.borderRadiusContainer} ref={borderRadiusEl}>
				<div class={styles.borderRadiusExaple}></div>
			</div>
			<div class={styles.ControlsContainer}>
				<input
					type='range'
					name='range-solid-gradient'
					id='range-solid-gradient'
					oninput={(e) => setRangeValue(parseInt(e.target.value))}
					value={rangeValue()}
					max={100}
					min={10}
					class='rangeInput'
					step={5}
				/>
				<label for='range-solid-gradient' class='hidden'>
					Border Radius value
				</label>
				<div>
					<p>
						Border Radius: {rangeValue()}
						{unit() === "px" ? "px" : "%"}
					</p>
					<div class={styles.buttonsContainer}>
						<div>
							<input
								type='radio'
								name='unit'
								id='pixel'
								value='px'
								onclick={() => setUnit("px")}
								checked
								class={styles.hideInput}
							/>
							<label for='pixel' class={styles.radioLabel}>
								px
							</label>
						</div>

						<div>
							<input
								type='radio'
								name='unit'
								id='percent'
								value='percent'
								onclick={() => setUnit("percent")}
								class={styles.hideInput}
							/>
							<label for='percent' class={styles.radioLabel}>
								%
							</label>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

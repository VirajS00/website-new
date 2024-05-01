import { component$, useSignal } from "@builder.io/qwik";
import styles from "./border-radius.module.scss";

export const BorderRadiusExample = component$(() => {
	const rangeValue = useSignal<number>(10);
	const unit = useSignal<"px" | "percent">("px");

	return (
		<div class={`example-container ${styles.exampleContent}`}>
			<div
				class={styles.borderRadiusContainer}
				style={`--border-radius: ${rangeValue.value}${
					unit.value === "px" ? "px" : "%"
				}`}>
				<div class={styles.borderRadiusExaple}></div>
			</div>
			<div class={styles.ControlsContainer}>
				<input
					type='range'
					name='range-solid-gradient'
					id='range-solid-gradient'
					value={rangeValue.value}
					onInput$={(e) => (rangeValue.value = (e as any).target.value)}
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
						Border Radius: {rangeValue.value}
						{unit.value === "px" ? "px" : "%"}
					</p>
					<div class={styles.buttonsContainer}>
						<div>
							<input
								type='radio'
								name='unit'
								id='pixel'
								value='px'
								onClick$={() => (unit.value = "px")}
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
								onClick$={() => (unit.value = "percent")}
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
});

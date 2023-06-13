import {
	For,
	type Component,
	createSignal,
	Suspense,
	Switch,
	Match,
	useTransition,
	onMount,
	createEffect,
} from "solid-js";
import styles from "./photos-grid.module.scss";
import type { GetPictureResult } from "@astrojs/image/dist/lib/get-picture";
import { Picture } from "./picture";

interface Props {
	pics: GetPictureResult[];
	randomVals: number[];
}

export const PhotosGrid: Component<Props> = (props) => {
	const [selectedIndex, setSelectedIndex] = createSignal<number | undefined>(
		undefined
	);
	const [pending, start] = useTransition();

	onMount(() => {
		document.addEventListener("keyup", (e) => {
			if (e.key === "Escape") {
				setSelectedIndex(undefined);
			}
		});
	});

	createEffect(() => {
		if (selectedIndex() !== undefined) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "auto";
		}
	});

	const selectImage = (index: number) => start(() => setSelectedIndex(index));

	return (
		<>
			<div class={styles.imagesContainer}>
				<For each={props.pics}>
					{(pic, i) => (
						<a
							class={styles.imageLink}
							style={`grid-row: span ${props.randomVals[i()]};`}
							onclick={() => selectImage(i())}>
							<Picture picture={pic} />
						</a>
					)}
				</For>
			</div>
			<div>
				<Suspense fallback={<div class='loader'>Loading...</div>}>
					<Switch>
						<For each={props.pics}>
							{(pic, i) => (
								<Match when={selectedIndex() === i()}>
									<div
										class={styles.fullScreenImageContainer}
										classList={{ [styles.selected]: selectedIndex() === i() }}>
										<Picture picture={pic} />
									</div>
								</Match>
							)}
						</For>
					</Switch>
				</Suspense>
			</div>
		</>
	);
};

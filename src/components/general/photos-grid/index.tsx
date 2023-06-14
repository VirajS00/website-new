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
import { Picture } from "./picture";
import type { Picture as PictureType } from "../../../types/pictures";

interface Props {
	pics: PictureType[];
	randomVals: number[];
}

export const PhotosGrid: Component<Props> = (props) => {
	const [selectedIndex, setSelectedIndex] = createSignal<number | undefined>(
		undefined
	);

	let imgCont: HTMLDivElement | undefined;

	const selectImage = (index: number) => setSelectedIndex(index);

	onMount(() => {
		document.addEventListener("keyup", (e) => {
			if (e.key === "Escape") {
				setSelectedIndex(undefined);
			}

			if (e.key === "ArrowRight") {
				setSelectedIndex((x) => {
					if (x === undefined) return;
					return x + 1;
				});
			}

			if (e.key === "ArrowLeft") {
				setSelectedIndex((x) => {
					if (x === undefined) return;
					return x - 1;
				});
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

	const onContainerMouseMove = (e: MouseEvent) => {
		if (!imgCont) return;
		const widthHalf = imgCont.clientWidth / 2;

		if (e.clientX > widthHalf) {
			imgCont.style.cursor = "url(/cursor/right.png), e-resize";
		} else {
			imgCont.style.cursor = "url(/cursor/left.png), w-resize";
		}
	};

	const onContainerClick = (e: MouseEvent) => {
		if (!imgCont) return;

		const widthHalf = imgCont.clientWidth / 2;

		if (e.clientX > widthHalf) {
			setSelectedIndex((x) => {
				if (x === undefined) return;
				return x + 1;
			});
		} else {
			setSelectedIndex((x) => {
				if (x === undefined) return;
				return x - 1;
			});
		}
	};

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
				<Switch>
					<For each={props.pics}>
						{(pic, i) => (
							<Match when={selectedIndex() === i()}>
								<div
									class={styles.fullScreenImageContainer}
									onmousemove={onContainerMouseMove}
									onclick={onContainerClick}
									ref={imgCont}>
									<div class={styles.imageCont}>
										<button
											class={styles.button}
											onclick={() => setSelectedIndex(undefined)}>
											&times;
										</button>
										<Picture picture={pic} fit='contain' />
										<div class={styles.caption}>{pic.meta.caption}</div>
									</div>
								</div>
							</Match>
						)}
					</For>
				</Switch>
			</div>
		</>
	);
};

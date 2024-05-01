import {
	component$,
	useSignal,
	useStore,
	useTask$,
	useVisibleTask$,
} from "@builder.io/qwik";
import { Picture } from "./image";
import styles from "./image-styles.module.scss";
import type { ImageType } from "../../../types/image";

export const ImagesGrid = component$<{
	images: ImageType[];
}>((props) => {
	const currentImage = useSignal<number | undefined>(undefined);
	const imageContRef = useSignal<HTMLDivElement | undefined>(undefined);
	const mousePosX = useSignal<"back" | "forward">("back");

	useVisibleTask$(() => {
		document.addEventListener("keyup", (e) => {
			if (e.key === "Escape") {
				currentImage.value = undefined;
			}

			if (e.key === "ArrowRight") {
				currentImage.value =
					typeof currentImage.value === "number"
						? currentImage.value + 1
						: undefined;
			}

			if (e.key === "ArrowLeft") {
				currentImage.value =
					typeof currentImage.value === "number"
						? currentImage.value - 1
						: undefined;
			}
		});

		if (currentImage.value !== undefined) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "auto";
		}
	});

	return (
		<div class={styles.container}>
			{props.images.map((image) => (
				<button
					class={styles.ImageLink}
					onClick$={() => {
						currentImage.value = image.index;
					}}>
					<Picture image={image} />
				</button>
			))}
			{props.images.map((im) => (
				<div
					style={{
						cursor:
							mousePosX.value === "forward"
								? "url(/cursor/right.png), e-resize"
								: "url(/cursor/left.png), w-resize",
					}}
					class={{
						[styles.bigImageContainer]: true,
						[styles.active]: im.index === currentImage.value,
					}}
					onMouseMove$={(e) => {
						if (!imageContRef.value) return;

						const wHalf = imageContRef.value.clientWidth / 2;

						if (e.clientX > wHalf) {
							mousePosX.value = "forward";
						} else {
							mousePosX.value = "back";
						}
					}}
					onClick$={(e) => {
						if (!imageContRef.value) return;

						const wHalf = imageContRef.value.clientWidth / 2;

						if (e.clientX > wHalf) {
							currentImage.value =
								typeof currentImage.value === "number"
									? currentImage.value + 1
									: undefined;
						} else {
							currentImage.value =
								typeof currentImage.value === "number"
									? currentImage.value - 1
									: undefined;
						}
					}}
					ref={imageContRef}>
					<Picture image={im} />
				</div>
			))}
		</div>
	);
});

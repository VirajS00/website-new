import type { Picture as PictureType } from "../../../types/pictures";
import { For, type Component } from "solid-js";

type Props = {
	picture: PictureType;
	fit?: "cover" | "contain";
};

export const Picture: Component<Props> = (props) => {
	return (
		<picture>
			<For each={props.picture.sources}>
				{(pic) => <source type={pic.type} srcset={pic.srcset} />}
			</For>
			{/* @ts-ignore */}
			<img
				{...props.picture.image}
				style={`aspect-ratio:${
					props.picture.dimentions.aspectRatio
				}; object-fit: ${props.fit || "cover"};`}
				loading='lazy'
			/>
		</picture>
	);
};

import { component$ } from "@builder.io/qwik";
import type { ImageType } from "../../../types/image";

export const Picture = component$<{ image: ImageType; class?: string }>(
	(props) => {
		return (
			<img
				src={props.image.src}
				{...props.image.attributes}
				alt={props.image.data.caption}
				class={{ [props.class ?? ""]: !!props.class }}
			/>
		);
	}
);

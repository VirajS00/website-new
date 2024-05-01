import { component$ } from "@builder.io/qwik";
import type { GetImageResult } from "astro";

export const Picture = component$<{ image: GetImageResult; class?: string }>(
	(props) => {
		return (
			<img
				src={props.image.src}
				{...props.image.attributes}
				class={{ [props.class ?? ""]: !!props.class }}
			/>
		);
	}
);

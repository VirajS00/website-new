import type { GetPictureResult } from "@astrojs/image/dist/lib/get-picture";
import { For, type Component } from "solid-js";

type Props = {
	picture: GetPictureResult;
};

export const Picture: Component<Props> = (props) => {
	return (
		<picture>
			<For each={props.picture.sources}>
				{(pic) => <source type={pic.type} srcset={pic.srcset} />}
			</For>
			{/* @ts-ignore */}
			<img {...props.picture.image} style='object-fit: cover;' />
		</picture>
	);
};

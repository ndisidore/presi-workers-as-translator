import type { ResolvedSlidevOptions, SlidevPluginOptions } from "@slidev/types";

export default function (
	options: SlidevPluginOptions,
	slidev: ResolvedSlidevOptions,
) {
	return {
		name: "slidev:addon-d2",
	};
}

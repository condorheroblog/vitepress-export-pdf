import type { DefaultTheme } from "vitepress";
import { defineUserConfig } from "vitepress-export-pdf";

import userConfig from "./config";

function extractLinksFromConfig(config: DefaultTheme.Config) {
	const links: string[] = [];

	function extractLinks(sidebar: DefaultTheme.SidebarItem[]) {
		for (const item of sidebar) {
			if (item.items)
				extractLinks(item.items);

			else if (item.link)
				links.push(`${item.link}.html`);
		}
	}

	for (const key in config.sidebar)
		extractLinks(config.sidebar[key]);

	return links;
}

const links = extractLinksFromConfig(userConfig.themeConfig!);
const routeOrder = [
	"/index.html",
	...links,
];

const headerTemplate = `<div style="margin-top: -0.4cm; height: 70%; width: 100%; display: flex; justify-content: center; align-items: center; color: lightgray; border-bottom: solid lightgray 1px; font-size: 10px;">
	<span class="title"></span>
</div>`;

const footerTemplate = `<div style="margin-bottom: -0.4cm; height: 70%; width: 100%; display: flex; justify-content: flex-start; align-items: center; color: lightgray; border-top: solid lightgray 1px; font-size: 10px;">
	<span style="margin-left: 15px;" class="url"></span>
</div>`;

export default defineUserConfig({
	outFile: "vitepress-example.pdf",
	outDir: "pdf-vitepress",
	pdfOptions: {
		format: "A4",
		printBackground: true,
		displayHeaderFooter: true,
		headerTemplate,
		footerTemplate,
		margin: {
			bottom: 60,
			left: 25,
			right: 25,
			top: 60,
		},
	},
	urlOrigin: "https://vitepress.dev/",
	sorter: (pageA, pageB) => {
		const aIndex = routeOrder.findIndex(route => route === pageA.path);
		const bIndex = routeOrder.findIndex(route => route === pageB.path);
		return aIndex - bIndex;
	},
});

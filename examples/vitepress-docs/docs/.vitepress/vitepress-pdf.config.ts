import { defineUserConfig } from "vitepress-export-pdf";

const routeOrder = [
	"/index.html",
	"/guide/what-is-vitepress.html",
	"/guide/getting-started.html",
	"/guide/configuration.html",
	"/guide/deploying.html",
	"/guide/markdown.html",
	"/guide/asset-handling.html",
	"/guide/frontmatter.html",
	"/guide/using-vue.html",
	"/guide/api.html",
	"/guide/theme-introduction.html",
	"/guide/theme-nav.html",
	"/guide/theme-sidebar.html",
	"/guide/theme-prev-next-link.html",
	"/guide/theme-edit-link.html",
	"/guide/theme-last-updated.html",
	"/guide/theme-layout.html",
	"/guide/theme-home-page.html",
	"/guide/theme-team-page.html",
	"/guide/theme-footer.html",
	"/guide/theme-search.html",
	"/guide/theme-carbon-ads.html",
	"/guide/migration-from-vuepress.html",
	"/guide/migration-from-vitepress-0.html",

	"/config/introduction.html",
	"/config/app-configs.html",
	"/config/theme-configs.html",
	"/config/frontmatter-configs.html",
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

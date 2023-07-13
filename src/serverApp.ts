import { join } from "node:path";
import { createRequire } from "node:module";
import { createServer as createDevApp, resolveConfig } from "vitepress";
import debug from "debug";
import hash from "hash-sum";
import type { CommandOptions } from "@condorhero/vuepress-plugin-export-pdf-core";
import { checkEnv, generatePdf, loadModule, resolveUserConfigConventionalPath, resolveUserConfigPath, timeTransformer } from "@condorhero/vuepress-plugin-export-pdf-core";
import { engines, peerDependencies } from "../package.json";
import type { UserConfig } from ".";

const devDebug = debug("vitepress-export-pdf:dev-server");

export const PORT = 16762;
export const HOST = "localhost";

export const moduleRequire = createRequire(import.meta.url);
const { version } = moduleRequire("vitepress/package.json");

export async function serverApp(dir = "docs", commandOptions: CommandOptions = {}) {
	checkEnv("VitePress", engines.node, version, peerDependencies.vitepress);

	const sourceDir = join(process.cwd(), dir);

	if (commandOptions.debug)
		debug.enabled("vitepress-export-pdf:*");

	devDebug("sourceDir: %s", sourceDir);

	let userConfig: UserConfig = {};

	// resolve user config file
	const userConfigPath = commandOptions.config
		? resolveUserConfigPath(commandOptions.config)
		: resolveUserConfigConventionalPath(sourceDir, "vitepress");

	// get user config data
	if (userConfigPath)
		userConfig = await loadModule<UserConfig>(userConfigPath);

	// set default routePatterns
	if (Array.isArray(userConfig.routePatterns))
		userConfig.routePatterns = [...userConfig.routePatterns];
	else
		userConfig.routePatterns = ["/**", "!/404.html"];

	const vitepressOutFile = commandOptions.outFile ?? `vitepress-${timeTransformer()}.pdf`;
	const vitepressOutDir = commandOptions.outDir ?? ".";

	devDebug("userConfig: %O", userConfig);

	const {
		sorter,
		puppeteerLaunchOptions,
		pdfOptions,
		routePatterns,
		outFile = vitepressOutFile,
		outDir = vitepressOutDir,
		urlOrigin = commandOptions.urlOrigin,
		pdfOutlines = commandOptions.pdfOutlines,
		outlineContainerSelector = ".VPContent",
	} = userConfig;

	const devServer = await createDevApp(sourceDir, { port: PORT, host: HOST });

	const { port = PORT, host = HOST } = devServer.config.server;
	const devApp = await devServer.listen(port);
	devApp.printUrls();

	process.stdout.write("\n");
	process.stdout.write("Start to generate current site to PDF ...");

	const { pages, tempDir, cleanUrls } = await resolveConfig(devApp.config.root);

	const haveCleanUrls = cleanUrls ? "" : ".html";
	const hashPages = pages.map(page => ({
		path: `${devServer.config.base}${page.replace(/\.md$/, haveCleanUrls)}`,
		key: `v-${hash(page)}`,
	}));

	try {
		await generatePdf({
			pages: hashPages,
			tempDir,
			host: typeof host === "boolean" ? HOST : host,
			port,
			outFile,
			outDir,
			sorter,
			urlOrigin,
			pdfOptions,
			pdfOutlines,
			routePatterns,
			puppeteerLaunchOptions,
			outlineContainerSelector,
		});
	}
	catch (error) {
		console.error(error);
	}

	// close current dev server
	await devApp.close();
	process.exit(0);
}

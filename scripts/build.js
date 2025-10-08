#!/usr/bin/env node
import { execSync } from "node:child_process";
import fs from "node:fs";

// Read the base path from wrangler.jsonc
const wranglerConfigRaw = fs.readFileSync("./wrangler.jsonc", "utf8");
const wranglerConfig = JSON.parse(stripJsonComments(wranglerConfigRaw));
const basePath = wranglerConfig.vars?.BASE_PATH || "/cc25-workers-as-glue";

console.log(`Building with BASE_PATH: ${basePath}`);

// Run slidev build with the base path
try {
	execSync(`slidev build --base ${basePath}/ && rm -f dist/_redirects`, {
		stdio: "inherit",
		env: { ...process.env, BASE_PATH: basePath },
	});

	// Copy all assets from local assets directory to dist/assets
	console.log("Copying all assets to dist/assets...");
	execSync("cp -r assets/* dist/assets/", { stdio: "inherit" });

	console.log("Build completed successfully!");
} catch (error) {
	console.error("Build failed:", error.message);
	process.exit(1);
}

// Function to strip comments from JSONC
function stripJsonComments(jsonc) {
	// Remove single-line comments (// comment)
	jsonc = jsonc.replace(/\/\/.*$/gm, "");

	// Remove multi-line comments (/* comment */)
	jsonc = jsonc.replace(/\/\*[\s\S]*?\*\//g, "");

	// Remove trailing commas before closing brackets/braces
	jsonc = jsonc.replace(/,(\s*[}\]])/g, "$1");

	return jsonc;
}

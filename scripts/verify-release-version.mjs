import { readFile } from "node:fs/promises";

const packageJson = JSON.parse(await readFile(new URL("../package.json", import.meta.url), "utf8"));
const releaseTag = process.env.DESIGNKIT_RELEASE_TAG ?? process.argv[2];

if (!releaseTag) {
  console.error("Missing release tag. Set DESIGNKIT_RELEASE_TAG or pass a tag such as v1.2.3.");
  process.exit(1);
}

const releaseVersion = releaseTag.startsWith("v") ? releaseTag.slice(1) : releaseTag;

if (releaseVersion !== packageJson.version) {
  console.error(`Release tag ${releaseTag} does not match package version ${packageJson.version}.`);
  process.exit(1);
}

console.log(`Release version verified: ${packageJson.name}@${packageJson.version}`);

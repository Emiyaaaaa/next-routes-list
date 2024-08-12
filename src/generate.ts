#!/usr/bin/env node
import fs from "node:fs";
import { getNextRoutes } from "./getNextRoutes";

const routes = getNextRoutes();

// write to file
const templatePath = `${process.argv[1]!.replace("/.bin", "").replace(
	/\/generate-next-routes-list\/*.*/g,
	"/next-routes-list"
)}/dist/routes.js`;

const templateString = fs.readFileSync(templatePath, "utf-8");

const newTemplateString = templateString.replace(
	"const routes = [];",
	`const routes = ${JSON.stringify(routes)};`
);

fs.writeFileSync(templatePath, newTemplateString);

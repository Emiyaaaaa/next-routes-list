#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fs_1 = __importDefault(require("node:fs"));
const getNextRoutes_1 = require("./getNextRoutes");
const routes = (0, getNextRoutes_1.getNextRoutes)();
// write to file
const template = `${process.argv[1].replace(".bin", "").replace(/\/next-routes-list\/.*/g, "/next-routes-list")}/dist/routes.js`;
const templateString = node_fs_1.default.readFileSync(template, "utf-8");
const newTemplateString = templateString.replace("const routes = [];", `const routes = ${JSON.stringify(routes)};`);
node_fs_1.default.writeFileSync(template, newTemplateString);

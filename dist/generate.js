#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const list_paths_1 = __importDefault(require("list-paths"));
const paths = (0, list_paths_1.default)();
console.log(paths);

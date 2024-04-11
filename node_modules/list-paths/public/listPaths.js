"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const fs_1 = __importDefault(require("fs"));
const ignorePaths_1 = __importDefault(require("./helpers/ignorePaths"));
/**
 * A function that lists all possible paths inside the working directory or a specified sub-directory.
 *
 * @param {string} path The directory path to searched.
 * @param {Object} options Destructed optional parameters for ignoring specific paths and including files.
 *
 * @returns An array of strings matching all possible paths in the specified directory.
 */
const listPaths = (path = '.', { ignoreNodeModules = true, ignoreGit = true, useGitIgnore = true, includeFiles = false } = {}) => {
    return [
        `${path}/`,
        fs_1.default
            .readdirSync(path)
            .reduce((pathList, subPath) => {
            if (ignorePaths_1.default(ignoreNodeModules, ignoreGit, useGitIgnore).indexOf(subPath) === -1) {
                const fullPath = `${path}/${subPath}`;
                if (fs_1.default.statSync(fullPath).isDirectory()) {
                    pathList.push(...listPaths(fullPath, {
                        ignoreNodeModules,
                        ignoreGit,
                        useGitIgnore,
                        includeFiles
                    }));
                }
                if (includeFiles && fs_1.default.statSync(fullPath).isFile()) {
                    pathList.push(fullPath);
                }
            }
            return pathList;
        }, [])
            .flat()
    ].flat();
};
module.exports = listPaths;
//# sourceMappingURL=listPaths.js.map
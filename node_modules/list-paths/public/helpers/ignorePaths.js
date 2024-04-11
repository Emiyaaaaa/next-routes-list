"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const fs_1 = __importDefault(require("fs"));
/**
 * A function that lists all paths that should be ignored.
 *
 * @param ignoreNodeModules If true, 'node_modules' will be added to the list of paths to ignore.
 * @param ignoreGit If true, '.git' will be added to the list of paths to ignore.
 * @param useGitIgnore If true, paths will be extracted from '.gitignore' and added to the list of paths to ignore.
 *
 * @returns An array of strings matching paths to be ignored.
 */
const ignorePaths = (ignoreNodeModules, ignoreGit, useGitIgnore) => {
    const ignoreNM = 'node_modules';
    const ignoreG = '.git';
    const gitIgnoreArray = fs_1.default.existsSync('.gitignore')
        ? fs_1.default
            .readFileSync('.gitignore', 'utf8')
            .split('\r\n')
            .filter((path) => {
            return (path !== '' && // Remove white-space
                !path.includes('#') && // Remove comments
                path !== 'node_modules' &&
                path !== '.git');
        })
        : [];
    const ignoreList = [
        ignoreNodeModules ? ignoreNM : null,
        ignoreGit ? ignoreG : null,
        ...(useGitIgnore ? gitIgnoreArray : [])
    ].filter((path) => {
        return path !== null;
    });
    return ignoreList;
};
module.exports = ignorePaths;
//# sourceMappingURL=ignorePaths.js.map
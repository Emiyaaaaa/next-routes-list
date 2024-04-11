/**
 * A function that lists all paths that should be ignored.
 *
 * @param ignoreNodeModules If true, 'node_modules' will be added to the list of paths to ignore.
 * @param ignoreGit If true, '.git' will be added to the list of paths to ignore.
 * @param useGitIgnore If true, paths will be extracted from '.gitignore' and added to the list of paths to ignore.
 *
 * @returns An array of strings matching paths to be ignored.
 */
declare const ignorePaths: (ignoreNodeModules: boolean, ignoreGit: boolean, useGitIgnore: boolean) => string[];
export = ignorePaths;
//# sourceMappingURL=ignorePaths.d.ts.map
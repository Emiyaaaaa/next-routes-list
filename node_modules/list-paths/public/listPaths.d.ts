interface Options {
    /**
     * If true, ignores 'node_modules' folder.
     * @type {boolean}
     */
    ignoreNodeModules?: boolean;
    /**
     * If true, ignores '.git' folder.
     * @type {boolean}
     */
    ignoreGit?: boolean;
    /**
     * If true, ignores paths in '.gitignore'.
     * @type {boolean}
     */
    useGitIgnore?: boolean;
    /**
     * If true, includes file paths.
     * @type {boolean}
     */
    includeFiles?: boolean;
}
/**
 * A function that lists all possible paths inside the working directory or a specified sub-directory.
 *
 * @param {string} path The directory path to searched.
 * @param {Object} options Destructed optional parameters for ignoring specific paths and including files.
 *
 * @returns An array of strings matching all possible paths in the specified directory.
 */
declare const listPaths: (path?: string, { ignoreNodeModules, ignoreGit, useGitIgnore, includeFiles }?: Options) => string[];
export = listPaths;
//# sourceMappingURL=listPaths.d.ts.map
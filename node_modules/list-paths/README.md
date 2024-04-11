# list-paths

[![Build Status](https://travis-ci.org/MeanBoyCousin/list-paths.svg?branch=master) ](https://travis-ci.org/MeanBoyCousin/list-paths) [![npm version](http://img.shields.io/npm/v/list-paths.svg?style=flat)](https://npmjs.org/package/list-paths 'View this project on npm') [![codecov](https://codecov.io/gh/MeanBoyCousin/list-paths/branch/master/graph/badge.svg)](https://codecov.io/gh/MeanBoyCousin/list-paths) [![Mutation testing badge](https://img.shields.io/endpoint?style=flat&url=https%3A%2F%2Fbadge-api.stryker-mutator.io%2Fgithub.com%2FMeanBoyCousin%2Flist-paths%2Fmaster)](https://dashboard.stryker-mutator.io/reports/github.com/MeanBoyCousin/list-paths/master)

> Node package to fetch all paths in the working directory.
>
> Also accepts a sub-directory path and returns all paths within.
>
> Ready to use out of the box.

## Install

```console
$ npm install list-paths
```

## Usage

#### Find all paths in the working directory.

```js
const listPaths = require('list-paths')
const dir = listPaths() // [ './', './public', './src', './src/helpers', 'etc...' ]
```

#### Find all paths in a sub-directory.

```js
const listPaths = require('list-paths')
const dir = listPaths('./src') // [ './src', './src/helpers', 'etc...' ]
```

## API

`listPaths` accepts 2 parameters, `path` & an `options object`.

```js
listPaths(path, { ignoreNodeModules, ignoreGit, useGitIgnore, includeFiles }) => {string[]}
```

| Parameter         | Type    | Default | Description                             |
| ----------------- | ------- | ------- | --------------------------------------- |
| path              | string  | "."     | The directory path to searched.         |
| ignoreNodeModules | boolean | true    | If true, ignores 'node_modules' folder. |
| ignoreGit         | boolean | true    | If true, ignores '.git' folder.         |
| useGitIgnore      | boolean | true    | If true, ignores paths in '.gitignore'. |
| includeFiles      | boolean | false   | If true, includes file paths.           |

## Authors

Tim Dunphy

## License

This project is licensed under the MIT License - see the [LICENSE.md](./LICENSE) file for details.

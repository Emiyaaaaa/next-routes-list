# next-routes-list

Easy generate all available routes in Next.js .

## Support

- [x] App routes
- [x] Page routes

## Install

```bash
npm install --save-dev next-routes-list@latest
```

## Usage

### Step 1. Run script

Add script to `package.json`:

```json
{
  "script": {
    "generate-next-routes-list": "generate-next-routes-list"
  }
}
```

Or if you using `src` directory:

```json
{
  "script": {
    "generate-next-routes-list": "cd src && npx generate-next-routes-list"
  }
}
```

Or if you want specify the output file:

```json
{
  "script": {
    "generate-next-routes-list": "generate-next-routes-list -o routes.ts"
  }
}
```

Then run npm script:

```shell
npm run generate-next-routes-list
```

### Step 2. Import routes

```ts
import { routes } from "next-routes-list";
// or if you specify the output file
import { routes } from "./routes.ts";


console.log(routes);
/**
[
  '/',
  '/about',
  '/posts/[id]',
  ...
]
*/
```

## Options

| Option | Type   | Description                     | Example                                      |
| ------ | ------ | ------------------------------- | -------------------------------------------- |
| `-o`   | string | set the output routes file path | `npx generate-next-routes-list -o routes.ts` |

## Example

[Here](https://github.com/Emiyaaaaa/next-routes-list/tree/main/test/next-project) is a next.js project, [here](https://github.com/Emiyaaaaa/next-routes-list/blob/main/test/routes.js) is the generate result.

## Contribute

Feel free to contribute anything or report any issues.

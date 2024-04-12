# next-routes-list

## Start
```bash
npm install --save-dev next-routes-list@latest
```

## Usage

1. run script
```
// package.json
{
  script: {
    "generate-next-routes-list": "generate-next-routes-list"
  }
}
```
```shell
npm run generate-next-routes-list
```

2. import routes
```ts
import { routes } from 'next-routes-list'

console.log(routes)
/**
[
  './',
  './about',
  './posts/[id]',
  ...
]
*/
```


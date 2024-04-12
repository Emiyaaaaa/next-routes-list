import listPaths from "list-paths";

export function getNextRoutes(
	src = "./app",
	extensions = ["tsx", "ts", "js", "jsx", "md", "mdx"]
) {
	const pagePaths = listPaths(src, { includeFiles: true }).filter((path) => {
		const file = path.split("/").at(-1);
		const filename = file?.split(".").at(-2);
		const extension = file?.split(".").at(-1);
		return extension && extensions.includes(extension) && filename === "page";
	});
	/**
  => paths = [
    './app/(group)/blog/page.tsx', => route should be '/blog'
    './app/(group)/blog/[...slug]/page.tsx', => route should be '/blog/[...slug]'
    './app/@component/blog/page.tsx', // should remove, because it's not a page
    './app/blog/(..)list/page.tsx', // should remove, because it's not a page
  ]
  */

	const routes = pagePaths.map((path) => {
		const parts = path.split(src)[1]?.split("/").filter(Boolean) ?? [];

		const url: string[] = [];

		for (let i = 0; i < parts.length; i++) {
			const part = parts[i];
			if (!part) continue;

			const isGroupRoute = part.startsWith("(") && part.endsWith(")");
			if (isGroupRoute) continue;

			const isInterceptingRoute = part.startsWith("(") && !part.endsWith(")");
			if (isInterceptingRoute) return null;

			const isParallelRoute = part.startsWith("@");
			if (isParallelRoute) return null;

			// ignore 'page.tsx' on url path
			if (i === parts.length - 1) continue;

			url.push(part);
		}

		return `/${url.join("/")}`;
	});

	const unDuplicatedRoutes = Array.from(new Set(routes));

	return unDuplicatedRoutes;
}

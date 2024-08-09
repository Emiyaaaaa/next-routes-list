import fs from "node:fs";
import listPaths from "list-paths";

export function getNextRoutes(
	src = "./",
	extensions = ["tsx", "ts", "js", "jsx", "mdx"]
) {
	// next app routes
	// if app exists
	let appPaths: string[] = [];
	if (fs.existsSync(`${src}app`)) {
		appPaths = listPaths(`${src}app`, { includeFiles: true }).filter((path) => {
			const file = path.split("/").at(-1);
			const filename = file?.split(".").at(-2);
			const extension = file?.split(".").at(-1);
			return extension && extensions.includes(extension) && filename === "page";
		});
	}

	// next pages routes
	let pagePaths: string[] = [];
	if (fs.existsSync(`${src}pages`)) {
		pagePaths = listPaths(`${src}pages`, { includeFiles: true }).filter(
			(path) => {
				if (path?.includes("/pages/api/")) return false;
				const file = path.split("/").at(-1);
				const extension = file?.split(".").at(-1);
				return extension && extensions.includes(extension);
			}
		);
	}

	/**
  appRoutes = [
    '/app/(group)/blog/page.tsx', => route should be '/blog'
    '/app/(group)/blog/[...slug]/page.tsx', => route should be '/blog/[...slug]'
    '/app/@component/blog/page.tsx', // should remove, because it's not a page
    '/app/blog/(..)list/page.tsx', // should remove, because it's not a page
  ]
  */
	const appRoutes = appPaths
		.map((path) => {
			const parts = path.split(src)[1]?.split("/").filter(Boolean) ?? [];

			const url: string[] = [];

			for (let i = 0; i < parts.length; i++) {
				const part = parts[i];
				if (!part) continue;

				if (i === 0 && part === "app") continue;

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
		})
		.filter(Boolean);

	/**
  pageRoutes = [
    '/pages/blog.js', => route should be '/blog'
    '/pages/[slug].js', => route should be '/[...slug]'
  ]
  */
	const pagesRoutes = pagePaths
		.map((path) => {
			const parts = path.split(src)[1]?.split("/").filter(Boolean) ?? [];

			const url: string[] = [];

			for (let i = 0; i < parts.length; i++) {
				let part = parts[i];
				if (!part) continue;

				if (i === 0 && part === "pages") continue;

				if (i === parts.length - 1) {
					part = part.split(".").at(-2) ?? "";

					if (part === "index") {
						continue;
					}
				}

				url.push(part);
			}

			return `/${url.join("/")}`;
		})
		.filter(Boolean);

	const unDuplicatedRoutes = Array.from(
		new Set([...appRoutes, ...pagesRoutes])
	);

	return unDuplicatedRoutes;
}

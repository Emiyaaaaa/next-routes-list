"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNextRoutes = void 0;
const list_paths_1 = __importDefault(require("list-paths"));
function getNextRoutes(src = "./app", extensions = ["tsx", "ts", "js", "jsx", "md", "mdx"]) {
    const pagePaths = (0, list_paths_1.default)(src, { includeFiles: true }).filter((path) => {
        const file = path.split("/").at(-1);
        const filename = file === null || file === void 0 ? void 0 : file.split(".").at(-2);
        const extension = file === null || file === void 0 ? void 0 : file.split(".").at(-1);
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
        var _a, _b;
        const parts = (_b = (_a = path.split(src)[1]) === null || _a === void 0 ? void 0 : _a.split("/").filter(Boolean)) !== null && _b !== void 0 ? _b : [];
        const url = [];
        for (let i = 0; i < parts.length; i++) {
            const part = parts[i];
            if (!part)
                continue;
            const isGroupRoute = part.startsWith("(") && part.endsWith(")");
            if (isGroupRoute)
                continue;
            const isInterceptingRoute = part.startsWith("(") && !part.endsWith(")");
            if (isInterceptingRoute)
                return null;
            const isParallelRoute = part.startsWith("@");
            if (isParallelRoute)
                return null;
            // ignore 'page.tsx' on url path
            if (i === parts.length - 1)
                continue;
            url.push(part);
        }
        return `/${url.join("/")}`;
    });
    const unDuplicatedRoutes = Array.from(new Set(routes));
    return unDuplicatedRoutes;
}
exports.getNextRoutes = getNextRoutes;

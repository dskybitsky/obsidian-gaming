import { DataviewApi } from 'obsidian-dataview';

export default class Reader {
    static readonly FolderIndex = 'index';
    static readonly FolderIndexExt = `${Reader.FolderIndex}.md`;

    constructor(
        protected api: DataviewApi
    ) {
        
    }

    getPage(path: string) {
        return this.api.page(`${path}/${Reader.FolderIndex}`)
            ?? this.api.page(path);
    }

    getPages(query: string) {
        return this.api.pages(query);
    }

    getPagesByPath(path: string) {
        return this.getPages(Reader.pathToSource(path));
    }

    getPagesAtDepth(query: string, depth: number = 0) {
        return this.getPages(query)
            .filter((page) => Reader.isPageAtDepth(page, depth));
    }

    getPagesByPathAtDepth(path: string, depth: number = 0) {
        return this.getPagesAtDepth(Reader.pathToSource(path), depth);
    }

    getPagesByPathAtDepthRel(path: string, depth: number = 0) {
        const pathDepth = path.split('/').length;

        return this.getPagesByPathAtDepth(path, pathDepth + depth);
    }

    private static isPageAtDepth(page: any, depth: number) {
        const pageDepth = page.file.path.split('/').length

        return page.file.name == Reader.FolderIndex
            ? pageDepth == (depth + 1)
            : pageDepth == depth
    }

    private static pathToSource(path: string): string {
        return `"${Reader.normalizePath(path)}"`;
    }

    private static normalizePath(path: string): string {
        return path.endsWith(`/${Reader.FolderIndexExt}`)
            ? path.slice(0, (-1) * `/${Reader.FolderIndexExt}`.length)
            : path;
    }
}
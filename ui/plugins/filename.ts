import type {Plugin} from "vite";

const process = (path: string): string => {
    // Replace backslashes with forward slashes
    const normalizedPath = path.replace(/\\/g, "/");
    const match = normalizedPath.match(/.*\/src\/(.*)\.vue$/);
    return match ? match[1].toLowerCase() : normalizedPath;
};

export const filename = (): Plugin => {
    return {
        name: "filename",
        transform(code: string, id: string) {
            if (!id.endsWith(".vue")) return;
            return {code: code.replace(/FILENAME_PLACEHOLDER/g, process(id)), map: null};
        },
    };
};

interface FileEntry {
    name: string;
    type: "file" | "dir";
    path: string;
    isSymlink: boolean;
    children?: FileEntry[];
}
interface FileTreeProps {
    entries: FileEntry[];
    onSelect: (entry: FileEntry) => void;
    selectedPath: string | null;
    onDelete: (filePath: string) => void;
    isLoading: boolean;
    onCreateFile: (filePath: string) => void;
    onCreateDirectory: (dirPath: string) => void;
    onRename?: (oldPath: string, newName: string) => Promise<string>;
}
export declare function FileTree({ entries, onSelect, selectedPath, onDelete, isLoading, onCreateFile, onCreateDirectory, onRename, }: FileTreeProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=component.d.ts.map
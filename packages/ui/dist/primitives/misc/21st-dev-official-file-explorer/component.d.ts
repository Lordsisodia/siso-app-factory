import { FileEntry } from "../hooks/use-file-system";
interface FileExplorerProps {
    entries: FileEntry[];
    onSelect: (entry: FileEntry) => void;
    selectedPath: string | null;
    onDelete: (filePath: string) => void;
    onCreateFile: (fileName: string) => void;
    onCreateDirectory: (dirName: string) => void;
    onRename: (oldPath: string, newName: string) => Promise<string>;
    onRefresh: () => void;
    isLoading: boolean;
    advancedView: boolean;
    onToggleAdvancedView: () => void;
    onAddFrom21Registry: (jsonUrl: string) => Promise<void>;
}
export declare function FileExplorer({ entries, onSelect, selectedPath, onDelete, onCreateFile, onCreateDirectory, onRename, onRefresh, isLoading, advancedView, onToggleAdvancedView, onAddFrom21Registry, }: FileExplorerProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=component.d.ts.map
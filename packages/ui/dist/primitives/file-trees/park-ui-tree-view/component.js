'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CheckSquareIcon, ChevronRightIcon, FileIcon, FolderIcon } from 'lucide-react';
import { forwardRef } from 'react';
import * as StyledTreeView from './styled/tree-view';
export const TreeView = forwardRef((props, ref) => {
    return (_jsx(StyledTreeView.Root, { ref: ref, ...props, children: _jsx(StyledTreeView.Tree, { children: props.collection.rootNode.children.map((node, index) => (_jsx(TreeNode, { node: node, indexPath: [index] }, node.id))) }) }));
});
TreeView.displayName = 'TreeView';
const TreeNode = (props) => {
    const { node, indexPath } = props;
    return (_jsx(StyledTreeView.NodeProvider, { node: node, indexPath: indexPath, children: node.children ? (_jsxs(StyledTreeView.Branch, { children: [_jsxs(StyledTreeView.BranchControl, { children: [_jsxs(StyledTreeView.BranchText, { children: [_jsx(FolderIcon, {}), " ", node.name] }), _jsx(StyledTreeView.BranchIndicator, { children: _jsx(ChevronRightIcon, {}) })] }), _jsxs(StyledTreeView.BranchContent, { children: [_jsx(StyledTreeView.BranchIndentGuide, {}), node.children.map((child, index) => (_jsx(TreeNode, { node: child, indexPath: [...indexPath, index] }, child.id)))] })] })) : (_jsxs(StyledTreeView.Item, { children: [_jsx(StyledTreeView.ItemIndicator, { children: _jsx(CheckSquareIcon, {}) }), _jsxs(StyledTreeView.ItemText, { children: [_jsx(FileIcon, {}), node.name] })] })) }, node.id));
};
//# sourceMappingURL=component.js.map
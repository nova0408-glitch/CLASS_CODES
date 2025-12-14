// Types for Binary Tree data structure

export interface TreeNode {
  id: string;
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;
  parent?: TreeNode | null;
  isHighlighted?: boolean;
  isVisited?: boolean;
  isCurrent?: boolean;
  x?: number;
  y?: number;
}

export interface TreeState {
  root: TreeNode | null;
  traversalOrder: number[];
  currentTraversal?: 'inorder' | 'preorder' | 'postorder' | null;
  explanation: string;
}


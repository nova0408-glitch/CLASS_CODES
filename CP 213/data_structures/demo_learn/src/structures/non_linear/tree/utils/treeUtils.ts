import { TreeNode } from '../types';

let nodeIdCounter = 0;

export function generateNodeId(): string {
  return `node_${nodeIdCounter++}`;
}

export function resetNodeIdCounter(): void {
  nodeIdCounter = 0;
}

export function createTreeNode(value: number): TreeNode {
  return {
    id: generateNodeId(),
    value,
    left: null,
    right: null,
    isHighlighted: false,
    isVisited: false,
    isCurrent: false,
  };
}

// Calculate node positions for visualization
export function calculateTreeLayout(root: TreeNode | null, width: number, startY: number = 50): Map<string, { x: number; y: number }> {
  const positions = new Map<string, { x: number; y: number }>();
  if (!root) return positions;

  const levelHeight = 100;
  const horizontalSpacing = 120;

  function getTreeWidth(node: TreeNode | null): number {
    if (!node) return 0;
    return 1 + Math.max(getTreeWidth(node.left), getTreeWidth(node.right));
  }

  function calculatePositions(node: TreeNode | null, x: number, y: number, level: number): number {
    if (!node) return x;

    const leftWidth = getTreeWidth(node.left);
    const nodeX = x + leftWidth * horizontalSpacing;
    
    positions.set(node.id, { x: nodeX, y: y });
    
    if (node.left) {
      calculatePositions(node.left, x, y + levelHeight, level + 1);
    }
    if (node.right) {
      calculatePositions(node.right, nodeX + horizontalSpacing, y + levelHeight, level + 1);
    }
    
    return nodeX;
  }

  const treeWidth = getTreeWidth(root);
  const startX = (width - (treeWidth - 1) * horizontalSpacing) / 2;
  calculatePositions(root, startX, startY, 0);
  return positions;
}

// Inorder traversal
export function inorderTraversal(root: TreeNode | null, visit: (node: TreeNode) => void): void {
  if (!root) return;
  inorderTraversal(root.left, visit);
  visit(root);
  inorderTraversal(root.right, visit);
}

// Preorder traversal
export function preorderTraversal(root: TreeNode | null, visit: (node: TreeNode) => void): void {
  if (!root) return;
  visit(root);
  preorderTraversal(root.left, visit);
  preorderTraversal(root.right, visit);
}

// Postorder traversal
export function postorderTraversal(root: TreeNode | null, visit: (node: TreeNode) => void): void {
  if (!root) return;
  postorderTraversal(root.left, visit);
  postorderTraversal(root.right, visit);
  visit(root);
}


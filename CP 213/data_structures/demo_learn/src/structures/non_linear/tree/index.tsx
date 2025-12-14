import React, { useState, useCallback, useRef } from 'react';
import { DataStructure } from '../../base/StructureInterface';
import { GuideContent } from '../../base/types';
import BinaryTreeVisualization from './components/BinaryTreeVisualization';
import { TreeNode, TreeState } from './types';
import { createTreeNode, inorderTraversal, preorderTraversal, postorderTraversal, resetNodeIdCounter } from './utils/treeUtils';
import Icon from '../../../components/shared/Icon';
import ExplanationPanel from '../../../components/linked_list/ExplanationPanel';

const BinaryTreeComponent: React.FC = () => {
  const [root, setRoot] = useState<TreeNode | null>(null);
  const [highlightedNodeId, setHighlightedNodeId] = useState<string | undefined>();
  const [visitedNodeIds, setVisitedNodeIds] = useState<Set<string>>(new Set());
  const [currentNodeId, setCurrentNodeId] = useState<string | undefined>();
  const [traversalOrder, setTraversalOrder] = useState<number[]>([]);
  const [currentTraversal, setCurrentTraversal] = useState<'inorder' | 'preorder' | 'postorder' | null>(null);
  const [currentExplanation, setCurrentExplanation] = useState('');
  const [currentError, setCurrentError] = useState<string | undefined>();
  const [operationCode, setOperationCode] = useState<string>('');
  const [operationDescription, setOperationDescription] = useState<string>('');
  const traversalTimeoutRef = useRef<NodeJS.Timeout[]>([]);

  const clearTraversal = useCallback(() => {
    traversalTimeoutRef.current.forEach(timeout => clearTimeout(timeout));
    traversalTimeoutRef.current = [];
    setVisitedNodeIds(new Set());
    setHighlightedNodeId(undefined);
    setCurrentNodeId(undefined);
    setTraversalOrder([]);
    setCurrentTraversal(null);
  }, []);

  const createTree = useCallback(() => {
    resetNodeIdCounter();
    clearTraversal();
    
    // Create a sample binary tree
    const node1 = createTreeNode(1);
    const node2 = createTreeNode(2);
    const node3 = createTreeNode(3);
    const node4 = createTreeNode(4);
    const node5 = createTreeNode(5);
    const node6 = createTreeNode(6);
    const node7 = createTreeNode(7);

    node1.left = node2;
    node1.right = node3;
    node2.left = node4;
    node2.right = node5;
    node3.left = node6;
    node3.right = node7;

    setRoot(node1);
    setCurrentExplanation('Created a binary tree with 7 nodes. Root is 1, with left subtree (2,4,5) and right subtree (3,6,7).');
    setOperationCode(`// Create binary tree nodes
struct TreeNode {
    int data;
    TreeNode* left;
    TreeNode* right;
};

TreeNode* root = new TreeNode(1);
root->left = new TreeNode(2);
root->right = new TreeNode(3);
// ... continue building tree`);
    setOperationDescription('Creates a binary tree structure using TreeNode pointers in C++.');
  }, [clearTraversal]);

  const traverse = useCallback((type: 'inorder' | 'preorder' | 'postorder') => {
    if (!root) {
      setCurrentError('Tree is empty. Create a tree first.');
      return;
    }

    clearTraversal();
    setCurrentTraversal(type);
    const order: number[] = [];
    const visited = new Set<string>();
    let step = 0;

    const visit = (node: TreeNode) => {
      setTimeout(() => {
        setCurrentNodeId(node.id);
        setHighlightedNodeId(node.id);
        visited.add(node.id);
        setVisitedNodeIds(new Set(visited));
        order.push(node.value);
        setTraversalOrder([...order]);
        
        const typeNames = {
          inorder: 'Inorder (Left-Root-Right)',
          preorder: 'Preorder (Root-Left-Right)',
          postorder: 'Postorder (Left-Right-Root)'
        };
        
        setCurrentExplanation(`${typeNames[type]} traversal: ${order.join(' -> ')}`);
        
        setTimeout(() => {
          setCurrentNodeId(undefined);
          setHighlightedNodeId(undefined);
        }, 500);
      }, step * 800);
      step++;
    };

    if (type === 'inorder') {
      inorderTraversal(root, visit);
      setOperationCode(`// Inorder Traversal (Left-Root-Right)
void inorder(TreeNode* root) {
    if (root == nullptr) return;
    inorder(root->left);      // Visit left
    cout << root->data << " "; // Visit root
    inorder(root->right);     // Visit right
}`);
    } else if (type === 'preorder') {
      preorderTraversal(root, visit);
      setOperationCode(`// Preorder Traversal (Root-Left-Right)
void preorder(TreeNode* root) {
    if (root == nullptr) return;
    cout << root->data << " "; // Visit root
    preorder(root->left);      // Visit left
    preorder(root->right);     // Visit right
}`);
    } else {
      postorderTraversal(root, visit);
      setOperationCode(`// Postorder Traversal (Left-Right-Root)
void postorder(TreeNode* root) {
    if (root == nullptr) return;
    postorder(root->left);     // Visit left
    postorder(root->right);    // Visit right
    cout << root->data << " "; // Visit root
}`);
    }

    setOperationDescription(`${type.charAt(0).toUpperCase() + type.slice(1)} traversal visits nodes in a specific order.`);
    
    const totalSteps = step;
    setTimeout(() => {
      setCurrentTraversal(null);
      setCurrentExplanation(`Traversal complete: ${order.join(' -> ')}`);
    }, totalSteps * 800);
  }, [root, clearTraversal]);

  const search = useCallback((value: number) => {
    if (!root) {
      setCurrentError('Tree is empty. Create a tree first.');
      return;
    }

    clearTraversal();
    let found = false;
    let step = 0;

    const searchNode = (node: TreeNode | null): boolean => {
      if (!node) return false;

      setTimeout(() => {
        setCurrentNodeId(node.id);
        setHighlightedNodeId(node.id);
        setCurrentExplanation(`Searching for ${value}... Currently at node ${node.value}`);
      }, step * 600);
      step++;

      if (node.value === value) {
        setTimeout(() => {
          found = true;
          setCurrentExplanation(`Found ${value} in the tree!`);
          setVisitedNodeIds(new Set([node.id]));
        }, step * 600);
        return true;
      }

      return searchNode(node.left) || searchNode(node.right);
    };

    if (!searchNode(root)) {
      setTimeout(() => {
        setCurrentExplanation(`Value ${value} not found in the tree.`);
      }, step * 600);
    }
  }, [root, clearTraversal]);

  const handleClear = useCallback(() => {
    clearTraversal();
    setRoot(null);
    resetNodeIdCounter();
    setCurrentExplanation('');
    setCurrentError(undefined);
    setOperationCode('');
    setOperationDescription('');
  }, [clearTraversal]);

  return (
    <div style={{ 
      maxWidth: '1400px', 
      margin: '0 auto', 
      padding: '20px',
      minHeight: '100vh'
    }}>
      <header style={{ 
        textAlign: 'center', 
        marginBottom: '30px',
        color: 'white'
      }}>
        <h1 style={{ fontSize: '36px', marginBottom: '10px', textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
          Binary Tree Visualizer (C++)
        </h1>
        <p style={{ fontSize: '18px', opacity: 0.9 }}>
          Learn Binary Trees - Hierarchical Data Structure with Traversals
        </p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div>
          <div style={{
            background: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            margin: '20px 0'
          }}>
            <h3 style={{ marginBottom: '15px', color: '#333', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Icon name="list" size={20} color="#667eea" />
              Tree Operations
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '15px' }}>
              <button 
                onClick={createTree}
                style={{
                  padding: '10px 15px',
                  background: '#667eea',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '13px'
                }}
              >
                Create Tree
              </button>
              <button 
                onClick={() => traverse('inorder')}
                style={{
                  padding: '10px 15px',
                  background: '#4CAF50',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '13px'
                }}
              >
                Inorder Traversal
              </button>
              <button 
                onClick={() => traverse('preorder')}
                style={{
                  padding: '10px 15px',
                  background: '#2196F3',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '13px'
                }}
              >
                Preorder Traversal
              </button>
              <button 
                onClick={() => traverse('postorder')}
                style={{
                  padding: '10px 15px',
                  background: '#FF9800',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '13px'
                }}
              >
                Postorder Traversal
              </button>
              <button 
                onClick={() => search(5)}
                style={{
                  padding: '10px 15px',
                  background: '#9C27B0',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '13px'
                }}
              >
                Search for 5
              </button>
              <button 
                onClick={handleClear}
                style={{
                  padding: '10px 15px',
                  background: '#666',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '13px'
                }}
              >
                Clear
              </button>
            </div>
            {traversalOrder.length > 0 && (
              <div style={{
                background: '#E3F2FD',
                padding: '12px',
                borderRadius: '6px',
                fontSize: '13px',
                color: '#1976D2',
                marginTop: '10px'
              }}>
                <strong>Traversal Order:</strong> {traversalOrder.join(' → ')}
              </div>
            )}
          </div>
        </div>

        <div>
          {operationCode && (
            <div style={{
              background: '#E3F2FD',
              padding: '15px',
              borderRadius: '8px',
              margin: '20px 0',
              border: '2px solid #2196F3'
            }}>
              <h4 style={{ 
                color: '#1976D2', 
                marginBottom: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <Icon name="code" size={18} color="#1976D2" />
                Operation Code
              </h4>
              <p style={{ color: '#666', fontSize: '13px', marginBottom: '10px' }}>
                {operationDescription}
              </p>
              <pre style={{
                margin: 0,
                fontFamily: 'monospace',
                fontSize: '12px',
                color: '#212529',
                background: 'white',
                padding: '12px',
                borderRadius: '4px',
                overflowX: 'auto',
                border: '1px solid #dee2e6'
              }}>
                {operationCode}
              </pre>
            </div>
          )}
          
          <ExplanationPanel
            explanation={currentExplanation}
            error={currentError}
          />
        </div>
      </div>

      <BinaryTreeVisualization
        root={root}
        highlightedNodeId={highlightedNodeId}
        visitedNodeIds={visitedNodeIds}
        currentNodeId={currentNodeId}
      />
    </div>
  );
};

const guide: GuideContent = {
  title: 'Binary Tree Traversals',
  sections: [
    {
      id: 'intro',
      title: 'What is a Binary Tree?',
      content: 'A binary tree is a hierarchical data structure where each node has at most two children: left and right.'
    }
  ]
};

export const binaryTreeStructure: DataStructure = {
  id: 'tree',
  name: 'Binary Tree',
  category: 'non-linear',
  description: 'A hierarchical data structure with nodes and edges',
  available: true,
  Visualization: BinaryTreeVisualization,
  operations: [],
  guide: guide,
  Component: BinaryTreeComponent,
};


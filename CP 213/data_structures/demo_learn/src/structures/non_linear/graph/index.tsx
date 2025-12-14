import React, { useState, useCallback, useRef } from 'react';
import { DataStructure } from '../../base/StructureInterface';
import { GuideContent } from '../../base/types';
import GraphVisualization from './components/GraphVisualization';
import { GraphNode, GraphEdge } from './types';
import Icon from '../../../components/shared/Icon';
import ExplanationPanel from '../../../components/linked_list/ExplanationPanel';

let nodeIdCounter = 0;
function generateNodeId(): string {
  return `node_${nodeIdCounter++}`;
}

function resetNodeIdCounter(): void {
  nodeIdCounter = 0;
}

const GraphComponent: React.FC = () => {
  const [nodes, setNodes] = useState<Map<string, GraphNode>>(new Map());
  const [edges, setEdges] = useState<GraphEdge[]>([]);
  const [adjacencyList, setAdjacencyList] = useState<Map<string, string[]>>(new Map());
  const [highlightedNodeId, setHighlightedNodeId] = useState<string | undefined>();
  const [visitedNodeIds, setVisitedNodeIds] = useState<Set<string>>(new Set());
  const [currentNodeId, setCurrentNodeId] = useState<string | undefined>();
  const [traversedEdges, setTraversedEdges] = useState<Set<string>>(new Set());
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
    setTraversedEdges(new Set());
  }, []);

  const createGraph = useCallback(() => {
    resetNodeIdCounter();
    clearTraversal();

    const newNodes = new Map<string, GraphNode>();
    const newEdges: GraphEdge[] = [];
    const newAdjList = new Map<string, string[]>();

    // Create a sample graph with 6 nodes
    const nodePositions = [
      { x: 200, y: 150, value: 0 },
      { x: 400, y: 100, value: 1 },
      { x: 600, y: 150, value: 2 },
      { x: 200, y: 350, value: 3 },
      { x: 400, y: 400, value: 4 },
      { x: 600, y: 350, value: 5 },
    ];

    nodePositions.forEach(pos => {
      const nodeId = generateNodeId();
      const node: GraphNode = {
        id: nodeId,
        value: pos.value,
        x: pos.x,
        y: pos.y,
      };
      newNodes.set(nodeId, node);
      newAdjList.set(nodeId, []);
    });

    const nodeIds = Array.from(newNodes.keys());

    // Create edges: 0-1, 1-2, 0-3, 1-4, 2-5, 3-4, 4-5
    const edgeConnections = [
      [0, 1], [1, 2], [0, 3], [1, 4], [2, 5], [3, 4], [4, 5]
    ];

    edgeConnections.forEach(([fromIdx, toIdx]) => {
      const fromId = nodeIds[fromIdx];
      const toId = nodeIds[toIdx];
      newEdges.push({ from: fromId, to: toId });
      newAdjList.get(fromId)?.push(toId);
      newAdjList.get(toId)?.push(fromId);
    });

    setNodes(newNodes);
    setEdges(newEdges);
    setAdjacencyList(newAdjList);
    setCurrentExplanation('Created an undirected graph with 6 nodes and 7 edges. Nodes are connected in a network structure.');
    setOperationCode(`// Graph representation using adjacency list
struct GraphNode {
    int data;
    vector<GraphNode*> neighbors;
};

// Create nodes and edges
GraphNode* node0 = new GraphNode(0);
GraphNode* node1 = new GraphNode(1);
// ... connect nodes
node0->neighbors.push_back(node1);`);
    setOperationDescription('Creates a graph structure using nodes and adjacency lists in C++.');
  }, [clearTraversal]);

  const bfs = useCallback(() => {
    if (nodes.size === 0) {
      setCurrentError('Graph is empty. Create a graph first.');
      return;
    }

    clearTraversal();
    const startNodeId = Array.from(nodes.keys())[0];
    const queue: Array<{ nodeId: string; fromNodeId?: string }> = [{ nodeId: startNodeId }];
    const visited = new Set<string>();
    const traversed = new Set<string>();
    let step = 0;

    const processQueue = () => {
      if (queue.length === 0) {
        setCurrentNodeId(undefined);
        setCurrentExplanation('BFS traversal complete. All nodes visited level by level.');
        return;
      }

      const { nodeId, fromNodeId } = queue.shift()!;
      
      if (visited.has(nodeId)) {
        processQueue();
        return;
      }

      setTimeout(() => {
        setCurrentNodeId(nodeId);
        setHighlightedNodeId(nodeId);
        visited.add(nodeId);
        setVisitedNodeIds(new Set(visited));
        
        if (fromNodeId) {
          const edgeKey = `${fromNodeId}-${nodeId}`;
          traversed.add(edgeKey);
          setTraversedEdges(new Set(traversed));
        }

        const node = nodes.get(nodeId);
        const visitedValues = Array.from(visited).map(id => nodes.get(id)?.value).filter(v => v !== undefined);
        setCurrentExplanation(`BFS: Visiting node ${node?.value}. Visited: [${visitedValues.join(', ')}]`);

        const neighbors = adjacencyList.get(nodeId) || [];
        neighbors.forEach(neighbor => {
          if (!visited.has(neighbor) && !queue.some(item => item.nodeId === neighbor)) {
            queue.push({ nodeId: neighbor, fromNodeId: nodeId });
          }
        });

        setTimeout(() => {
          setCurrentNodeId(undefined);
          setHighlightedNodeId(undefined);
          processQueue();
        }, 600);
      }, step * 600);
      step++;
    };

    setOperationCode(`// BFS Traversal
void BFS(GraphNode* start) {
    queue<GraphNode*> q;
    set<GraphNode*> visited;
    
    q.push(start);
    visited.insert(start);
    
    while (!q.empty()) {
        GraphNode* current = q.front();
        q.pop();
        
        // Process current node
        cout << current->data << " ";
        
        // Visit neighbors
        for (auto neighbor : current->neighbors) {
            if (visited.find(neighbor) == visited.end()) {
                visited.insert(neighbor);
                q.push(neighbor);
            }
        }
    }
}`);
    setOperationDescription('Breadth-First Search visits nodes level by level using a queue. Time complexity: O(V + E).');
    processQueue();
  }, [nodes, adjacencyList, clearTraversal]);

  const dfs = useCallback(() => {
    if (nodes.size === 0) {
      setCurrentError('Graph is empty. Create a graph first.');
      return;
    }

    clearTraversal();
    const startNodeId = Array.from(nodes.keys())[0];
    const visited = new Set<string>();
    const traversed = new Set<string>();
    const stack: Array<{ nodeId: string; fromNodeId?: string }> = [{ nodeId: startNodeId }];
    let step = 0;

    const processStack = () => {
      if (stack.length === 0) {
        setCurrentNodeId(undefined);
        setCurrentExplanation('DFS traversal complete. All nodes visited using depth-first approach.');
        return;
      }

      const { nodeId, fromNodeId } = stack.pop()!;
      
      if (visited.has(nodeId)) {
        processStack();
        return;
      }

      setTimeout(() => {
        setCurrentNodeId(nodeId);
        setHighlightedNodeId(nodeId);
        visited.add(nodeId);
        setVisitedNodeIds(new Set(visited));

        if (fromNodeId) {
          const edgeKey = `${fromNodeId}-${nodeId}`;
          traversed.add(edgeKey);
          setTraversedEdges(new Set(traversed));
        }

        const node = nodes.get(nodeId);
        const visitedValues = Array.from(visited).map(id => nodes.get(id)?.value).filter(v => v !== undefined);
        setCurrentExplanation(`DFS: Visiting node ${node?.value}. Visited: [${visitedValues.join(', ')}]`);

        const neighbors = adjacencyList.get(nodeId) || [];
        // Push neighbors in reverse order to maintain left-to-right traversal
        for (let i = neighbors.length - 1; i >= 0; i--) {
          const neighbor = neighbors[i];
          if (!visited.has(neighbor) && !stack.some(item => item.nodeId === neighbor)) {
            stack.push({ nodeId: neighbor, fromNodeId: nodeId });
          }
        }

        setTimeout(() => {
          setCurrentNodeId(undefined);
          setHighlightedNodeId(undefined);
          processStack();
        }, 600);
      }, step * 600);
      step++;
    };

    setOperationCode(`// DFS Traversal (Iterative with Stack)
void DFS(GraphNode* start) {
    stack<GraphNode*> s;
    set<GraphNode*> visited;
    
    s.push(start);
    
    while (!s.empty()) {
        GraphNode* current = s.top();
        s.pop();
        
        if (visited.find(current) != visited.end()) continue;
        
        visited.insert(current);
        cout << current->data << " ";
        
        for (auto neighbor : current->neighbors) {
            if (visited.find(neighbor) == visited.end()) {
                s.push(neighbor);
            }
        }
    }
}`);
    setOperationDescription('Depth-First Search visits nodes by going as deep as possible before backtracking. Time complexity: O(V + E).');
    processStack();
  }, [nodes, adjacencyList, clearTraversal]);

  const handleClear = useCallback(() => {
    clearTraversal();
    setNodes(new Map());
    setEdges([]);
    setAdjacencyList(new Map());
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
          Graph Visualizer (C++)
        </h1>
        <p style={{ fontSize: '18px', opacity: 0.9 }}>
          Learn Graphs - Network Structures with BFS and DFS Traversals
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
              Graph Operations
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '15px' }}>
              <button 
                onClick={createGraph}
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
                Create Graph
              </button>
              <button 
                onClick={bfs}
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
                BFS Traversal
              </button>
              <button 
                onClick={dfs}
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
                DFS Traversal
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
            <div style={{
              background: '#E3F2FD',
              padding: '12px',
              borderRadius: '6px',
              fontSize: '13px',
              color: '#1976D2'
            }}>
              <strong>Traversals:</strong> BFS (level-by-level), DFS (depth-first)
            </div>
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

      <GraphVisualization
        nodes={nodes}
        edges={edges}
        highlightedNodeId={highlightedNodeId}
        visitedNodeIds={visitedNodeIds}
        currentNodeId={currentNodeId}
        traversedEdges={traversedEdges}
      />
    </div>
  );
};

const guide: GuideContent = {
  title: 'Graph Traversals',
  sections: [
    {
      id: 'intro',
      title: 'What is a Graph?',
      content: 'A graph is a collection of nodes (vertices) connected by edges. It can represent networks, relationships, and connections.'
    }
  ]
};

export const graphStructure: DataStructure = {
  id: 'graph',
  name: 'Graph',
  category: 'non-linear',
  description: 'A collection of nodes connected by edges',
  available: true,
  Visualization: GraphVisualization,
  operations: [],
  guide: guide,
  Component: GraphComponent,
};


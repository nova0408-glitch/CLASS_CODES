// Types for Graph data structure

export interface GraphNode {
  id: string;
  value: number;
  x: number;
  y: number;
  isHighlighted?: boolean;
  isVisited?: boolean;
  isCurrent?: boolean;
  isInQueue?: boolean;
}

export interface GraphEdge {
  from: string;
  to: string;
  weight?: number;
  isHighlighted?: boolean;
  isTraversed?: boolean;
}

export interface GraphState {
  nodes: Map<string, GraphNode>;
  edges: GraphEdge[];
  adjacencyList: Map<string, string[]>;
  explanation: string;
}


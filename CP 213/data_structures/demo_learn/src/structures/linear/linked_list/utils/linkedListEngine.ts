import { ListNode, ExecutionState } from '../types';

// Generate unique IDs for nodes
let nodeIdCounter = 0;
export function generateNodeId(): string {
  return `node_${nodeIdCounter++}`;
}

export function resetNodeIdCounter(): void {
  nodeIdCounter = 0;
}

// Create a new node
export function createNode(value: number): ListNode {
  return {
    id: generateNodeId(),
    info: value,
    link: null,
    isHighlighted: false,
    isLost: false,
    isCurrent: false,
  };
}

// Deep clone a node (for visualization purposes)
export function cloneNode(node: ListNode | null, visited: Set<string> = new Set()): ListNode | null {
  if (!node) return null;
  if (visited.has(node.id)) {
    // Loop detected - return reference to existing node
    return node;
  }
  visited.add(node.id);
  
  return {
    ...node,
    link: cloneNode(node.link, visited),
  };
}

// Find all nodes reachable from head
export function getReachableNodes(head: ListNode | null): Set<string> {
  const reachable = new Set<string>();
  const visited = new Set<string>();
  let current = head;
  
  while (current && !visited.has(current.id)) {
    visited.add(current.id);
    reachable.add(current.id);
    current = current.link;
  }
  
  return reachable;
}

// Detect loops in the list
export function detectLoop(head: ListNode | null): boolean {
  if (!head) return false;
  
  const visited = new Set<string>();
  let current: ListNode | null = head;
  
  while (current) {
    if (visited.has(current.id)) {
      return true; // Loop detected
    }
    visited.add(current.id);
    current = current.link;
  }
  
  return false;
}

// Find lost nodes (unreachable from head)
export function findLostNodes(
  head: ListNode | null,
  allNodes: Map<string, ListNode>
): Set<string> {
  const reachable = getReachableNodes(head);
  const lost = new Set<string>();
  
  for (const [id] of allNodes) {
    if (!reachable.has(id)) {
      lost.add(id);
    }
  }
  
  return lost;
}

// Helper to get actual node from allNodes by ID
function getActualNode(node: ListNode | null, allNodes: Map<string, ListNode>): ListNode | null {
  if (!node) return null;
  return allNodes.get(node.id) || null;
}

// Parse and execute a statement
export function executeStatement(
  statement: string,
  state: ExecutionState,
  allNodes: Map<string, ListNode>
): { newState: ExecutionState; explanation: string; error?: string } {
  const trimmed = statement.trim();
  if (!trimmed) {
    return {
      newState: state,
      explanation: 'Empty statement',
      error: 'Please enter a valid statement',
    };
  }

  // Create new state with references to actual nodes
  const newState: ExecutionState = {
    head: getActualNode(state.head, allNodes),
    pointers: new Map(),
    explanation: '',
    stepNumber: state.stepNumber + 1,
    hasLoop: false,
    lostNodes: new Set(state.lostNodes),
  };
  
  // Copy pointers with actual node references
  for (const [name, node] of state.pointers) {
    newState.pointers.set(name, getActualNode(node, allNodes));
  }

  let explanation = '';
  let error: string | undefined;

  try {
    // Pattern matching for different statement types
    
    // Pattern: p = head
    const assignHeadMatch = trimmed.match(/^(\w+)\s*=\s*head$/);
    if (assignHeadMatch) {
      const varName = assignHeadMatch[1];
      newState.pointers.set(varName, newState.head);
      explanation = `Node* pointer ${varName} now points to the head node (first node in the list).`;
      return { newState, explanation };
    }

    // Pattern: p = NULL, p = null, or p = nullptr (C++)
    const assignNullMatch = trimmed.match(/^(\w+)\s*=\s*(NULL|nullptr|null)$/i);
    if (assignNullMatch) {
      const varName = assignNullMatch[1];
      newState.pointers.set(varName, null);
      explanation = `Node* pointer ${varName} is now set to nullptr (C++ null pointer).`;
      return { newState, explanation };
    }

    // Pattern: p = q or p = q->link
    const assignPointerMatch = trimmed.match(/^(\w+)\s*=\s*(\w+)(->link)?$/);
    if (assignPointerMatch) {
      const [_, targetVar, sourceVar, deref] = assignPointerMatch;
      const sourcePtr = newState.pointers.get(sourceVar) || 
                       (sourceVar === 'head' ? newState.head : null);
      
      if (!sourcePtr && sourceVar !== 'head') {
        error = `Node* pointer ${sourceVar} is not defined or is nullptr.`;
        return { newState, explanation, error };
      }
      
      let value: ListNode | null = null;
      if (deref) {
        // Get the actual node's link
        const actualNode = getActualNode(sourcePtr, allNodes);
        value = actualNode?.link ? getActualNode(actualNode.link, allNodes) : null;
      } else {
        value = sourcePtr;
      }
      newState.pointers.set(targetVar, value);
      
      if (deref) {
        explanation = `Node* pointer ${targetVar} now points to the node after ${sourceVar} (accessed via ${sourceVar}->link).`;
      } else {
        explanation = `Node* pointer ${targetVar} now points to the same node struct as ${sourceVar}.`;
      }
      return { newState, explanation };
    }

    // Pattern: newNode = new Node or newNode = new Node(value) or newNode = createNode(value)
    const createNodeMatch = trimmed.match(/^(\w+)\s*=\s*(new\s+Node|createNode)\(?(\d*)\)?$/);
    if (createNodeMatch) {
      const [, varName, , valueStr] = createNodeMatch;
      const value = valueStr ? parseInt(valueStr) : 0;
      const newNode = createNode(value);
      allNodes.set(newNode.id, newNode);
      newState.pointers.set(varName, newNode);
      explanation = `Created a new Node struct with info=${value} using 'new Node' (C++ dynamic allocation). Pointer ${varName} now points to this node.`;
      return { newState, explanation };
    }
    
    // Pattern: newNode->info = value (set info field)
    const setInfoMatch = trimmed.match(/^(\w+)->info\s*=\s*(\d+)$/);
    if (setInfoMatch) {
      const [_, varName, valueStr] = setInfoMatch;
      const ptr = newState.pointers.get(varName) || 
                 (varName === 'head' ? newState.head : null);
      if (!ptr) {
        error = `Cannot set info: ${varName} is nullptr.`;
        return { newState, explanation, error };
      }
      const actualNode = getActualNode(ptr, allNodes);
      if (actualNode) {
        actualNode.info = parseInt(valueStr);
        explanation = `Set the info field of the node pointed to by ${varName} to ${valueStr} using the arrow operator (->).`;
        return { newState, explanation };
      }
    }

    // Pattern: p->link = q or p->link = NULL
    const setLinkMatch = trimmed.match(/^(\w+)->link\s*=\s*(\w+|NULL|null)$/i);
    if (setLinkMatch) {
      const [_, sourceVar, target] = setLinkMatch;
      const sourcePtr = newState.pointers.get(sourceVar) || 
                       (sourceVar === 'head' ? newState.head : null);
      
      if (!sourcePtr) {
        error = `Cannot set link: ${sourceVar} is nullptr.`;
        return { newState, explanation, error };
      }

      let targetNode: ListNode | null = null;
      if (target.toUpperCase() === 'NULL' || target.toLowerCase() === 'nullptr') {
        targetNode = null;
      } else {
        const targetPtr = newState.pointers.get(target) || 
                         (target === 'head' ? newState.head : null);
        targetNode = getActualNode(targetPtr, allNodes);
      }

      // Find the actual node in allNodes
      const actualSourceNode = getActualNode(sourcePtr, allNodes);
      if (actualSourceNode) {
        actualSourceNode.link = targetNode;
        const targetDesc = target.toUpperCase() === 'NULL' || target.toLowerCase() === 'nullptr' 
          ? 'nullptr' 
          : `the node pointed to by ${target}`;
        explanation = `Set ${sourceVar}->link (the link field of the struct) to ${targetDesc} using the arrow operator.`;
      } else {
        error = `Node ${sourcePtr?.id} not found in memory.`;
        return { newState, explanation, error };
      }
      
      return { newState, explanation };
    }

    // Pattern: head = p
    const setHeadMatch = trimmed.match(/^head\s*=\s*(\w+)$/);
    if (setHeadMatch) {
      const varName = setHeadMatch[1];
      const ptr = newState.pointers.get(varName);
      newState.head = getActualNode(ptr || null, allNodes);
      explanation = `Head pointer (Node*) now points to the node struct referenced by ${varName}.`;
      return { newState, explanation };
    }

    // Pattern: delete p or free(p)
    const deleteMatch = trimmed.match(/^(delete|free)\s*\(?(\w+)\)?$/);
    if (deleteMatch) {
      const varName = deleteMatch[2];
      const ptr = newState.pointers.get(varName) || 
                 (varName === 'head' ? newState.head : null);
      
      if (!ptr) {
        error = `Cannot delete: ${varName} is nullptr.`;
        return { newState, explanation, error };
      }

      // Remove from allNodes
      allNodes.delete(ptr.id);
      newState.pointers.delete(varName);
      if (varName === 'head') {
        newState.head = null;
      }
      
      explanation = `Deleted node struct (info=${ptr.info}) using 'delete ${varName}' in C++. Memory deallocated.`;
      return { newState, explanation };
    }

    error = `Unknown statement format: "${trimmed}". Please use valid C++ struct and pointer syntax (e.g., Node* p = head; p->link = newNode;).`;
    return { newState, explanation, error };

  } catch (e) {
    error = `Error executing statement: ${e instanceof Error ? e.message : 'Unknown error'}`;
    return { newState, explanation, error };
  } finally {
    // Update lost nodes and loop detection
    newState.lostNodes = findLostNodes(newState.head, allNodes);
    newState.hasLoop = detectLoop(newState.head);
    
    // Mark lost nodes
    for (const [id, node] of allNodes) {
      if (newState.lostNodes.has(id)) {
        node.isLost = true;
      } else {
        node.isLost = false;
      }
    }
  }
}


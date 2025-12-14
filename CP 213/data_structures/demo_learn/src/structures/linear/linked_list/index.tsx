import React, { useState, useCallback } from 'react';
import { DataStructure } from '../../base/StructureInterface';
import { GuideContent } from '../../base/types';
import LinkedListVisualization from '../../../components/linked_list/LinkedListVisualization';
import CodeEditor from '../../../components/linked_list/CodeEditor';
import ExplanationPanel from '../../../components/linked_list/ExplanationPanel';
import OperationButtons from '../../../components/linked_list/OperationButtons';
import ChallengePanel from '../../../components/linked_list/ChallengePanel';
import TraversalGuide from '../../../components/linked_list/TraversalGuide';
import CodeExamples from '../../../components/linked_list/CodeExamples';
import EducationalContent from '../../../components/linked_list/EducationalContent';
import LearningMode from '../../../components/linked_list/LearningMode';
import References from '../../../components/linked_list/References';
import ExplainLikeImFive from '../../../components/linked_list/ExplainLikeImFive';
import LineByLineExplanation from '../../../components/linked_list/LineByLineExplanation';
import BigONotation from '../../../components/linked_list/BigONotation';
import LinkedListSorting from '../../../components/linked_list/LinkedListSorting';
import SettingsPanel from '../../../components/shared/SettingsPanel';
import Icon from '../../../components/shared/Icon';
import { useTheme } from '../../../contexts/ThemeContext';
import { useFont } from '../../../contexts/FontContext';
import { FiSun, FiMoon } from 'react-icons/fi';
import { ExecutionState, ListNode } from './types';
import { executeStatement, createNode, resetNodeIdCounter } from './utils/linkedListEngine';

const POINTER_COLORS = new Map([
  ['p', '#9B59B6'],
  ['q', '#E67E22'],
  ['newNode', '#1ABC9C'],
  ['temp', '#F39C12'],
  ['current', '#3498DB'],
]);

const LinkedListComponent: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { uiFont } = useFont();
  const isDark = theme === 'dark';
  const [showLearningMode, setShowLearningMode] = useState(false);
  const [showELI5, setShowELI5] = useState(false);
  const [showLineByLine, setShowLineByLine] = useState(false);

  const [state, setState] = useState<ExecutionState>({
    head: null,
    pointers: new Map(),
    explanation: '',
    stepNumber: 0,
    hasLoop: false,
    lostNodes: new Set(),
  });

  const [allNodes, setAllNodes] = useState<Map<string, ListNode>>(new Map());
  const [currentExplanation, setCurrentExplanation] = useState('');
  const [currentError, setCurrentError] = useState<string | undefined>();
  const [currentWarning, setCurrentWarning] = useState<string | undefined>();
  const [score, setScore] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState<any>(null);
  const [operationCode, setOperationCode] = useState<string>('');
  const [operationDescription, setOperationDescription] = useState<string>('');

  const handleExecute = useCallback((statement: string) => {
    const updatedNodes = new Map(allNodes);
    const result = executeStatement(statement, state, updatedNodes);
    
    setState(result.newState);
    setCurrentExplanation(result.explanation);
    setCurrentError(result.error);
    setCurrentWarning(undefined);
    setAllNodes(new Map(updatedNodes));

    if (!result.error && !result.newState.hasLoop && result.newState.lostNodes.size === 0) {
      setScore(prev => prev + 10);
    } else if (result.error || result.newState.hasLoop || result.newState.lostNodes.size > 0) {
      setScore(prev => Math.max(0, prev - 5));
    }
  }, [state, allNodes]);

  const handleClear = useCallback(() => {
    resetNodeIdCounter();
    setState({
      head: null,
      pointers: new Map(),
      explanation: '',
      stepNumber: 0,
      hasLoop: false,
      lostNodes: new Set(),
    });
    setAllNodes(new Map());
    setCurrentExplanation('');
    setCurrentError(undefined);
    setCurrentWarning(undefined);
    setOperationCode('');
    setOperationDescription('');
  }, []);

  const createList = useCallback(() => {
    const node1 = createNode(10);
    const node2 = createNode(20);
    const node3 = createNode(30);
    
    node1.link = node2;
    node2.link = node3;
    
    const nodes = new Map<string, ListNode>();
    nodes.set(node1.id, node1);
    nodes.set(node2.id, node2);
    nodes.set(node3.id, node3);
    
    setAllNodes(nodes);
    setState(prev => ({
      ...prev,
      head: node1,
    }));
    setCurrentExplanation('Created a linked list with Node structs containing values 10, 20, and 30. Head (Node* pointer) points to the first node struct.');
  }, []);

  const insertBeginning = useCallback(() => {
    if (!state.head) {
      setCurrentError('List is empty. Create a list first.');
      return;
    }

    const newNode = createNode(5);
    const nodes = new Map(allNodes);
    nodes.set(newNode.id, newNode);
    
    newNode.link = state.head;
    
    setAllNodes(nodes);
    setState(prev => ({
      ...prev,
      head: newNode,
    }));
    setOperationCode(`// Insert at Beginning - O(1) time complexity
Node* newNode = new Node;
newNode->info = 5;
newNode->link = head;  // Point to current head
head = newNode;        // Update head

// Time Complexity: O(1) - constant time!
// No traversal needed, just pointer updates
// Space Complexity: O(1) - only creating one node`);
    setOperationDescription('Insert at beginning: Direct head update, no traversal. Time: O(1), Space: O(1)');
    setCurrentExplanation('Inserted a new Node struct (info=5) at the beginning. The newNode->link field points to the old head node, and head (Node* pointer) now points to the new node struct. Time Complexity: O(1) - fastest insertion! Space Complexity: O(1).');
  }, [state.head, allNodes]);

  const insertEnd = useCallback(() => {
    if (!state.head) {
      setCurrentError('List is empty. Create a list first.');
      return;
    }

    let current = state.head;
    let steps = 0;
    while (current.link) {
      current = current.link;
      steps++;
    }

    const newNode = createNode(40);
    const nodes = new Map(allNodes);
    nodes.set(newNode.id, newNode);
    
    current.link = newNode;
    
    setAllNodes(nodes);
    setState(prev => ({
      ...prev,
    }));
    setOperationCode(`// Insert at End - O(n) time complexity
Node* newNode = new Node;
newNode->info = 40;
newNode->link = nullptr;

// Traverse to last node - O(n) operation
Node* current = head;
while (current->link != nullptr) {
    current = current->link;  // Move to next node
}

// Insert at end
current->link = newNode;

// Time Complexity: O(n) - must traverse all n nodes
// Space Complexity: O(1) - only creating one node`);
    setOperationDescription(`Insert at end: Traverse to last node (${steps} steps). Time: O(n), Space: O(1)`);
    setCurrentExplanation(`Inserted a new Node struct (info=40) at the end. Traversed ${steps} nodes using Node* pointer until reaching the last node, then set its link field (current->link) to point to the new node struct. Time Complexity: O(n) - had to visit ${steps} nodes. Space Complexity: O(1).`);
  }, [state.head, allNodes]);

  const insertMiddle = useCallback(() => {
    if (!state.head) {
      setCurrentError('List is empty. Create a list first.');
      return;
    }

    let p = state.head;
    if (!p.link) {
      setCurrentError('List has only one node. Cannot insert in middle.');
      return;
    }

    const newNode = createNode(25);
    const nodes = new Map(allNodes);
    nodes.set(newNode.id, newNode);
    
    newNode.link = p.link;
    p.link = newNode;
    
    setAllNodes(nodes);
    setState(prev => ({
      ...prev,
    }));
    setOperationCode(`// Insert in Middle - O(n) time complexity
// Step 1: Traverse to insertion point (p points to node before)
Node* p = head;
// ... traverse to desired position ...

// Step 2: Create new node
Node* newNode = new Node;
newNode->info = 25;

// Step 3: CORRECT ORDER - Preserve remainder first!
newNode->link = p->link;  // Save connection to rest of list

// Step 4: Insert the new node
p->link = newNode;         // Now insert

// Why this order? If we did p->link = newNode first,
// we'd lose the pointer to the rest of the list!`);
    setOperationDescription('Insert at middle: Traverse to position (O(n)), then insert with correct pointer order. Time: O(n), Space: O(1)');
    setCurrentExplanation('Inserted a new Node struct (info=25) in the middle using C++ pointer operations. First, newNode->link was set to preserve the remainder of the list. Then p->link was updated to point to newNode. This is the CORRECT order for C++ struct manipulation. Time Complexity: O(n) - need to traverse to position. Space Complexity: O(1) - only creating one new node.');
  }, [state.head, allNodes]);

  const demonstrateWrong = useCallback(() => {
    if (!state.head) {
      setCurrentError('List is empty. Create a list first.');
      return;
    }

    let p = state.head;
    if (!p.link) {
      setCurrentError('List has only one node. Cannot demonstrate wrong insertion.');
      return;
    }

    const newNode = createNode(99);
    const nodes = new Map(allNodes);
    nodes.set(newNode.id, newNode);
    
    p.link = newNode;
    newNode.link = p.link;
    
    setAllNodes(nodes);
    setState(prev => ({
      ...prev,
    }));
    setCurrentExplanation('DEMONSTRATION OF WRONG ORDER: First, p->link was set to newNode. Then newNode->link was set to p->link, which is now newNode itself! This creates a self-loop in the struct chain and loses the remainder of the list. This is why pointer order matters in C++!');
    setCurrentWarning('The list is now broken! The Node struct that was after p is now lost and unreachable (memory leak in C++).');
  }, [state.head, allNodes]);

  const deleteNode = useCallback(() => {
    if (!state.head) {
      setCurrentError('List is empty. Nothing to delete.');
      return;
    }

    const nodes = new Map(allNodes);
    const oldHead = state.head;
    nodes.delete(oldHead.id);
    
    setAllNodes(nodes);
    setState(prev => ({
      ...prev,
      head: oldHead.link,
    }));
    setCurrentExplanation(`Deleted the first Node struct (info=${oldHead.info}) using 'delete' in C++. Head (Node* pointer) now points to the second node struct, or nullptr if the list is empty.`);
  }, [state.head, allNodes]);

  const traverse = useCallback(() => {
    if (!state.head) {
      setCurrentError('List is empty. Nothing to traverse.');
      return;
    }

    const values: number[] = [];
    const visited = new Set<string>();
    let current: ListNode | null = state.head;
    
    while (current && !visited.has(current.id)) {
      visited.add(current.id);
      if (current.info !== null) {
        values.push(current.info);
      }
      current = current.link;
    }

    if (visited.size < allNodes.size) {
      setCurrentWarning('Loop detected during traversal! Some nodes were not visited.');
    }

    setCurrentExplanation(`Traversed the list using Node* pointer. Visited Node structs with info values: ${values.join(' -> ')}${current ? ' (loop detected!)' : ''}. Used arrow operator (->) to access info and link fields.`);
  }, [state.head, allNodes]);

  const search = useCallback(() => {
    if (!state.head) {
      setCurrentError('List is empty. Nothing to search.');
      return;
    }

    const searchValue = 20;
    let current: ListNode | null = state.head;
    let found = false;
    let position = 0;
    const visited = new Set<string>();

    while (current && !visited.has(current.id)) {
      visited.add(current.id);
      if (current.info === searchValue) {
        found = true;
        break;
      }
      position++;
      current = current.link;
    }

    setOperationCode(`// Search Algorithm - O(n) time complexity
bool search(Node* head, int target) {
    Node* current = head;  // Start at head
    int position = 0;
    
    while (current != nullptr) {
        if (current->info == target) {
            return true;  // Found! Best case: O(1)
        }
        current = current->link;  // Move to next
        position++;
    }
    return false;  // Not found - worst case: O(n)
}

// Time Complexity:
// Best case: O(1) - element at head
// Average case: O(n/2) = O(n)
// Worst case: O(n) - element at end or not found
// Space Complexity: O(1) - only using pointers`);
    setOperationDescription(`Search for value ${searchValue}. ${found ? `Found at position ${position}.` : 'Not found.'} Time: O(n), Space: O(1)`);
    setCurrentExplanation(found 
      ? `Found Node struct with info=${searchValue} at position ${position} in the list using pointer traversal. Time Complexity: O(${position + 1}) in this case, but worst case O(n). Space Complexity: O(1) - only using a pointer.`
      : `Node struct with info=${searchValue} not found in the list. Searched all ${visited.size} nodes. Time Complexity: O(n) - had to check every node. Space Complexity: O(1).`
    );
  }, [state.head]);

  const handleStartChallenge = useCallback((challenge: any) => {
    setCurrentChallenge(challenge);
    handleClear();
    createList();
    setCurrentExplanation(`Challenge started: ${challenge.title}. ${challenge.description}`);
  }, [handleClear, createList]);

  const handleShowCode = useCallback((code: string, description: string) => {
    setOperationCode(code);
    setOperationDescription(description);
  }, []);

  const handleLearningStep = useCallback(() => {
    // Step handler for learning mode
  }, []);

  const handleLearningReset = useCallback(() => {
    handleClear();
  }, [handleClear]);

  const textColor = isDark ? '#e0e0e0' : '#333';
  const borderColor = isDark ? '#333' : 'rgba(255, 255, 255, 0.3)';
  const headerBg = isDark ? 'rgba(10, 10, 15, 0.8)' : 'rgba(255, 255, 255, 0.15)';

  const sampleCode = `Node* newNode = new Node;
newNode->info = 10;
newNode->link = head;
head = newNode;`;

  const lineExplanations = [
    {
      line: 'Node* newNode = new Node;',
      explanation: 'This line creates a new node in memory. Think of it like getting a brand new box that will hold our data and a pointer to the next box.'
    },
    {
      line: 'newNode->info = 10;',
      explanation: 'We put the value 10 into the info field of our new node. The arrow operator (->) lets us access the node\'s fields through the pointer.'
    },
    {
      line: 'newNode->link = head;',
      explanation: 'We set the new node\'s link to point to the current head. This preserves the connection to the rest of the list.'
    },
    {
      line: 'head = newNode;',
      explanation: 'Finally, we update head to point to our new node, making it the first node in the list.'
    }
  ];

  const bgGradient = isDark 
    ? 'linear-gradient(135deg, #0a0a0f 0%, #1a1a25 50%, #0f0f15 100%)'
    : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';

  return (
    <div style={{ 
      minHeight: '100vh',
      background: bgGradient,
      padding: '20px',
      fontFamily: uiFont
    }}>
      <SettingsPanel />
      <div style={{ 
        maxWidth: '1600px', 
        margin: '0 auto',
      }}>
        <header style={{ 
          textAlign: 'center', 
          marginBottom: '30px',
          padding: '30px',
          background: isDark ? 'rgba(20, 20, 30, 0.6)' : 'rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          borderRadius: '16px',
          border: `1px solid ${borderColor}`,
          boxShadow: isDark ? '0 8px 32px 0 rgba(0, 0, 0, 0.3)' : '0 8px 32px 0 rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '15px'
          }}>
            <div style={{ flex: 1 }} />
            <h1 style={{ 
              fontSize: '38px', 
              margin: 0,
              color: textColor,
              textShadow: isDark ? '0 2px 10px rgba(0,0,0,0.5)' : '2px 2px 4px rgba(0,0,0,0.3)',
              fontWeight: '700',
              fontFamily: uiFont
            }}>
              Linked List Visualizer
            </h1>
            <button
              onClick={toggleTheme}
              style={{
                background: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.2)',
                border: `1px solid ${borderColor}`,
                borderRadius: '8px',
                padding: '10px',
                cursor: 'pointer',
                color: textColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.2)';
              }}
            >
              {isDark ? <FiSun size={20} /> : <FiMoon size={20} />}
            </button>
          </div>
          <p style={{ 
            fontSize: '18px', 
            color: textColor,
            opacity: 0.9,
            marginBottom: '15px'
          }}>
            Learn C++ Structs and Pointers - Interactive Memory-Level Visualization
          </p>
          <div style={{
            display: 'flex',
            gap: '10px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <button
              onClick={() => setShowLearningMode(!showLearningMode)}
              style={{
                background: isDark ? 'rgba(74, 158, 255, 0.2)' : 'rgba(255, 255, 255, 0.25)',
                border: `1px solid ${isDark ? 'rgba(74, 158, 255, 0.4)' : 'rgba(255, 255, 255, 0.4)'}`,
                color: textColor,
                padding: '10px 20px',
                borderRadius: '10px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '14px',
                transition: 'all 0.2s',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                fontFamily: uiFont
              }}
            >
              {showLearningMode ? 'Hide' : 'Show'} Learning Mode
            </button>
            <button
              onClick={() => setShowELI5(!showELI5)}
              style={{
                background: isDark ? 'rgba(255, 200, 100, 0.2)' : 'rgba(255, 255, 100, 0.3)',
                border: `1px solid ${isDark ? 'rgba(255, 200, 100, 0.4)' : 'rgba(255, 255, 100, 0.5)'}`,
                color: textColor,
                padding: '10px 20px',
                borderRadius: '10px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '14px',
                transition: 'all 0.2s',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                fontFamily: uiFont
              }}
            >
              👶 {showELI5 ? 'Hide' : 'Show'} Explain Like I'm 5
            </button>
            <button
              onClick={() => setShowLineByLine(!showLineByLine)}
              style={{
                background: isDark ? 'rgba(150, 255, 150, 0.2)' : 'rgba(150, 255, 150, 0.3)',
                border: `1px solid ${isDark ? 'rgba(150, 255, 150, 0.4)' : 'rgba(150, 255, 150, 0.5)'}`,
                color: textColor,
                padding: '10px 20px',
                borderRadius: '10px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '14px',
                transition: 'all 0.2s',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                fontFamily: uiFont
              }}
            >
              📝 {showLineByLine ? 'Hide' : 'Show'} Line-by-Line Explanation
            </button>
            <div style={{ 
              background: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.15)', 
              padding: '10px 20px', 
              borderRadius: '10px',
              border: `1px solid ${borderColor}`,
              fontSize: '14px',
              color: textColor,
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              fontFamily: uiFont
            }}>
              <strong>Focus:</strong> C++ struct-based linked lists using Node* pointers and the arrow operator (-&gt;)
            </div>
          </div>
        </header>

        {showELI5 && (
          <div style={{ marginBottom: '25px' }}>
            <ExplainLikeImFive />
          </div>
        )}

        {showLineByLine && (
          <div style={{ marginBottom: '25px' }}>
            <LineByLineExplanation 
              code={sampleCode}
              explanations={lineExplanations}
              title="Insert at Beginning - Line by Line"
            />
          </div>
        )}

        {showLearningMode && (
          <div style={{ marginBottom: '25px' }}>
            <LearningMode 
              onStep={handleLearningStep}
              onReset={handleLearningReset}
            />
          </div>
        )}

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
          gap: '20px',
          marginBottom: '25px'
        }}>
          <EducationalContent />
          <CodeExamples />
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
          gap: '20px',
          marginBottom: '25px'
        }}>
          <div>
            <ChallengePanel
              currentChallenge={currentChallenge}
              onStartChallenge={handleStartChallenge}
              score={score}
            />
            
            <OperationButtons
              onCreateList={createList}
              onInsertBeginning={insertBeginning}
              onInsertEnd={insertEnd}
              onInsertMiddle={insertMiddle}
              onDelete={deleteNode}
              onTraverse={traverse}
              onSearch={search}
              onDemonstrateWrong={demonstrateWrong}
              onShowCode={handleShowCode}
            />
          </div>

          <div>
            <CodeEditor
              onExecute={handleExecute}
              onClear={handleClear}
            />
            
            {operationCode && (
              <div style={{
                background: isDark ? 'rgba(74, 158, 255, 0.15)' : '#E3F2FD',
                padding: '15px',
                borderRadius: '12px',
                margin: '20px 0',
                border: `2px solid ${isDark ? 'rgba(74, 158, 255, 0.4)' : '#2196F3'}`
              }}>
                <h4 style={{ 
                  color: isDark ? '#4a9eff' : '#1976D2', 
                  marginBottom: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <Icon name="code" size={18} color={isDark ? '#4a9eff' : '#1976D2'} />
                  Operation Code Executed
                </h4>
                <p style={{ color: isDark ? '#c0c0c0' : '#666', fontSize: '13px', marginBottom: '10px' }}>
                  {operationDescription}
                </p>
                <pre style={{
                  margin: 0,
                  fontFamily: 'var(--code-font)',
                  fontSize: '13px',
                  color: isDark ? '#e0e0e0' : '#212529',
                  background: isDark ? '#1a1a1f' : 'white',
                  padding: '15px',
                  borderRadius: '8px',
                  overflowX: 'auto',
                  border: `1px solid ${isDark ? '#333' : '#dee2e6'}`,
                  lineHeight: '1.6'
                }}>
                  {operationCode}
                </pre>
              </div>
            )}
            
            <ExplanationPanel
              explanation={currentExplanation}
              error={currentError}
              warning={currentWarning}
            />
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gap: '20px',
          marginBottom: '25px'
        }}>
          <LinkedListVisualization
            state={state}
            allNodes={allNodes}
            pointerColors={POINTER_COLORS}
          />
          <div>
            <References />
            <TraversalGuide onStepTraverse={traverse} />
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '20px',
          marginBottom: '25px'
        }}>
          <BigONotation />
          <LinkedListSorting
            listNodes={allNodes}
            currentHead={state.head}
            onUpdateList={(nodes, head) => {
              setAllNodes(nodes);
              setState(prev => ({ ...prev, head }));
            }}
          />
        </div>

        <footer style={{ 
          textAlign: 'center', 
          marginTop: '30px', 
          padding: '20px',
          background: headerBg,
          borderRadius: '12px',
          border: `1px solid ${borderColor}`,
          color: textColor,
          opacity: 0.9
        }}>
          <p>Step {state.stepNumber} | Nodes: {allNodes.size} | Lost Nodes: {state.lostNodes.size}</p>
        </footer>
      </div>
    </div>
  );
};

const guide: GuideContent = {
  title: 'Linked List Traversal',
  sections: [
    {
      id: 'intro',
      title: 'What is Traversal?',
      content: 'Traversal is the process of visiting each node in a linked list exactly once.'
    },
    {
      id: 'algorithm',
      title: 'Traversal Algorithm',
      content: 'Start at head, follow links until NULL',
      code: 'current = head; while (current != NULL) { process(current); current = current->link; }'
    }
  ]
};

export const linkedListStructure: DataStructure = {
  id: 'linked_list',
  name: 'Linked List',
  category: 'linear',
  description: 'A linear data structure where elements are linked using pointers',
  available: true,
  Visualization: LinkedListVisualization,
  operations: [],
  guide: guide,
  Component: LinkedListComponent,
};


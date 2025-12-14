import React, { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { useFont } from '../../contexts/FontContext';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

const codeExamples = {
  basic: {
    title: 'Basic Linked List Creation (main.cpp)',
    description: 'Simple example showing how to create nodes and link them together',
    code: `#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* link;
};

Node* head = nullptr;

int main() {
    Node* node1 = new Node;
    node1->data = 10;

    Node* node2 = new Node;
    node2->data = 20;

    Node* node3 = new Node;
    node3->data = 40;

    node1->link = node2;
    node2->link = node3;
    node3->link = nullptr;

    head = node1;

    cout << node3->data << endl;
    cout << (*node2).data << endl;
}`
  },
  operations: {
    title: 'Full Operations Implementation (main_2.cpp)',
    description: 'Complete implementation with insert, delete, search operations',
    code: `#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* next;
};

void printList(Node* head) {
    Node* current = head;
    while (current != nullptr) {
        cout << current->data << " -> ";
        current = current->next;
    }
    cout << "NULL\\n";
}

void insertAtHead(Node*& head, int value) {
    Node* newNode = new Node{value, head};
    head = newNode;
}

void insertAtTail(Node*& head, int value) {
    Node* newNode = new Node{value, nullptr};
    if (!head) {
        head = newNode;
        return;
    }
    Node* temp = head;
    while (temp->next != nullptr) {
        temp = temp->next;
    }
    temp->next = newNode;
}

void deleteHead(Node*& head) {
    if (!head) return;
    Node* temp = head;
    head = head->next;
    delete temp;
}

bool search(Node* head, int value) {
    Node* temp = head;
    while (temp) {
        if (temp->data == value) return true;
        temp = temp->next;
    }
    return false;
}`
  },
  advanced: {
    title: 'Advanced Operations (linked_list.cpp)',
    description: 'Comprehensive implementation with insert at position, delete operations',
    code: `#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* next;
};

Node* insertAtBeginning(Node* head, int value) {
    Node* newNode = new Node();
    newNode->data = value;
    newNode->next = head;
    return newNode;
}

void insertAtPosition(Node* head, int value, int position) {
    if (position == 0) {
        head = insertAtBeginning(head, value);
        return;
    }
    Node* temp = head;
    for (int i = 0; i < position - 1; i++) {
        if (temp == nullptr) {
            cout << "Position out of bounds" << endl;
            return;
        }
        temp = temp->next;
    }
    Node* newNode = new Node();
    newNode->data = value;
    newNode->next = temp->next;
    temp->next = newNode;
}

void deleteFromPosition(Node* head, int position) {
    if (head == nullptr || position < 0) return;
    if (position == 0) {
        Node* temp = head;
        head = head->next;
        delete temp;
        return;
    }
    Node* temp = head;
    for (int i = 0; i < position - 1; i++) {
        if (temp == nullptr || temp->next == nullptr) return;
        temp = temp->next;
    }
    Node* nodeToDelete = temp->next;
    temp->next = nodeToDelete->next;
    delete nodeToDelete;
}

void display(Node* head) {
    Node* temp = head;
    while (temp != nullptr) {
        cout << temp->data << " -> ";
        temp = temp->next;
    }
    cout << "null" << endl;
}`
  }
};

const CodeExamples: React.FC = () => {
  const { theme } = useTheme();
  const { uiFont, codeFont } = useFont();
  const [expanded, setExpanded] = useState<string | null>(null);

  const isDark = theme === 'dark';
  const bgColor = isDark 
    ? 'rgba(20, 20, 30, 0.7)' 
    : 'rgba(255, 255, 255, 0.25)';
  const textColor = isDark ? '#e0e0e0' : '#333';
  const codeBg = isDark ? '#1a1a1f' : '#f8f9fa';
  const borderColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.3)';
  const headerBg = isDark ? 'rgba(30, 30, 40, 0.6)' : 'rgba(240, 240, 240, 0.4)';

  return (
    <div style={{
      background: bgColor,
      backdropFilter: 'blur(20px) saturate(180%)',
      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
      padding: '25px',
      borderRadius: '16px',
      border: `1px solid ${borderColor}`,
      marginBottom: '20px',
      boxShadow: isDark ? '0 8px 32px 0 rgba(0, 0, 0, 0.3)' : '0 8px 32px 0 rgba(0, 0, 0, 0.1)'
    }}>
      <h3 style={{
        color: textColor,
        marginBottom: '15px',
        fontSize: '18px',
        fontWeight: '600',
        fontFamily: uiFont
      }}>
        Code Examples
      </h3>

      {Object.entries(codeExamples).map(([key, example]) => (
        <div
          key={key}
          style={{
            marginBottom: '15px',
            border: `1px solid ${borderColor}`,
            borderRadius: '8px',
            overflow: 'hidden'
          }}
        >
          <div
            onClick={() => setExpanded(expanded === key ? null : key)}
            style={{
              background: headerBg,
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              padding: '15px 18px',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              transition: 'background 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = isDark 
                ? 'rgba(40, 40, 50, 0.8)' 
                : 'rgba(250, 250, 250, 0.6)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = headerBg;
            }}
          >
            <div>
              <div style={{ color: textColor, fontWeight: '600', marginBottom: '4px', fontFamily: uiFont }}>
                {example.title}
              </div>
              <div style={{ color: isDark ? '#aaa' : '#666', fontSize: '12px', fontFamily: uiFont }}>
                {example.description}
              </div>
            </div>
            {expanded === key ? <FiChevronUp size={18} color={textColor} /> : <FiChevronDown size={18} color={textColor} />}
          </div>

          {expanded === key && (
            <pre style={{
              margin: 0,
              padding: '20px',
              background: codeBg,
              color: isDark ? '#e0e0e0' : '#212529',
              fontFamily: codeFont,
              fontSize: '14px',
              overflowX: 'auto',
              borderTop: `1px solid ${borderColor}`,
              borderRadius: '0 0 12px 12px',
              lineHeight: '1.6'
            }}>
              {example.code}
            </pre>
          )}
        </div>
      ))}
    </div>
  );
};

export default CodeExamples;

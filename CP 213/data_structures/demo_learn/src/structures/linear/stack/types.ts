// Types for Stack data structure

export interface StackElement {
  value: number;
  index: number;
  isHighlighted?: boolean;
  isPushing?: boolean;
  isPopping?: boolean;
}

export interface StackState {
  elements: StackElement[];
  top: number; // -1 if empty, otherwise index of top element
  capacity: number;
  explanation: string;
}


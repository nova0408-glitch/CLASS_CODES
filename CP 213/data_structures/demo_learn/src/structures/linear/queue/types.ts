// Types for Queue data structure

export interface QueueElement {
  value: number;
  index: number;
  isHighlighted?: boolean;
  isEnqueuing?: boolean;
  isDequeuing?: boolean;
}

export interface QueueState {
  elements: QueueElement[];
  front: number; // Index of front element
  rear: number;  // Index of rear element
  size: number;
  capacity: number;
  explanation: string;
}


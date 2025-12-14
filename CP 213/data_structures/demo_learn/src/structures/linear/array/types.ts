// Types for Array data structure

export interface ArrayElement {
  value: number | null;
  index: number;
  isHighlighted?: boolean;
  isActive?: boolean;
  isSearching?: boolean;
}

export interface ArrayState {
  elements: ArrayElement[];
  size: number;
  capacity: number;
  currentIndex?: number;
  explanation: string;
}


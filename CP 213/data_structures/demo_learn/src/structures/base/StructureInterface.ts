import { StructureCategory, Operation, GuideContent } from './types';

// Base interface that all data structures must implement
export interface DataStructure {
  id: string;
  name: string;
  category: StructureCategory;
  description: string;
  icon?: string;
  available: boolean;
  
  // Main visualization component
  Visualization: React.ComponentType<any>;
  
  // Operations available for this structure
  operations: Operation[];
  
  // Educational guide content
  guide: GuideContent;
  
  // Main component that renders the full structure view
  Component: React.ComponentType<any>;
}

// Registry for all data structures
export class StructureRegistry {
  private static structures: Map<string, DataStructure> = new Map();

  static register(structure: DataStructure): void {
    this.structures.set(structure.id, structure);
  }

  static get(id: string): DataStructure | undefined {
    return this.structures.get(id);
  }

  static getAll(): DataStructure[] {
    return Array.from(this.structures.values());
  }

  static getByCategory(category: StructureCategory): DataStructure[] {
    return this.getAll().filter(s => s.category === category);
  }

  static getAvailable(): DataStructure[] {
    return this.getAll().filter(s => s.available);
  }
}


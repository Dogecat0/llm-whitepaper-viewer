// src/types.ts
export interface DiagramNode {
  id: string;
  title: string;
  description?: string;
  children?: DiagramNode[];
}
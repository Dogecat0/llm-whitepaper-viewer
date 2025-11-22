// src/types.ts
export interface DiagramNode {
  id: string;
  title: string;
  description?: string;
  icon?: React.ReactNode | string;
  layout?: 'default' | 'process' | 'relationship' | 'timeline';
  children?: DiagramNode[];
}
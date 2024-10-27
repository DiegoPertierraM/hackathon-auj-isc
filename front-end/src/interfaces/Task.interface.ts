export interface Task {
  id: number;
  name: string;
  format: Format;
  date: string;
  description: string;
}

export type Format = 'Reunión' | 'Seguimiento';

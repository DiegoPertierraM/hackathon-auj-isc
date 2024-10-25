export class Opportunity {
  id: number;
  title: string;
  description: string;
  status: Status;
  createdAt: Date;
  updatedAt: Date;
}

export type Status = 'new' | 'inProgress' | 'closed';

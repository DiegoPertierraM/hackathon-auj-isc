export class Opportunity {
  id: number;
  title: string;
  name: string;
  description: string;
  status: Status;
  created: Date;
  updated: Date;
}

export type Status = 'new' | 'inProgress' | 'closed';

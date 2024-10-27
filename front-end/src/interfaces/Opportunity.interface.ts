export interface Opportunity {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: Status;
  company: string;
}

export type Status = 'new' | 'inProgress' | 'closed';

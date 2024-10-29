export interface Opportunity {
  id: number;
  title: string;
  name: string;
  description: string;

  status: Status;
}

export interface OpportunityCreate {
  title: string;
  name: string;
  description: string;
  status: Status;
}

export type Status = 'new' | 'inProgress' | 'closed';

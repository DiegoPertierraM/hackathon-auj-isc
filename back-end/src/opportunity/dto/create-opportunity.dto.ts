import { Status } from '../entities/opportunity.entity';

export class CreateOpportunityDto {
  id: number;
  title: string;
  name: string;
  description: string;
  status: Status;
  created: Date;
  updated: Date;
}

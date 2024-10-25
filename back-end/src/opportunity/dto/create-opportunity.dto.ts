import { Status } from '../entities/opportunity.entity';

export class CreateOpportunityDto {
  id: string;
  title: string;
  description: string;
  status: Status;
  createdAt: Date;
  updatedAt: Date;
}

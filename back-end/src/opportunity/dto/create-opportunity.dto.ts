import { Status } from '../entities/opportunity.entity';

export class CreateOpportunityDto {
  id: number;
  title: string;
  description: string;
  status: Status;
  createdAt: Date;
  updatedAt: Date;
}

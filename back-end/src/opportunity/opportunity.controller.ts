import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { OpportunityService } from './opportunity.service';
import { CreateOpportunityDto } from './dto/create-opportunity.dto';
import { UpdateOpportunityDto } from './dto/update-opportunity.dto';
import { LoggerGuard } from '../core/guard/logger.guard';

@Controller('opportunity')
export class OpportunityController {
  constructor(private readonly opportunityService: OpportunityService) {}

  @UseGuards(LoggerGuard)
  @Post()
  create(@Body() createOpportunityDto: CreateOpportunityDto) {
    return this.opportunityService.create(createOpportunityDto);
  }

  @UseGuards(LoggerGuard)
  @Get()
  findAll() {
    return this.opportunityService.findAll();
  }

  @UseGuards(LoggerGuard)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.opportunityService.findOne(id);
  }

  @UseGuards(LoggerGuard)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateOpportunityDto: UpdateOpportunityDto,
  ) {
    return this.opportunityService.update(id, updateOpportunityDto);
  }
  @UseGuards(LoggerGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.opportunityService.remove(id);
  }
}

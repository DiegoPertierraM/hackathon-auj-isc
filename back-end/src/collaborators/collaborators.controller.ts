import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { CollaboratorsService } from './collaborators.service';
import { CreateCollaboratorDto } from './dto/create-collaborator.dto';
import { UpdateCollaboratorDto } from './dto/update-collaborator.dto';
import { LoggerGuard } from '../core/guard/logger.guard';

@Controller('collaborators')
export class CollaboratorsController {
  constructor(private readonly collaboratorsService: CollaboratorsService) {}

  @UseGuards(LoggerGuard)
  @Post()
  create(@Body() createCollaboratorDto: CreateCollaboratorDto) {
    return this.collaboratorsService.create(createCollaboratorDto);
  }

  @UseGuards(LoggerGuard)
  @Get()
  findAll() {
    return this.collaboratorsService.findAll();
  }

  @UseGuards(LoggerGuard)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.collaboratorsService.findOne(+id);
  }

  @UseGuards(LoggerGuard)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCollaboratorDto: UpdateCollaboratorDto,
  ) {
    return this.collaboratorsService.update(+id, updateCollaboratorDto);
  }

  @UseGuards(LoggerGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.collaboratorsService.remove(+id);
  }
}

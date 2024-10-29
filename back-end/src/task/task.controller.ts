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
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { LoggerGuard } from '../core/guard/logger.guard';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @UseGuards(LoggerGuard)
  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }

  @UseGuards(LoggerGuard)
  @Get()
  findAll() {
    return this.taskService.findAll();
  }

  @UseGuards(LoggerGuard)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.taskService.findOne(+id);
  }

  @UseGuards(LoggerGuard)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.taskService.update(+id, updateTaskDto);
  }

  @UseGuards(LoggerGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.taskService.remove(+id);
  }
  // Found user relacional to task
  @UseGuards(LoggerGuard)
  @Get(':taskId/users')
  async getUsersByTask(@Param('taskId', ParseIntPipe) taskId: number) {
    return this.taskService.getUsersByTask(taskId);
  }
  @UseGuards(LoggerGuard)
  @Get(':userId/tasks')
  async getTasksByUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.taskService.getTasksByUser(userId);
  }
}

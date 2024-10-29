import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ForbiddenException,
  ParseIntPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoggerGuard } from '../core/guard/logger.guard';
import { TokenService } from '../core/token/token.service';
import * as bcrypt from 'bcryptjs';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }
  @UseGuards(LoggerGuard)
  @Get('/login')
  async loginWithToken(@Body() validData: { payload: { id: number } }) {
    const userId = validData.payload.id;
    const user = await this.userService.findOne(userId);
    if (!user) {
      throw new ForbiddenException('Token invalid');
    }
    return {
      token: await this.tokenService.createToken(user),
      userId: user.id,
      userEmail: user.email,
    };
  }

  @Post('/login')
  async login(@Body() data: CreateUserDto) {
    const { email, password } = data;
    if (!email || !password) {
      throw new ForbiddenException('Email or password required');
    }
    const user = await this.userService.findForLogin(email);

    if (!user) {
      throw new ForbiddenException('Email or password invalid');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new ForbiddenException('Email or password invalid');
    }
    return {
      token: await this.tokenService.createToken(user),
      userId: user.id,
      username: user.name,
      userEmail: user.email,
    };
  }
  @UseGuards(LoggerGuard)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(LoggerGuard)
  @Get('email/:email')
  findForLogin(@Param('email') email: string) {
    return this.userService.findForLogin(email);
  }

  @UseGuards(LoggerGuard)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  @UseGuards(LoggerGuard)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }
  @UseGuards(LoggerGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }

  @UseGuards(LoggerGuard)
  @Post(':userId/task/:taskId')
  async addTaskToUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('taskId', ParseIntPipe) taskId: number,
  ) {
    return this.userService.addTaskToUser(userId, taskId);
  }

  @UseGuards(LoggerGuard)
  @Delete(':userId/task/:taskId')
  async removeTaskFromUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('taskId', ParseIntPipe) taskId: number,
  ) {
    return this.userService.removeTaskToUser(userId, taskId);
  }

  @Post('password-recovery')
  async passwordRecovery(@Body('email') email: string) {
    return this.userService.passwordRecovery(email);
  }
}

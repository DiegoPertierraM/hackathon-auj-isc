import { LoggerGuard } from './logger.guard';
import { TokenService } from '../token/token.service';
import {
  ExecutionContext,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

describe('LoggerGuard', () => {
  let guard: LoggerGuard;
  let tokenService: TokenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoggerGuard,
        {
          provide: TokenService,
          useValue: {
            compareToken: jest.fn(),
          },
        },
      ],
    }).compile();

    guard = module.get<LoggerGuard>(LoggerGuard);
    tokenService = module.get<TokenService>(TokenService);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  it('should return true if token is valid', async () => {
    const mockExecutionContext = {
      switchToHttp: () => ({
        getRequest: () => ({
          headers: { authorization: 'Bearer valid_token' },
        }),
      }),
    } as unknown as ExecutionContext;

    // Simula un token valido
    (tokenService.compareToken as jest.Mock).mockResolvedValue({
      id: 'user_id',
    });

    const result = await guard.canActivate(mockExecutionContext);
    expect(result).toBe(true);
    expect(tokenService.compareToken).toHaveBeenCalledWith('valid_token');
  });

  it('should throw BadRequestException if authorization header is missing', async () => {
    const mockExecutionContext = {
      switchToHttp: () => ({
        getRequest: () => ({
          headers: {},
        }),
      }),
    } as unknown as ExecutionContext;

    await expect(guard.canActivate(mockExecutionContext)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should throw ForbiddenException if token is invalid', async () => {
    const mockExecutionContext = {
      switchToHttp: () => ({
        getRequest: () => ({
          headers: { authorization: 'Bearer invalid_token' },
        }),
      }),
    } as unknown as ExecutionContext;

    // Simula un token non valido
    (tokenService.compareToken as jest.Mock).mockRejectedValue(
      new Error('Token invalid'),
    );

    await expect(guard.canActivate(mockExecutionContext)).rejects.toThrow(
      ForbiddenException,
    );
  });
});

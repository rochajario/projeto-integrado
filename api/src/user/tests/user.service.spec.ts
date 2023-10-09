import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { User } from '../entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { HttpException, Provider } from '@nestjs/common';
import { UpsertUserDto } from '../dto/upsert-user.dto';

describe('UserService', () => {
  let service: UserService;
  let mockRepository: Provider;

  async function configureMock(repoMethods) {
    mockRepository = {
      provide: getRepositoryToken(User),
      useValue: repoMethods,
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, mockRepository],
    }).compile();

    return module.get<UserService>(UserService);
  }

  describe('create', () => {
    it('should not allow creating new User when there is another with the same e-mail', async () => {
      //arrange
      const dto: UpsertUserDto = {
        firstName: 'Test',
        lastName: 'User',
        email: 'test@test.com',
        password: 'samplePassword',
      };

      service = await configureMock({
        findOneBy: jest.fn().mockResolvedValue({
          email: dto.email,
        }),
      });

      //act-assert
      await expect(service.create(dto)).rejects.toThrowError(HttpException);
    });

    it('should allow creating new User returning creation datetime', async () => {
      //arrange
      const dto: UpsertUserDto = {
        firstName: 'Test',
        lastName: 'User',
        email: 'test@test.com',
        password: 'samplePassword',
      };

      service = await configureMock({
        findOneBy: jest.fn(),
        save: jest.fn().mockResolvedValue({
          ...dto,
          createdAt: new Date('2023-01-01'),
        }),
      });

      //act
      const result = await service.create(dto);

      //assert
      expect(result.createdAt).toBeDefined();
    });
  });
});

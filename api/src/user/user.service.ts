import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpsertUserDto } from './dto/upsert-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as argon2 from 'argon2';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  private readonly userRepository: Repository<User>;

  constructor(@InjectRepository(User) userRepository: Repository<User>) {
    this.userRepository = userRepository;
  }

  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findOneBy({
      email: email,
    });
  }

  async findById(id: number): Promise<User> {
    const { password, ...result } = await this.userRepository.findOne({
      where: {
        userId: id,
      },
    });
    return result;
  }

  async create(createUserDto: UpsertUserDto) {
    const previousUser = await this.findByEmail(createUserDto.email);

    if (previousUser) {
      throw new HttpException(
        'Usuário previamente cadastrado com email informado',
        HttpStatus.CONFLICT,
      );
    }

    const newUser: User = {
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      email: createUserDto.email,
      password: await argon2.hash(createUserDto.password),
      createdAt: new Date(),
    };

    const { password, ...result } = await this.userRepository.save(newUser);
    return result;
  }

  async setLoginTime(id: number) {
    const user = await this.findById(id);
    this.userRepository.save({ ...user, lastLogin: new Date() });
  }

  async update(id: number, updateUserDto: UpsertUserDto) {
    const user = await this.findById(id);

    const editedUser: User = {
      userId: user.userId,
      createdAt: user.createdAt,
      email: updateUserDto.email,
      firstName: updateUserDto.firstName,
      lastName: updateUserDto.lastName,
      password: await argon2.hash(updateUserDto.password),
    };

    const { password, ...result } = await this.userRepository.save(editedUser);
    return result;
  }

  async remove(id: number) {
    const user = await this.findById(id);
    await this.userRepository.remove(user);
  }
}

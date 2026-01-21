import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { randomUUID } from 'crypto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users: User[] = [];

  findAll(): User[] {
    return this.users;
  }

  findOne(id: string): User {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }

    return user;
  }

  create(dto: CreateUserDto): User {
    const user: User = {
      id: randomUUID(),
      name: dto.name,
      email: dto.email,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: new Date(),
    };

    this.users.push(user);
    return user;
  }

  update(id: string, dto: UpdateUserDto): User {
    const user = this.findOne(id);

    if (dto.name !== undefined) {
      user.name = dto.name;
    }

    if (dto.email !== undefined) {
      user.email = dto.email;
    }

    return user;
  }

  remove(id: string) {
    const idx = this.users.findIndex((user) => user.id === id);

    if (idx === -1) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }

    this.users.splice(idx, 1);
  }
}

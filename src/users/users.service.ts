import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) 
        private usersRepository: Repository<User>,
    ) {}

    async findAll () : Promise<User[]> {
        return this.usersRepository.find();
    }   
    
    async findOne(username: string): Promise<User | null> {
        return this.usersRepository.findOne({
            where: {
                username
            }
        });
    }

    async create(username: string, password: string): Promise<User> {
        return this.usersRepository.create({
            username, password
        })
    }
}

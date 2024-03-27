import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { userDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
    constructor (
        private usersService: UsersService,
        private jwtService: JwtService
    ) {

    }

    async validateUser (username: string, password: string): Promise<userDto> {
        const user = await this.usersService.findOne(username);
        if(user && user.password === password) {
            const {password, ...result} = user ;
            return result ;
        }
        return null;
    } 

    async login(user: userDto): Promise<{access_token: string}> {
        const payload = {
            username: user.username,
            sub: '',
        }
        return {
            access_token: this.jwtService.sign(payload),
          };
    }

    async signup(username: string, password: string): Promise<{access_token: string}> {
        const user = await this.usersService.create(username, password) 
        console.log("user", user);
        const {password: _, ...sub} = user ; // remove password out of result
        const payload = {
            username: user.username,
            sub: sub
        }
        
        
        return {
            access_token: this.jwtService.sign(payload)
        }
    }


}

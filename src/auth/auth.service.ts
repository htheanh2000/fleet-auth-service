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

    async validateFacebookLogin(profile: any): Promise<string> {
        try {
          // Extract necessary information from profile
          const { id } = profile;
          console.log({profile});
          let user = await this.usersService.findOrCreateByProvider(id, 'facebook');
    
        if (!user) { // Create new user
            user = await this.usersService.findOrCreateByProvider(
                id,
                'facebook',
                profile
            );
        }
    
          // Generate JWT token
          const payload = {
            id: user.id,
            email: user.email,
            firstName: user.firstname,
            lastName: user.lastname,
          };
          const jwt = this.jwtService.sign(payload);
          return jwt;
        } catch (error) {
          throw new Error(error.message);
        }
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

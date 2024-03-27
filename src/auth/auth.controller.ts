import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { stringify } from 'querystring';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {

    constructor(
        private authService : AuthService
    ) { }

    @UseGuards(LocalAuthGuard)
    @Post('/login') 
    async login(@Request() req): Promise<{ access_token: string; }> {
        return this.authService.login(req.user);
    } 

    @UseGuards(JwtAuthGuard)
    @Get('/profile')
    getProfile(@Request() req) {
        return req.user;
    }

    @Post('/sign-up') 
    async signup(username: string, password:string): Promise<{ access_token: string; }> {
        return this.authService.signup(username, password);
    } 
}

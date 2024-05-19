import { Controller, Get, HttpStatus, Post, Req, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { stringify } from 'querystring';
import { JwtAuthGuard } from 'src/common/guard/jwt-auth.guard';
import { LocalAuthGuard } from 'src/common/guard/local-auth.guard';
import { AuthService } from './auth.service';

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

    @Get("/facebook")
    @UseGuards(AuthGuard("facebook"))
    async facebookLogin(): Promise<any> {
        return HttpStatus.OK;
    }

    @Get("/facebook/callback")
    @UseGuards(AuthGuard("facebook"))
    async facebookLoginRedirect(@Req() req): Promise<any> {
        console.log("hello", req.user);
        return {
            statusCode: HttpStatus.OK,
            data: req.user,
        };
  }
}

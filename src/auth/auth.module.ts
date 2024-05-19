import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from '../common/strategy/local.strategy';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from '../common/strategy/jwt.strategy';
import { FacebookStrategy } from 'src/common/strategy/facebook.strategy';

@Module({
  imports: [UsersModule, PassportModule, JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '60s' },
  }),
],
  providers: [AuthService, LocalStrategy, JwtStrategy, FacebookStrategy],
  controllers: [AuthController],
})
export class AuthModule {}

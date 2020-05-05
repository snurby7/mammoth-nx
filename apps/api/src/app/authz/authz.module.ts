import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthzController } from './authz.controller';
import { AuthzService } from './authz.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  providers: [JwtStrategy, AuthzService],
  controllers: [AuthzController],
})
export class AuthzModule {}

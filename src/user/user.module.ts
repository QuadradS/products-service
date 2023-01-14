import {Module} from '@nestjs/common';
import {UserController} from './user.controller';
import {TypegooseModule} from 'nestjs-typegoose';
import {UserModel} from './user.model';
import {UserService} from './user.service';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {JwtModule} from '@nestjs/jwt';
import getJwtConfig from '../configs/jwtConfig';
import {PassportModule} from '@nestjs/passport';
import JwtStrategy from './strategies/jwt.strategy';


@Module({
	controllers: [UserController],
	imports: [
		TypegooseModule.forFeature([
			{
				typegooseClass: UserModel,
				schemaOptions: {
					collection: 'Auth'
				}
			},

		]),
		ConfigModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getJwtConfig
		}),
		PassportModule
	],
	providers: [UserService, JwtStrategy]
})
export class UserModule {
}

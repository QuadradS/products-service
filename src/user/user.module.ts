import {Module} from '@nestjs/common';
import {UserController} from './user.controller';
import {TypegooseModule} from 'nestjs-typegoose';
import {UserModel} from './user.model';
import {UserService} from './user.service';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {JwtModule} from '@nestjs/jwt';
import getJwtConfig from '../configs/jwtConfig';


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
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getJwtConfig
		})
	],
	providers: [UserService]
})
export class UserModule {
}

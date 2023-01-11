import {Injectable, UnauthorizedException} from '@nestjs/common';
import {InjectModel} from 'nestjs-typegoose';
import {UserModel} from './user.model';
import {DocumentType, ModelType} from '@typegoose/typegoose/lib/types';
import {UserDto} from './dto/user.dto';
import {compare, genSaltSync, hashSync} from 'bcrypt';
import {JwtService} from '@nestjs/jwt';

@Injectable()
export class UserService {
	constructor(
		@InjectModel(UserModel) private readonly userModel: ModelType<UserModel>,
		private readonly jwtService: JwtService
	) {
	}

	createUser(userDto: UserDto): Promise<DocumentType<UserModel>> {
		const salt = genSaltSync(10);
		const passwordHash = hashSync(userDto.password, salt);

		const user = new this.userModel({
			email: userDto.login,
			passwordHash: passwordHash
		});

		return user.save();
	}

	findUser(email: string): Promise<DocumentType<UserModel> | null> {
		return this.userModel.findOne({email}).exec();
	}

	async validateUser(email: string, password: string): Promise<Pick<UserModel, 'email'>> {
		const user = await this.findUser(email);

		if (!user) {
			throw new UnauthorizedException('User not found');
		}

		const isCorrectPassword = await compare(password, user.passwordHash);

		if (!isCorrectPassword) {
			throw new UnauthorizedException('Wrong password');
		}

		return {email};
	}

	async loginUser(email: string){
		const payload = { email };

		return {
			access_token: await this.jwtService.signAsync(payload)
		};
	}

}

import {
	BadRequestException,
	Body,
	Controller, Get,
	HttpCode,
	HttpStatus, Param,
	Post, UseGuards,
	UsePipes,
	ValidationPipe
} from '@nestjs/common';
import {UserDto} from './dto/user.dto';
import {UserService} from './user.service';
import JwtAuthGuard from './guards/jwt.guard';
import {UserEmail} from '../decorators/user-email.decorator';

@Controller('user')
export class UserController {

	constructor(private readonly userService: UserService) {
	}


	@UsePipes(new ValidationPipe())
	@Post('register')
	async register(@Body() dto: UserDto) {
		const existUser = await this.userService.findUser(dto.login);

		if (!!existUser) {
			throw new BadRequestException('Already exist');
		}

		return this.userService.createUser(dto);
	}

	@UseGuards(JwtAuthGuard)
	@Get(':email')
	async getUser(@Param('email') email: string, @UserEmail() TEST: string) {
		const existUser = await this.userService.findUser(email);

		if (!existUser) {
			throw new BadRequestException(`Not Found user with email: ${email}`);
		}

		return existUser;
	}

	@HttpCode(200)
	@Post('login')
	@UsePipes(new ValidationPipe())
	async login(@Body() {login, password}: UserDto) {
		const {email} = await this.userService.validateUser(login, password);
		return this.userService.loginUser(email);
	}
}

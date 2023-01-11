import {ConfigService} from '@nestjs/config';
import {JwtModuleOptions} from '@nestjs/jwt';

const getJwtConfig = async (configService: ConfigService): Promise<JwtModuleOptions> => {
	return {
		secret: configService.get('JWT_SECRET')
	};
};

export default getJwtConfig;
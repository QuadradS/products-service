import { ConfigService } from '@nestjs/config';
import { TypegooseModuleOptions } from 'nestjs-typegoose';

const getMongoOptions = () => ({})
const getMongoConnectURI = (configService: ConfigService) =>
	'mongodb://' +
	configService.get('MONGO_LOGIN') + ':' +
	configService.get('MONGO_PASSWORD') + '@' +
	configService.get('MONGO_HOST') + ':' +
	configService.get('MONGO_PORT') + '/' +
	configService.get('MONGO_AUTH_DB');

export const getMongoConfig = async (configService: ConfigService): Promise<TypegooseModuleOptions> => {
	return {
		uri: getMongoConnectURI(configService),
		...getMongoOptions()
	}
}

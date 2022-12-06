import { Module } from '@nestjs/common';
import { TopPageController } from './top-page.controller';
import { TypegooseModule } from 'nestjs-typegoose';

@Module({
	controllers: [TopPageController],
	imports: [
		TypegooseModule.forFeature([
			{
				schemaOptions: {
					collection: 'Page'
				},
				typegooseClass: TopPageModule
			}
		])
	]
})
export class TopPageModule {
}

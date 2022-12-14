import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { TopPageModel } from './top-page.model';
import { FindTopPageDto } from './dto/find-top-page-dto';

@Controller('top-page')
export class TopPageController {
	@Post('create')
	async create(@Body() dto: Omit<TopPageModel, '_id'>){

	}

	@Get(':id')
	async get(@Param() id: string){

	}

	@Delete(':id')
	async delete(@Param() id: string){

	}

	@Patch('patch')
	async patch(@Body() dto: FindTopPageDto){

	}
}

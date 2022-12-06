import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { ProductModel } from './product.model';
import { FindDto } from './dto/find-dto';

@Controller('product')
export class ProductController {

	@Post('create')
	async create(@Body() dto: Omit<ProductModel, '_id'>) {

	}

	@Get(':id')
	async get(@Param() id: string) {

	}

	@Delete(':id')
	async delete(@Param() id: string) {

	}

	@Patch(':id')
	async patch(@Param() id: string, @Body() dto: ProductModel) {

	}

	@Post()
	@HttpCode(200)
	async find(@Body() dto: FindDto){

	}
}

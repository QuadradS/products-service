import {Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Patch, Post} from '@nestjs/common';
import {ProductModel} from './product.model';
import {FindDto} from './dto/find-dto';
import {ProductService} from './product.service';

@Controller('product')
export class ProductController {
	constructor(private readonly productService: ProductService) {
	}

	@Post('create')
	async create(@Body() dto: Omit<ProductModel, '_id'>): Promise<string> {
		const {_id} = await this.productService.create(dto);
		return _id.toString();
	}

	@Get(':id')
	async get(@Param('id') id: string) {
		const res = await this.productService.findById(id);
		if (!res) {
			throw new HttpException(`Not found by id ${id}`, HttpStatus.NOT_FOUND);
		}
		return res;
	}

	@Get('getAll')
	async getAll() {
		return this.productService.getAll();
	}

	@Delete(':id')
	async delete(@Param('id') id: string) {
		return this.productService.deleteOne(id);
	}

	@Patch(':id')
	async patch(@Param() id: string, @Body() dto: ProductModel) {

	}

	@Post()
	@HttpCode(200)
	async find(@Body() dto: FindDto) {

	}
}

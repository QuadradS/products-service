import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpException,
	HttpStatus,
	Param,
	Patch,
	Post,
	UseGuards, UsePipes, ValidationPipe
} from '@nestjs/common';
import {ProductModel} from './product.model';
import {FindDto, FindProductsByCategoriesDto} from './dto/find-dto';
import {ProductService} from './product.service';
import JwtAuthGuard from '../user/guards/jwt.guard';
import {IdValidationPipe} from '../pipes/id-validation.pipe';

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
	async get(@Param('id', IdValidationPipe) id: string) {
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
	@UseGuards(JwtAuthGuard)
	async delete(@Param('id', IdValidationPipe) id: string) {
		return this.productService.deleteOne(id);
	}

	@Patch(':id')
	async patch(@Param('id', IdValidationPipe) id: string, @Body() dto: ProductModel) {

	}

	@Post('by-categories')
	@HttpCode(200)
	@UsePipes(new ValidationPipe())
	async findProductsAndByCategories(@Body() dto: FindProductsByCategoriesDto) {
		return this.productService.findProductsAndByCategories(dto);
	}
}

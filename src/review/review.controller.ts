import {
	Body,
	Controller,
	Delete,
	Get,
	HttpException,
	HttpStatus,
	Param,
	Post,
	Patch,
	UsePipes,
	ValidationPipe
} from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewService } from './review.service';

@Controller('review')
export class ReviewController {

	constructor(private readonly reviewService: ReviewService) {
	}

	@Get(':id')
	async getById(@Param('id') id: string) {
		const document = await this.reviewService.getById(id);
		if (!document) {
			throw new HttpException(`Not fount ${id}`, HttpStatus.NOT_FOUND);
		}

		return document;
	}

	@UsePipes(new ValidationPipe())
	@Post('create')
	async create(@Body() dto: CreateReviewDto) {
		return this.reviewService.create(dto);
	}

	@Delete(':id')
	async delete(@Param('id') id: string) {
		const deletedDoc = await this.reviewService.delete(id);
		if (!deletedDoc) {
			throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
		}

		return deletedDoc;
	}

	@Get('getByProduct/:productId')
	async getByProduct(@Param('productId') productId: string) {
		return this.reviewService.findByProductId(productId);
	}

	@Delete('deleteByProductId/:productId')
	async deleteByProductId(@Param('productId') productId: string) {
		return this.reviewService.deleteByProductId(productId);
	}

	@Patch('updateDescription/:id')
	async updateDescription(
		@Param('id') id: string,
		@Body('description') description: string
	) {
		const doc = await this.reviewService.updateDescriptionById(id, description);

		if (!doc) {
			throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
		}

		return doc;
	}
}

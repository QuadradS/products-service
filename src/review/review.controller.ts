import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ReviewModel } from './review.model';

@Controller('review')
export class ReviewController {

	@Post()
	async create(@Body() dto: Omit<ReviewModel, '_id'>){

	}

	@Delete()
	async delete(@Param() id: string){

	}

	@Get('getByProduct/:productId')
	async getByProduct(@Param() productId: string){

	}
}

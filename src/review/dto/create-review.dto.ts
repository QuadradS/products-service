import {IsString, IsNumber, Max, Min, IsOptional} from 'class-validator';
export class CreateReviewDto {
	@IsString()
	name: string;
	@IsString()
	title: string;
	@IsString()
	description: string;

	@Max(5)
	@Min(1)
	@IsNumber()
	@IsOptional()
	rating?: number;
	@IsString()
	productId: string;
}

import {IsArray, IsNumber, IsString} from 'class-validator';

export class FindDto {
	category: string;
	limit: number;
}

export class FindProductsByCategoriesDto {
	@IsNumber()
	limit: number;

	@IsArray()
	categories: string[];
}

import {Injectable} from '@nestjs/common';
import {InjectModel} from 'nestjs-typegoose';
import {ProductModel} from './product.model';
import {DocumentType, ModelType} from '@typegoose/typegoose/lib/types';
import {DeleteResult, ObjectId} from 'mongodb';
import {Types} from 'mongoose';
import {FindProductsByCategoriesDto} from './dto/find-dto';
import {ReviewModel} from '../review/review.model';

@Injectable()
export class ProductService {
	constructor(@InjectModel(ProductModel) private readonly productModel: ModelType<ProductModel>) {
	}

	create(dto: Omit<ProductModel, '_id'>): Promise<DocumentType<ProductModel>> {
		return this.productModel.create(dto);
	}

	findById(id: string): Promise<DocumentType<ProductModel> | null> {
		return this.productModel.findById(new Types.ObjectId(id)).exec();
	}

	deleteOne(id: string): Promise<DeleteResult> {
		return this.deleteOne(id);
	}

	getAll() {
		return this.productModel.find({}).exec();
	}

	findProductsAndByCategories(dto: FindProductsByCategoriesDto): Promise<ProductModel[]> {
		return this.productModel.aggregate([
			{
				$match: {
					categories: dto.categories
				},

			},
			{
				$limit: dto.limit,
			},
			{
				$lookup: {
					from: 'Review',
					localField: '_id',
					foreignField: 'productId',
					as: 'reviews'
				}
			},
			{
				$addFields: {
					reviewsCount: {
						$size: '$reviews',
					},
					reviewAvg: {
						$avg: '$reviews.rating'
					}
				}
			}
		]).exec() as Promise<(ProductModel & {
			reviews: ReviewModel[],
			reviewsCount: number,
			reviewAvg: null | number
		})[]>;
	}
}

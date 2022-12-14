import { Injectable } from '@nestjs/common';
import { ReviewModel } from './review.model';
import { DocumentType, ModelType } from '@typegoose/typegoose/lib/types';
import { CreateReviewDto } from './dto/create-review.dto';
import { Types } from 'mongoose';
import { DeleteResult } from 'mongodb';
import { InjectModel } from 'nestjs-typegoose';

@Injectable()
export class ReviewService {
	constructor(@InjectModel(ReviewModel) private readonly reviewModel: ModelType<ReviewModel>) {
	}

	getById(id: string): Promise<DocumentType<ReviewModel> | null> {
		return this.reviewModel.findById(id).exec();
	}

	create(dto: CreateReviewDto): Promise<DocumentType<ReviewModel>> {
		return this.reviewModel.create(dto);
	}

	delete(id: string): Promise<DocumentType<ReviewModel> | null> {
		return this.reviewModel.findByIdAndDelete(id).exec();
	}

	findByProductId(productId: string): Promise<DocumentType<ReviewModel>[] | null> {
		return this.reviewModel.find({ productId: new Types.ObjectId(productId) }).exec();
	}

	deleteByProductId(productId: string): Promise<DeleteResult> {
		return this.reviewModel.deleteMany({ productId: new Types.ObjectId(productId) }).exec();
	}

	updateDescriptionById(id: string, description: string): Promise<DocumentType<ReviewModel> | null> {
		return this.reviewModel.findByIdAndUpdate(id, { description }).exec();
	}
}

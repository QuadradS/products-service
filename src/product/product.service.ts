import {Injectable} from '@nestjs/common';
import {InjectModel} from 'nestjs-typegoose';
import {ProductModel} from './product.model';
import {DocumentType, ModelType} from '@typegoose/typegoose/lib/types';
import {DeleteResult, ObjectId} from 'mongodb';
import {Types} from 'mongoose';

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
}

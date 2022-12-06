import { Prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export interface ProductModel extends Base {
}

export class ProductModel extends TimeStamps {
	@Prop()
	image: string;

	@Prop()
	title: string;

	@Prop()
	price: number;

	@Prop()
	oldPrice: number;

	@Prop()
	credit: number;

	@Prop()
	calculatedRating: number;

	@Prop()
	description: string;

	@Prop()
	advantages: string;

	@Prop()
	disAdvantages: string;

	@Prop()
	categories: string[];

	@Prop()
	tags: string[];

	@Prop({ type: () => [ProductCharacteristicModel], _id: false })
	characteristics: ProductCharacteristicModel[];
}

export class ProductCharacteristicModel {
		@Prop()
		name: string;

		@Prop()
		value: string;
}

import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { Prop } from '@typegoose/typegoose';
export interface ReviewModel extends Base {  }
export class ReviewModel extends TimeStamps {
	@Prop()
	name: string;

	@Prop()
	title: string;

	@Prop()
	description: string;

	@Prop()
	rating: string;
}

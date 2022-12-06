import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { Prop } from '@typegoose/typegoose';

export enum TopLevelCategory {
	Courses,
	Services,
	Books,
	Products,
}

export class Advantage {
	@Prop()
	title: string;

	@Prop()
	description: string;
}

export class HHData {
	@Prop()
	count: number;

	@Prop()
	juniorSalary: string;

	@Prop()
	middleSalary: string;

	@Prop()
	seniorSalary: string;
}

export interface TopPageModel extends Base {
}

export class TopPageModel extends TimeStamps {
	@Prop({ enum: TopLevelCategory })
	firstLevelCategory: TopLevelCategory;
	@Prop()
	secondLevelCategory: string;
	@Prop()
	title: string;
	@Prop()
	category: string;

	@Prop({ type: () => [HHData] })
	hh?: HHData;

	@Prop({ type: () => [Advantage] })
	advantages: Advantage[];

	@Prop()
	seoText: string;

	@Prop({ type: () => [String] })
	tags: string[];

	@Prop()
	tagsTitle: string;
}

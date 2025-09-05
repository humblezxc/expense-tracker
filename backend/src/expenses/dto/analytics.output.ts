import { ObjectType, Field, Float, ID } from '@nestjs/graphql';

@ObjectType()
export class AnalyticsCategory {
    @Field(() => ID) id: string;

    @Field()
    name: string;
}

@ObjectType()
export class CategoryBreakdown {
    @Field(() => AnalyticsCategory, { nullable: true })
    category?: AnalyticsCategory | null;

    @Field(() => Float)
    total: number;
}

@ObjectType()
export class ExpensesAnalytics {
    @Field(() => Float)
    total: number;

    @Field(() => [CategoryBreakdown])
    breakdown: CategoryBreakdown[];
}

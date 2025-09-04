import { ObjectType, Field, Float } from '@nestjs/graphql';

@ObjectType()
export class CategoryBreakdown {
    @Field() category: string;
    @Field(() => Float) total: number;
}

@ObjectType()
export class ExpensesAnalytics {
    @Field(() => Float) total: number;

    @Field(() => [CategoryBreakdown])
    breakdown: CategoryBreakdown[];
}

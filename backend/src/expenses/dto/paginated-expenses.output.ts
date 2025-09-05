import { ObjectType, Field, Int } from '@nestjs/graphql';
import { ExpenseType } from '../expenses.resolver';

@ObjectType()
export class PaginatedExpenses {
    @Field(() => [ExpenseType])
    items: ExpenseType[];

    @Field(() => Int)
    totalCount: number;
}

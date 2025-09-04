import { Resolver, Query, Mutation, Args, ObjectType, Field, ID } from '@nestjs/graphql';
import { ExpensesService } from './expenses.service';

@ObjectType()
class ExpenseType {
    @Field(() => ID) id: string;
    @Field() title: string;
    @Field() amount: number;
    @Field() date: Date;
    @Field({ nullable: true }) notes?: string;
    @Field(() => String) category: string;
}

@Resolver(() => ExpenseType)
export class ExpensesResolver {
    constructor(private readonly expensesService: ExpensesService) {}

    @Query(() => [ExpenseType])
    expenses() {
        return this.expensesService.findAll();
    }

    @Mutation(() => ExpenseType)
    createExpense(
        @Args('title') title: string,
        @Args('amount') amount: number,
        @Args('category') category: string,
        @Args('notes', { nullable: true }) notes?: string,
    ) {
        return this.expensesService.create({ title, amount, category, notes });
    }

    @Mutation(() => ExpenseType, { nullable: true })
    removeExpense(@Args('id') id: string) {
        return this.expensesService.remove(id);
    }
}

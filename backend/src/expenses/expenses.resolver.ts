import { Resolver, Query, Mutation, Args, ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { ExpensesService } from './expenses.service';
import { UpdateExpenseInput } from './dto/update-expense.input';
import { PaginatedExpenses } from './dto/paginated-expenses.output';

@ObjectType()
export class ExpenseType {
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
    allExpenses() {
        return this.expensesService.findAll();
    }

    @Query(() => PaginatedExpenses)
    expenses(
        @Args('skip', { type: () => Int, defaultValue: 0 }) skip: number,
        @Args('take', { type: () => Int, defaultValue: 10 }) take: number,
        @Args('categoryId', { type: () => String, nullable: true }) categoryId?: string,
    ) {
        return this.expensesService.findPaginated(skip, take, categoryId);
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
    updateExpense(@Args('data') data: UpdateExpenseInput) {
        return this.expensesService.update(data);
    }

    @Mutation(() => ExpenseType, { nullable: true })
    removeExpense(@Args('id') id: string) {
        return this.expensesService.remove(id);
    }
}

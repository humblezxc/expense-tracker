import {ExpensesResolver} from "./expenses.resolver";
import {Module} from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import {Expense, ExpenseSchema} from "./schemas/expense.schema";
import {ExpensesService} from "./expenses.service";

@Module({
    imports: [MongooseModule.forFeature([{ name: Expense.name, schema: ExpenseSchema }])],
    providers: [ExpensesService, ExpensesResolver],
})
export class ExpensesModule {}

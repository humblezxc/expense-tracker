import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MongooseModule } from '@nestjs/mongoose';
import { ExpensesModule } from './expenses/expenses.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
    imports: [
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: true,
        }),
        MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://localhost:27017/expenses'),
        CategoriesModule,
        ExpensesModule,
    ],
})
export class AppModule {}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Expense } from './schemas/expense.schema';

@Injectable()
export class ExpensesService {
    constructor(@InjectModel(Expense.name) private readonly expenseModel: Model<Expense>) {}

    async create(data: { title: string; amount: number; category: string; notes?: string }) {
        const expense = new this.expenseModel({
            ...data,
            category: new Types.ObjectId(data.category),
        });
        return expense.save();
    }

    findAll() {
        return this.expenseModel.find().populate('category').exec();
    }

    findOne(id: string) {
        return this.expenseModel.findById(id).populate('category').exec();
    }

    async remove(id: string) {
        return this.expenseModel.findByIdAndDelete(id).exec();
    }
}

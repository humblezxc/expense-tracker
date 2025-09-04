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

    async update(data: { id: string; title?: string; amount?: number; category?: string; notes?: string }) {
        const updateData: any = { ...data };
        if (data.category) {
            updateData.category = new Types.ObjectId(data.category);
        }
        delete updateData.id;

        return this.expenseModel
            .findByIdAndUpdate(data.id, updateData, { new: true })
            .populate('category')
            .exec();
    }

    async findPaginated(skip: number, take: number, categoryId?: string) {
        const filter: any = {};
        if (categoryId) {
            filter.category = new Types.ObjectId(categoryId);
        }

        const [items, totalCount] = await Promise.all([
            this.expenseModel.find(filter)
                .populate('category')
                .sort({ date: -1 })
                .skip(skip)
                .limit(take)
                .exec(),
            this.expenseModel.countDocuments(filter),
        ]);

        return { items, totalCount };
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

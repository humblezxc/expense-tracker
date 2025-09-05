import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Expense } from './schemas/expense.schema';

@Injectable()
export class ExpensesService {
    constructor(@InjectModel(Expense.name) private readonly expenseModel: Model<Expense>) {}

    async create(data: { title: string; amount: number; category: string; notes?: string }) {
        const expense = new this.expenseModel({
            title: data.title,
            amount: data.amount,
            category: new Types.ObjectId(data.category),
            notes: data.notes,
        });
        await expense.save();
        await expense.populate('category');
        return expense.toObject();
    }

    async update(data: { id: string; title?: string; amount?: number; category?: string; notes?: string }) {
        const updateData: any = { ...data };
        delete updateData.id;
        if (data.category) updateData.category = new Types.ObjectId(data.category);

        const updated = await this.expenseModel.findByIdAndUpdate(data.id, updateData, { new: true }).populate('category');
        if (!updated) return null;
        return updated.toObject();
    }

    async findPaginated(skip: number, take: number, categoryId?: string) {
        const filter: any = {};
        if (categoryId) filter.category = new Types.ObjectId(categoryId);

        const [docs, totalCount] = await Promise.all([
            this.expenseModel
                .find(filter)
                .populate('category')
                .sort({ date: -1 })
                .skip(skip)
                .limit(take)
                .lean(),
            this.expenseModel.countDocuments(filter),
        ]);

        const items = (docs || []).map((d: any) => {
            const id = d._id ? d._id.toString() : d.id ?? null;

            let category: { id?: string; name?: string } | null = null;
            if (d.category) {
                if (typeof d.category === 'object') {
                    category = {
                        id: d.category._id ? d.category._id.toString() : d.category.id,
                        name: d.category.name,
                    };
                } else {
                    category = { id: d.category.toString() };
                }
            }
            return { ...d, id, category };
        });

        return { items, totalCount };
    }

    async getAnalytics() {
        const result = await this.expenseModel.aggregate([
            {
                $group: {
                    _id: '$category',
                    total: { $sum: '$amount' },
                },
            },
            {
                $lookup: {
                    from: 'categories',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'categoryData',
                },
            },
            {
                $unwind: { path: '$categoryData', preserveNullAndEmptyArrays: true },
            },
            {
                $project: {
                    _id: 0,
                    categoryId: '$_id',
                    categoryName: '$categoryData.name',
                    total: 1,
                },
            },
        ]);

        const total = result.reduce((sum, r) => sum + r.total, 0);

        const breakdown = result.map((r) => {
            const id = r.categoryId ? r.categoryId.toString() : null;
            return {
                category: id
                    ? {
                        id,
                        name: r.categoryName ?? 'Unknown',
                    }
                    : null,
                total: r.total,
            };
        });

        return { total, breakdown };
    }

    findAll() {
        return this.expenseModel.find().populate('category').exec();
    }

    findOne(id: string) {
        return this.expenseModel.findById(id).populate('category').exec();
    }

    async remove(id: string) {
        const removed = await this.expenseModel.findByIdAndDelete(id).populate('category');
        return removed ? removed.toObject() : null;
    }
}

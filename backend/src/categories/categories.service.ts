import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from './schemas/category.schema';

@Injectable()
export class CategoriesService implements OnModuleInit {
    constructor(@InjectModel(Category.name) private readonly categoryModel: Model<Category>) {}

    async onModuleInit() {
        if ((await this.categoryModel.countDocuments()) === 0) {
            await this.categoryModel.insertMany([
                { name: 'Food' },
                { name: 'Transport' },
                { name: 'Utilities' },
            ]);
        }
    }

    findAll() {
        return this.categoryModel.find().exec();
    }
}

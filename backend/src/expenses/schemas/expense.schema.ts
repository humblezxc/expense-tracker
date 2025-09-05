import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Expense extends Document {
    @Prop({ required: true }) title: string;
    @Prop({ required: true }) amount: number;
    @Prop({ type: Types.ObjectId, ref: 'Category', required: true })
    category: Types.ObjectId | any;
    @Prop({ default: Date.now }) date: Date;
    @Prop() notes?: string;
}

export const ExpenseSchema = SchemaFactory.createForClass(Expense);

const transformExpense = (_: unknown, ret: any) => {
    if (ret._id) {
        ret.id = ret._id?.toString();
        delete ret._id;
    }
    if (ret.category && typeof ret.category === 'object') {
        if (ret.category._id) {
            ret.category.id = ret.category._id?.toString();
            delete ret.category._id;
        }
    }
    return ret;
};

ExpenseSchema.set('toJSON', { virtuals: true, versionKey: false, transform: transformExpense });
ExpenseSchema.set('toObject', { virtuals: true, versionKey: false, transform: transformExpense });

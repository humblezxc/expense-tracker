import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Expense extends Document {
    @Prop({ required: true }) title: string;
    @Prop({ required: true }) amount: number;
    @Prop({ type: Types.ObjectId, ref: 'Category', required: true })
    category: Types.ObjectId;
    @Prop({ default: Date.now }) date: Date;
    @Prop() notes?: string;
}

export const ExpenseSchema = SchemaFactory.createForClass(Expense);

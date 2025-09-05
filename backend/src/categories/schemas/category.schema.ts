import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Category extends Document {
    @Prop({ required: true, unique: true })
    name: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);

const transform = (_: unknown, ret: any) => {
    if (ret._id) {
        ret.id = ret._id?.toString();
        delete ret._id;
    }
    return ret;
};

CategorySchema.set('toJSON', { virtuals: true, versionKey: false, transform });
CategorySchema.set('toObject', { virtuals: true, versionKey: false, transform });

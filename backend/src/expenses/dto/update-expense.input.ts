import { InputType, Field, ID, Float } from '@nestjs/graphql';
import { IsMongoId, IsOptional, IsPositive, IsString } from 'class-validator';

@InputType()
export class UpdateExpenseInput {
    @Field(() => ID)
    @IsMongoId()
    id: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    title?: string;

    @Field(() => Float, { nullable: true })
    @IsOptional()
    @IsPositive()
    amount?: number;

    @Field({ nullable: true })
    @IsOptional()
    @IsMongoId()
    category?: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    notes?: string;
}

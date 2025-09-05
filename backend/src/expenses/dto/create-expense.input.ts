import { InputType, Field, Float } from '@nestjs/graphql';
import { IsMongoId, IsNotEmpty, IsOptional, IsPositive, IsString } from 'class-validator';

@InputType()
export class CreateExpenseInput {
    @Field() @IsNotEmpty() @IsString() title: string;
    @Field(() => Float) @IsNotEmpty() @IsPositive() amount: number;
    @Field() @IsNotEmpty() @IsMongoId() category: string;
    @Field({ nullable: true }) @IsOptional() @IsString() notes?: string;
}

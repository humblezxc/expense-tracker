import { Resolver, Query, ObjectType, Field, ID } from '@nestjs/graphql';
import { CategoriesService } from './categories.service';

@ObjectType()
export class CategoryType {
    @Field(() => ID)
    id: string;

    @Field()
    name: string;
}

@Resolver(() => CategoryType)
export class CategoriesResolver {
    constructor(private readonly categoriesService: CategoriesService) {}

    @Query(() => [CategoryType])
    categories() {
        return this.categoriesService.findAll();
    }
}

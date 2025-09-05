import {GET_CATEGORIES} from "../queries/categories.ts";
import {useQuery} from "@apollo/client/react";
import type {Category} from "../../types/graphql.ts";

interface GetCategoriesData {
    categories: Category[];
}

export default function Categories() {
    const { data, loading, error } = useQuery<GetCategoriesData>(GET_CATEGORIES);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-2">Categories</h1>
            <ul className="list-disc ml-5">
                {data?.categories.map(category => (
                    <li key={category.id}>{category.name}</li>
                ))}
            </ul>
        </div>
    );
}

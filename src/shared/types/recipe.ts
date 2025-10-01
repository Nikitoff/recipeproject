export type UploadFile= {
    id: number;
    documentId: string;
    name: string;
    url: string;
}

export type Ingredient ={
    id: number;
    name: string;
    amount: number;
    unit: string;
}

type Direction ={
    id: number;
    description: string;
    image: UploadFile;
}

type Equipment ={
    id: number;
    name: string;
}

export type Category= {
    id: number;
    documentId: string;
    title: string;
    image: UploadFile;
}

export type Recipe= {
    id: number;
    documentId: string;
    name: string;
    totalTime: number;
    cookingTime: number;
    preparationTime: number;
    servings: number;
    likes: number;
    images: UploadFile[];
    ingradients: Ingredient[];
    directions: Direction[];
    equipments: Equipment[];
    calories: number;
    category: Category;
    rating: number;
    summary: string;
    vegetarian: boolean;
}

export type PaginatedResponse ={
    data: Recipe[];
    meta: {
        pagination: {
            page: number;
            pageSize: number;
            pageCount: number;
            total: number;
        };
    };
}

export type RecipeFilters ={
    name?: string;
    category?: string;
    page?: number;
    pageSize?: number;
}



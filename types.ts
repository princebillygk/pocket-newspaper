export interface INewspaper {
    bnName?: string;
    id: number;
    imageUrl: string;
    lang: string;
    name: string;
    url: string;
    category?: string[];
}

export interface ICatagory {
    id: number;
    title: string;
}
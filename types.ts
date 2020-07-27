export interface INewspaper {
    id: number;
    name: string;
    bn_name: string;
    lang: "bn" | "en";
    url: string;
    imgurl: string;
    catagories: (INewPaperCatagories & {
        pivot: {
            catagory_id: number,
            newspaper_id: number
        }
    })[];
}
export interface INewPaperCatagories {
    id: number;
    title: string;
}
export interface IPagination<T> {
    current_page: number;
    data: T[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    next_page_url: string;
    path: string;
    per_page: number;
    prev_page_url?: any;
    to: number;
    total: number;
}


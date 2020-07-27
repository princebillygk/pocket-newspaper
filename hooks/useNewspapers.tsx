import { useEffect, useState } from 'react';
import api, { IApiPagination, IApiResponse } from '../api/api';
import { INewspaper, INewPaperCatagories } from '../types';
import { AxiosError } from 'axios';

export interface IUseNewspaperState {
    newspapersWithPagination?: IApiPagination<INewspaper>;
    catagories?: INewPaperCatagories[]
    isLoading: boolean;
    isError: boolean;
    errorDetails?: AxiosError
}

export default (): [IUseNewspaperState, (term: string) => Promise<void>] => {
    const [data, setData] = useState<IUseNewspaperState>(
        { isLoading: false, isError: false }
    );

    async function searchNewspaper(term: string): Promise<void> {
        setData({
            isLoading: true,
            isError: false
        })
        try {
            const data = await api.get
                <IApiResponse<{ newspapers: IApiPagination<INewspaper>, catagories: INewPaperCatagories[] }>>
                ('/newspapers', { params: { search: term, limit: 300 } });
            setData({
                newspapersWithPagination: data.data.data.newspapers,
                catagories: data.data.data.catagories,
                isLoading: false,
                isError: false
            });
        } catch (e) {
            setData({
                isLoading: false,
                isError: true,
                errorDetails: e
            });
        }
    }

    useEffect(() => {
        searchNewspaper("");
    }, []);

    return [data, searchNewspaper];
}
import firestore from '@react-native-firebase/firestore';
import { useEffect, useState } from 'react';
import { INewspaper } from 'types';
import { convertSnapShotArrayToDataArray } from '../utility';

export interface INewspaperQueryOptions {
    term?: string,
    catagories?: string[],
    lang?: "bn" | "en"
    limit?: number
}

interface IState {
    newspapers?: INewspaper[]
    error?: string,
    isLoading: boolean
}


function useNewspapers(options: INewspaperQueryOptions = {}) {
    const [{ newspapers, error, isLoading }, setState] = useState<IState>({ newspapers:[], isLoading: false, });

    async function getNewspaper({ term, catagories, lang, limit = 20 }: INewspaperQueryOptions = {}): Promise<void> {
        setState({ isLoading: true });
        try {
            let query: any = firestore().collection('newspapers');
            if (lang) query = query.where('lang', '==', lang);
            if (catagories) query = query.where('catagories', 'array-contains-any', catagories);
            setState({ newspapers: convertSnapShotArrayToDataArray(await query.limit(limit).get()), isLoading: false });
        } catch (e) {
            console.log(e);
            setState({ error: "Couldn't connect to database", isLoading: false })
        }
    }

    useEffect(() => {
        getNewspaper(options);
    }, []);

    return { newspapers, getNewspaper, error, isLoading };
}

export default useNewspapers;


import firestore from '@react-native-firebase/firestore';
import { useEffect, useState } from 'react';
import { INewspaper } from 'types';

export interface INewspaperQueryOptions {
    term?: string,
    catagories?: string[],
    lang?: "bn" | "en"
}

interface IState {
    newspapers?: INewspaper[]
    error?: string,
    isLoading: boolean
}

function convertSnapShotArrayToDataArray(...snapshots: any) {
    let data: any[] = [];
    for (const snapshotIndex in snapshots) {
        snapshots[snapshotIndex].forEach((docSnapShot: any) => data.push(docSnapShot.data()));
    }
    return data;
}

function useNewspapers(options: INewspaperQueryOptions = {}) {
    const [{ newspapers, error, isLoading }, setState] = useState<IState>({ isLoading: false, });

    async function getNewspaper({ term, catagories, lang }: INewspaperQueryOptions = {}): Promise<void> {
        setState({ isLoading: true });
        try {
            let query: any = firestore().collection('newspapers');
            if (lang) query = query.where('lang', '==', lang);
            if (catagories) query = query.where('catagories', 'array-contains-any', catagories);
            if (term) {
                const query1 = query.orderBy('name').startAt(term).endAt(term + '\uf8ff');
                const query2 = query.orderBy('bn_name').startAt(term).endAt(term + '\uf8ff');
                setState({ newspapers: convertSnapShotArrayToDataArray(await query1.get(), await query2.get()), isLoading: false })
            } else {
                setState({ newspapers: convertSnapShotArrayToDataArray(await query.get()), isLoading: false });
            }
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


import firestore from '@react-native-firebase/firestore';
import { useEffect, useState } from 'react';
import { ICatagory } from 'types';
import { convertSnapShotArrayToDataArray } from '../utility';


interface IState {
    catagories?: ICatagory[]
    error?: string,
    isLoading: boolean
}


function useCatagories() {
    const [{ catagories, error, isLoading }, setState] = useState<IState>({catagories:[], isLoading: false, });

    async function getCatagories(): Promise<void> {
        setState({ isLoading: true });
        try {
            const snapshot = await firestore().collection('catagories').get();
            setState({ catagories: convertSnapShotArrayToDataArray(snapshot), isLoading: false });
        } catch (e) {
            console.log(e);
            setState({ error: "Couldn't connect to database", isLoading: false })
        }
    }

    useEffect(() => {
        getCatagories();
    }, []);

    return { catagories, getCatagories, error, isLoading };
}

export default useCatagories;


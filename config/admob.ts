import admob, { MaxAdContentRating } from '@react-native-firebase/admob';

admob()
    .setRequestConfiguration({
        maxAdContentRating: MaxAdContentRating.G,
        tagForChildDirectedTreatment: false,
        tagForUnderAgeOfConsent: false,
    })
    .then(() => {
        // Request config successfully set!
    });
import { parseQuery, getQueryString } from './api';
import useLoad from './useLoad';

const useRef = () => {
    const queryString = getQueryString();
    const ref = useLoad(async () => {
        const query = parseQuery(queryString);
        let localRef: any = {};
        try {
            localRef = JSON.parse(window?.localStorage?.getItem?.('studsearch-ref') ?? 'null');
        } catch (e) {};

        const ref = query?.r ?? query?.ref ?? localRef ?? null;
        if (ref)
          window?.localStorage?.setItem?.('studsearch-ref', JSON.stringify(ref));

        return ref;
    }, [ queryString ]);
    
    // @ts-ignore: Google Analytics
    window?.ga?.('set', 'ref', ref);
    return ref;
}
export default useRef;

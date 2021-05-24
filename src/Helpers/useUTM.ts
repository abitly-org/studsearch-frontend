import { parseQuery, getQueryString } from './api';
import useLoad from './useLoad';

const utm_params = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
const useUTM = () => {
    const queryString = getQueryString();
    return useLoad(async () => {
        const query = parseQuery(queryString);
        let utmCached: any = {};
        try {
            utmCached = JSON.parse(window?.localStorage?.getItem?.('studsearch-utm') ?? '');
        } catch (e) {};

        const utm : Record<string, string> = {};
        for (const param of utm_params) {
            const value = query[param] ?? utmCached[param];
            if (value)
                utm[param] = value;
        }
        window?.localStorage?.setItem?.('studsearch-utm', JSON.stringify(utm));

        return utm;
    }, [ queryString ]);
}
export default useUTM;

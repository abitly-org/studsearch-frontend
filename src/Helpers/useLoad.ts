import * as React from 'react';

import deepCompareEquals from 'deep-equal';

export function useDeepCompareMemoize(value: any) {
    const ref = React.useRef();
    if (!deepCompareEquals(value, ref.current))
        ref.current = value;
    return ref.current;
} 

const useLoad = <T>(
    loader: () => Promise<T>,
    deps: React.DependencyList = [],
    initialValue: T | null = null
) : T | null => {
    return useLoadState(loader, deps, initialValue)[0];
}
export default useLoad;
export const useLoadState = <T>(
    loader: () => Promise<T>,
    deps: React.DependencyList = [],
    initialValue: T | null = null
) : [T | null, React.Dispatch<React.SetStateAction<T | null>>] => {
    const [value, setValue] = React.useState(initialValue);
    React.useEffect(() => {
        if (value !== initialValue)
            setValue(initialValue);

        let unmounted = false;
        const promise = loader();
        if (promise && promise['then'])
            promise.then(receivedValue => {
                if (!unmounted)
                    setValue(receivedValue);
            });
        else setValue(promise as any as T);
        return () => {
            // if (promise?.isPending)
            //     promise.cancel();
            unmounted = true;
        };
    }, useDeepCompareMemoize(deps));
    return [value, setValue];
}

export const useRefLoad = <T>(
    loader: () => Promise<T>,
    deps: React.DependencyList = [],
    initialValue: T | null = null
) => {
    const ref = React.useRef(initialValue);
    ref.current = useLoad(loader, deps, initialValue);
    return ref;
};
export const useRefLoadState = <T>(
    loader: () => Promise<T>,
    deps: React.DependencyList = [],
    initialValue: T | null = null
) : [React.RefObject<T | null>, React.Dispatch<React.SetStateAction<T | null>>] => {
    const ref = React.useRef(initialValue);
    const [value, setValue] = useLoadState(loader, deps, initialValue);
    ref.current = value;
    return [ref, setValue];
};

// export const useFakeLoadState = (deps: React.DependencyList = []) => {
//     React.useState();
//     React.useEffect(() => {/* ... */}, useDeepCompareMemoize(deps));
// }


// // first element is string (entity name), strictly required
// export type CacheDependencies = [string, ...Array<any>];

// interface CachePart {
//     deps?: CacheDependencies;
//     expires?: number;
//     value: any;
// }
// const cache : CachePart[] = [];
// // @ts-ignore
// window.cache = cache;
// interface CacheProcessPart {
//     id: string;
//     deps: CacheDependencies;
//     callbacks: ((value: any) => void)[];
// }
// const processes : CacheProcessPart[] = [];

// export const findCache = (myDeps: CacheDependencies) =>
//     cache.find(({ deps, expires }) =>
//         deepCompareEquals(myDeps, deps) &&
//         expires > Date.now()
//     );
// export const findProcess = (myDeps: CacheDependencies) => 
//     processes.find(({ deps }) => deepCompareEquals(myDeps, deps));

// export const removeExpiredCache = () => {
//     for (let i = 0; i < cache.length; ++i)
//         if (cache[i].expires <= Date.now())
//             cache.splice(i--, 1);
// }

// export const removeCache = (deps: CacheDependencies) => {
//     for (let i = 0; i < cache.length; ++i) {
//         const cachePart = cache[i];
//         if (deepCompareEquals(cachePart.deps.slice(0, deps.length), deps)) {
//             cache.splice(i, 1);
//             i--;
//         }
//     }
// }

// export const useLoadStateCached = <T>(
//     loader: () => Promise<T>,
//     deps: CacheDependencies,
//     expiresAfter: number = 1000 * 60 * 5 // 5 minutes
//     // initialValue is always null, just to make things easier
//     // when expiresAfter === 0, loader is not executed, always returns null
// ) : [T | null, React.Dispatch<React.SetStateAction<T>>] => {
//     const [value, setValue] = React.useState<T>(findCache(deps)?.value || null);

//     React.useEffect(() => {
//         let forgot = false;
//         const updateValue = value => {
//             if (forgot) {
//                 // we have been forgotten, deps changed.
//                 // maybe even can't do setState()! (in case unmount)
//                 return;
//             }
//             setValue(value as T);
//         }

//         let cachePart : CachePart;

//         let promise : Promise<T>;
//         let process : CacheProcessPart;
//         if (!(cachePart = findCache(deps))) {
//             if ((process = findProcess(deps)) && expiresAfter > 0) {
//                 process.callbacks.push(updateValue);
//             } else {
//                 process = { id: ~~(9999999 * Math.random()) + '', deps, callbacks: [] };
//                 if (expiresAfter > 0) {
//                     processes.push(process);
//                     promise = loader();
//                     if (promise && promise['then'])
//                         promise.then(value => {
//                             if (expiresAfter > 0) {
//                                 cache.push({
//                                     deps,
//                                     expires: Date.now() + expiresAfter,
//                                     value
//                                 });
//                                 process.callbacks.map(callback => callback(value));
//                                 let index;
//                                 if ((index = processes.findIndex(({id}) => id === process.id)) >= 0)
//                                     processes.splice(index, 1);
//                             }
//                             updateValue(value);
//                         });
//                     else updateValue(promise as any as T);
//                 } else {
//                     updateValue(null);
//                 }
//             }
//         } else if (value !== cachePart.value) {
//             setValue(cachePart.value);
//         }
        
//         removeExpiredCache();

//         return () => {
//             forgot = true;
//             // TODO: cancel all processes when they all are unmounted
//             if (promise?.isPending && (!process || process?.callbacks?.length === 0)) {
//                 promise.cancel();
//             } else if (process?.callbacks) {
//                 process.callbacks = process.callbacks.filter(c => c !== updateValue);
//                 if (process.callbacks.length === 0) {
//                     let index;
//                     if ((index = processes.findIndex(({id}) => id === process.id)) >= 0)
//                         processes.splice(index, 1);
//                 }
//             }
//         };
//     }, useDeepCompareMemoize([deps, expiresAfter]));

//     return [value, setValue];
// };

// export const useLoadCached = <T>(
//     loader: () => Promise<T>,
//     deps: CacheDependencies,
//     expiresAfter: number = 1000 * 60 * 5
// ) : T | null => 
//     useLoadStateCached(loader, deps, expiresAfter)[0];

// useLoadStateCached.removeCache = removeCache;
// useLoadCached.removeCache = removeCache;
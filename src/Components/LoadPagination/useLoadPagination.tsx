import React, {useCallback, useEffect, useRef, useState} from 'react';
import {getStudents, getUniversities} from "../../Helpers/api";

const divStyle = {
    color: 'blue',
    height: '40px',
    textAlign: 'center',
    padding: '3px 10px',
    background: '#eee',
    marginTop: '15px'
};
const containerStyle = {
    maxWidth: '500px',
    maxHeight: '300px',
    margin: '0 auto',
    overflow: 'auto',
    border: '1px solid black'
}

const useLoadPagination = <T extends unknown>(request: (count: number, offset: number) => Promise<T[]>, deps: React.DependencyList) => {
    let count = 5;
    const [offset, setOffset] = useState(0);
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)
    const [items, setItems] = useState<T[]>([])
    const [hasMore, setHasMore] = useState(false);
    const [dispatchIndex, setDispatchIndex] = useState(0);

    useEffect(() => {
        setOffset(0);
        setDispatchIndex(0);
    }, [deps]);

    useEffect(() => {
        setLoading(true)
        setError(null);
        let unmounted = false;
        request(count, offset).then(res => {
            if (!unmounted)
                return;

            setItems(prevList => {
                return [...prevList, ...res]
            })
            
            setHasMore(res.length >= count)
            setLoading(false)
            setOffset(offset + count);
            //console.log(offset + " offset: "+ count + ": count  "+ page + ": page");
        }).catch(setError);
        return () => {
            unmounted = true;
        }
    }, [ dispatchIndex ]);

    return {
        loading,
        error,
        items,
        dispatch: () => {
            if (!loading)
                setDispatchIndex(i => i + 1);
        }
    };

    // const showItems = () => {
    //     return (
    //         <React.Fragment>
    //             <div style= {containerStyle}>
    //                 {items.map((element: any, index)  => {
    //                     const {name} = element;
    //                     if (items.length === index + 1) {
    //                         return (
    //                             <div ref={lastListElementRef} style= {divStyle}
    //                                  key={index}>
    //                                 {name}
    //                             </div>
    //                         );}
    //                     else {
    //                         
    //                         return <div   style= {divStyle} key={index}>{name}</div>
    //                     }
    //                 })}
    //                 <div>{loading && 'Loading...'}</div>
    //                 <div>{error && 'Error'}</div>
    //             </div>
    //         </React.Fragment>
    //     );
    // };
    //
    //     return (
    //     <React.Fragment>
    //         <div className='container'>
    //             {showItems}
    //         </div>
    //     </React.Fragment>
    // );
};

export default useLoadPagination;

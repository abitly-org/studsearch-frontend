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

const useLoadPagination = (data: any) => {
    let count = 5;
    const [page, setPage] = useState(0);
    const [offset, setOffset] = useState(0);
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [items, setData] = useState([])
    const [hasMore, setHasMore] = useState(false)

    useEffect(() => {
        setLoading(true)
        setError(false)
        //getStudents(count, offset)
        data.then((res: any) => {
            // @ts-ignore
            setData(prevList => {
                return [...prevList, ...res]
            })
            // @ts-ignore
            setHasMore(res.length > 0)
            setLoading(false)
            setOffset(offset + count);
            //console.log(offset + " offset: "+ count + ": count  "+ page + ": page");
        })
    }, [page])

    const observer = useRef()
    const lastListElementRef = useCallback(node => {
        if (loading) return
        if (observer.current) { // @ts-ignore
            observer.current.disconnect()
        }
        // @ts-ignore
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPage(page + 1)
            }
        })
        if (node) { // @ts-ignore
            observer.current.observe(node)
        }
    }, [loading, hasMore])

    return {loading, error, items, lastListElementRef};

    // const showItems = () => {
    //     return (// @ts-ignore
    //         <React.Fragment>
    //             <div style= {containerStyle}>
    //                 {items.map((element: any, index)  => {
    //                     const {name} = element;
    //                     if (items.length === index + 1) {
    //                         return (// @ts-ignore
    //                             <div ref={lastListElementRef} style= {divStyle}
    //                                  key={index}>
    //                                 {name}
    //                             </div>
    //                         );}
    //                     else {
    //                         // @ts-ignore
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

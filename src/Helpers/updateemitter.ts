import * as React from 'react';

export type UpdateFunction<T extends unknown[]> = (...args: T) => void;

export default class UpdateEmitter<Args extends unknown[]> {
    private uniqueId : number = 0;
    private callbacks: {[id: number]: UpdateFunction<Args>} = {};

    onUpdate(callback: UpdateFunction<Args>) : number {
        const id = this.uniqueId++;
        this.callbacks[id] = callback;
        return id;
    }
    offUpdate(callback: UpdateFunction<Args>) {
        for (const key in this.callbacks) {
            if (this.callbacks[key] === callback)
                delete this.callbacks[key];
        }
    }

    update(...args : Args) {
        for (const key in this.callbacks)
            this.callbacks[key].apply(null, args);
    }
    updateExcept(id: null | number | number[], ...args : Args) {
        for (const key in this.callbacks) {
            if (id === null || 
                (typeof id === 'number' && key !== id.toString()) ||
                (typeof id !== 'number' && !id.includes(parseInt(key)))) {

                this.callbacks[key].apply(null, args);
            }
        }
    }

    /** 
     * subscribe() is a custom hook to write less code in functional components
     * It handles a listener to force update a component on component's lifecycle
     * Also it returns an update function, that will trigger all other listeners except itself
     * 
     * But sometimes component maybe just need to listen to these updates, not fully rerendering itself
     * In these cases, you can put own callback instead
     */
    subscribe(
      parameters?: any[],
      // eslint-disable-next-line
      callback : UpdateFunction<Args> = useForceUpdate(),
      onSubscribed?: (updateThem: UpdateFunction<Args>) => void
    ) : UpdateFunction<Args> {
        // eslint-disable-next-line
        let id = React.useRef<number>();
        const updateThem = (...args: Args) => {
            if (id.current !== undefined)
                this.updateExcept(id.current, ...args);
        };
        // eslint-disable-next-line
        React.useEffect(() => {
            id.current = this.onUpdate(callback);
            if (onSubscribed)
                onSubscribed(updateThem);
            return () => {    
                this.offUpdate(callback);
            }
        }, parameters);

        return updateThem;
    }
}

function useForceUpdate(): () => void {
  const [ , dispatch ] = React.useState<{}>(Object.create(null));

  const memoizedDispatch = React.useCallback(
    (): void => {
      dispatch(Object.create(null));
    },
    [ dispatch ],
  );
  return memoizedDispatch;
}
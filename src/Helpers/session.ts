import * as React from 'react';

import { endpoint, makeQuery, __reqjson } from './api';
import useLoad from './useLoad';

export type Session = {
  status?: boolean;
  verified?: boolean;
  token?: string;
  studentUuid?: string;
}


const getSession = async (token?: string | null) : Promise<Session> => 
  fetch(`${endpoint}/v2/session/`, { headers: token ? [['Auth-Token', token]] : undefined, credentials: 'include' })
    .then(r => r?.json?.());

const useSession = () => {
  const token = window?.localStorage?.getItem?.('studsearch-token');
  const [refreshId, setRefreshId] = React.useState(0);
  const refresh = () => {
    console.log('refresh()')
    setRefreshId(id => id + 1)
  };

  const session = useLoad(async () => {
    const session = await getSession(token);
    if (session?.token) {
      window?.localStorage?.setItem?.('studsearch-token', session?.token);
    } else if (!session?.status) {
      window.localStorage.removeItem('studsearch-token');
      return await getSession();
    }
    changeRegistered?.(session?.verified ?? false);
    return session;
  }, [ refreshId ]);

  React.useEffect(() => {
    changeRegistered?.(session?.verified ?? false);
  }, [ session?.verified ])

  return {
    loading: session === null,
    ...(session ?? {}),
    token: session?.token ?? token,

    loginHref: `${endpoint}/v2/login/${makeQuery({ token: session?.token ?? token })}`,

    refreshId,
    refresh,

    logout: () => 
      fetch(`${endpoint}/v2/logout${makeQuery({ token: session?.token ?? token })}`, { credentials: 'include', method: 'POST' })
  };
}
export default useSession;

const useRegisteredSubscribers: {[id: string]: Function} = {};
const changeRegistered = (newRegistered: boolean) => {
  for (const id in (useRegisteredSubscribers ?? {}))
    useRegisteredSubscribers?.[id]?.(newRegistered);
}

export const useRegistered = (): boolean => {
  const [state, setState] = React.useState(false);

  const id = React.useMemo(() => String(Math.random()), []);
  React.useEffect(() => {
    useRegisteredSubscribers[id] = setState;
    return () => {
      delete useRegisteredSubscribers[id];
    }
  }, [ id, setState ]);

  return state;
}
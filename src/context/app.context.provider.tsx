import { useState } from 'react';
import { AppContext, CountryUseState } from './app.context';

type AppContextProviderProps = {
  children: globalThis.JSX.Element;
};

export function AppContextProvider({ children }: AppContextProviderProps) {
  const stateHook: CountryUseState = useState({
    country: '',
    region: '',
    continent: '',
  });

  return (
    <AppContext.Provider value={stateHook}>{children}</AppContext.Provider>
  );
}

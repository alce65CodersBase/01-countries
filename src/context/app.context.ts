import React, { createContext } from 'react';

type countryState = {
  country: string;
  region: string;
  continent: string;
};
export type CountryUseState = [countryState, React.Dispatch<countryState>];

export const initialCountryUseState: CountryUseState = [
  { country: '', region: '', continent: '' },
  (_value: countryState) => {},
];

export const AppContext = createContext<CountryUseState>(
  initialCountryUseState
);

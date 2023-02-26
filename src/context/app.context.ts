import React, { createContext } from 'react';

type countryState = {
  country: string;
};
export type CountryUseState = [countryState, React.Dispatch<countryState>];

const initialCountryUseState: CountryUseState = [
  { country: '' },
  (_value: countryState) => {},
];

export const AppContext = createContext<CountryUseState>(
  initialCountryUseState
);

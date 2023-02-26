import { useContext } from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AppContextProvider } from './app.context.provider';
import { AppContext } from './app.context';

function TestComponent() {
  const [countryState] = useContext(AppContext);
  return <p>{countryState.country}</p>;
}

describe('Given AppContextProvider', () => {
  describe('When a component is wrapper on it', () => {
    test('Then the component should access to the context', () => {
      render(
        <AppContextProvider>
          <TestComponent></TestComponent>
        </AppContextProvider>
      );
    });
  });
});

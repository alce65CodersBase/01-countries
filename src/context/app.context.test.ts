import { initialCountryUseState } from './app.context';

test('InitialState function could be used', () => {
  initialCountryUseState[1]({ country: 'any' });
});

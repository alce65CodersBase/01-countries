import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Localization } from './localization';
import { FullCountry } from '../../../models/country';
describe('Given Localization component rendered ', () => {
  describe('When it receive', () => {
    const country = {
      region: '',
      subregion: '',
      borders: [''],
    } as unknown as FullCountry;
    render(
      <Localization {...country}>
        <></>
      </Localization>
    );
    const element = screen.getByRole('heading');
    test('Then it should render the component', () => {
      expect(element).toBeInTheDocument();
    });
  });
});

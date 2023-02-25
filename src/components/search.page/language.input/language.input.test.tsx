import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { getLanguages } from '../../../service/repo/countries.api.repo';
import { LanguageInput } from './language.input';

jest.mock('../../../service/repo/countries.api.repo');

describe('Given the component LanguageInput', () => {
  let elements: HTMLElement[];
  let languageMock = '';
  beforeEach(async () => {
    const handleLanguageMock = jest.fn().mockImplementation((value) => {
      languageMock = value;
    });
    (getLanguages as jest.Mock).mockReturnValue([
      'same language',
      'other language',
    ]);

    await act(async () => {
      render(
        <LanguageInput
          language={languageMock}
          handleLanguage={handleLanguageMock}
        ></LanguageInput>
      );
    });

    elements = [screen.getByRole('combobox')];
  });

  describe('When it is rendered', () => {
    test('Then input/list should be in the document', () => {
      expect(elements[0]).toBeInTheDocument();
      expect(getLanguages).toHaveBeenCalled();
    });
    test('Then user could start to type a input', async () => {
      await userEvent.type(elements[0], 'a');
      waitFor(async () => {
        expect(await screen.findByRole('combobox', { name: 'a' })).toHaveValue(
          'a'
        );
      });
    });

    test('Then user could type a input longer than 1', async () => {
      await userEvent.type(elements[0], 'lan');
      waitFor(async () => {
        expect(
          await screen.findByRole('combobox', { name: 'lan' })
        ).toHaveValue('lan');
      });
    });
  });
});

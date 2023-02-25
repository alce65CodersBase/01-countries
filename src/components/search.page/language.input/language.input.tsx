import { SyntheticEvent, useState, useEffect } from 'react';
import { getLanguages } from '../../../service/repo/countries.api.repo';

type LanguageInputProps = {
  language: string;
  handleLanguage: (_value: string) => void;
};
export function LanguageInput({
  language,
  handleLanguage,
}: LanguageInputProps) {
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [allLanguages, setAllLanguages] = useState<string[]>([]);

  const handleChangeLanguage = (ev: SyntheticEvent) => {
    const { value } = ev.target as HTMLInputElement;
    handleLanguage(value); // Set language to value
    if (value.length >= 2) {
      setShowSuggestions(true);
      const validLanguages = allLanguages.filter((item) =>
        Boolean(item.toLowerCase().includes(value.toLowerCase()))
      );
      setFilteredSuggestions(validLanguages);
    } else {
      setShowSuggestions(false);
    }
  };

  useEffect(() => {
    const loadLanguages = async () => {
      setAllLanguages(await getLanguages());
    };

    loadLanguages();
  }, []);

  return (
    <>
      <label htmlFor="">Language</label>
      <input
        autoComplete="off"
        placeholder="Type a language in english"
        name="language"
        list="languages"
        value={language}
        onChange={handleChangeLanguage}
      />
      {showSuggestions && (
        <datalist id="languages">
          {filteredSuggestions.map((item) => (
            <option key={item} value={item} />
          ))}
        </datalist>
      )}
    </>
  );
}

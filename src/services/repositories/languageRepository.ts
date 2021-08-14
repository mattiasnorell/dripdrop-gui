interface ILanguageRepository {
  get(key: string): string;
}

class LanguageRepository implements ILanguageRepository {
  private translations: { [key: string]: string } = {
    cancel: 'Avbryt',
    loading: 'Laddar',
  };

  get(key: string): string {
    if (this.translations[key]) {
      return this.translations[key];
    }

    return `No translation found for "${key}"`;
  }
}

const $languageRepository = new LanguageRepository();
export { $languageRepository };

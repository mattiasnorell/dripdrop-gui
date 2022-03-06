import { injectable } from "inversify-props";

export interface ILanguageHelper {
  get(key: string): string;
}

@injectable()
export class LanguageHelper implements ILanguageHelper {

  private translations: Record<string, string> = require('./../../language/sv.json');
  /*{
    cancel: 'Avbryt',
    loading: 'Laddar',
  };*/

  get(key: string): string {
    if (this.translations[key]) {
      return this.translations[key];
    }

    return `No translation found for "${key}"`;
  }
}
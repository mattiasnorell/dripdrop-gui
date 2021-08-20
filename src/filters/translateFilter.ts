import { cid, container } from 'inversify-props';
import { ILanguageHelper } from '_services/helpers/languageHelper';

const TranslateFilter = (key: string) => {
    const languageRepository = container.get<ILanguageHelper>(cid.ILanguageHelper);
    return languageRepository.get(key);
};

const $translateFilter = TranslateFilter;
export default $translateFilter;

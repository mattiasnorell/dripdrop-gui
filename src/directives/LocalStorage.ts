import { cid, container } from 'inversify-props';
import { ILocalStorageHelper } from '_services/helpers/localStorageHelper';

type LocalStorageOptions = {
    storageKey: string;
    default?: any;
};
/**
 * Decorator to set property values based on values stored in local storage
 *
 * @param {LocalStorageOptions} Options
 * @return {*}
 */
export function LocalStorage(options: LocalStorageOptions) {
    const _localStorage = container.get<ILocalStorageHelper>(cid.ILocalStorageHelper);
    const storageValue = _localStorage.read(options.storageKey);
    let value: unknown = null;

    if (storageValue) {
        value = storageValue;
    } else {
        value = options.default;
    }

    return function (target: any, key: string) {
        if (typeof value === 'function') {
            target[key] = value.call(value);
        } else {
            target[key] = value;
        }
    };
}
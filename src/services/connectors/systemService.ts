import axios from 'axios';
import { inject, injectable } from 'inversify-props';
import { ILocalStorageHelper } from '_services/helpers/localStorageHelper';

export interface ISystemService {
    ping(): Promise<boolean>;
    getSystemTime(): Promise<Date>;
    setSystemTime(date: Date): Promise<Date>;
}

@injectable()
export class SystemService implements ISystemService {
    @inject()
    private _localStorageHelper: ILocalStorageHelper;

    public ping(): Promise<boolean> {
        const url = this._localStorageHelper.read<string>('apiPath') ?? 'http://dripdrop.local';
        const timeout = axios.CancelToken.source();
        setTimeout(() => {
            timeout.cancel();
        }, 3000);

        return axios
            .get(`${url}/ping/`, { cancelToken: timeout.token })
            .then((response) => {
                return true;
            })
            .catch((error) => {
                return false;
            });
    }

    public getSystemTime(): Promise<Date> {
        const url = this._localStorageHelper.read<string>('apiPath') ?? 'http://dripdrop.local';
        const timeout = axios.CancelToken.source();
        setTimeout(() => {
            timeout.cancel();
        }, 3000);

        return axios
            .get(`${url}/system/time`, { cancelToken: timeout.token })
            .then((response) => {
                return new Date(response.data * 1000);
            })
            .catch((error) => {
                return new Date(0);
            });
    }

    public setSystemTime(date: Date): Promise<Date> {
        const url = this._localStorageHelper.read<string>('apiPath') ?? 'http://dripdrop.local';
        const timeout = axios.CancelToken.source();
        setTimeout(() => {
            timeout.cancel();
        }, 3000);

        return axios
            .post(`${url}/system/time`, {
                year: date.getUTCFullYear(),
                month: date.getUTCMonth() + 1,
                day: date.getUTCDate(),
                hour: date.getUTCHours(),
                minute: date.getUTCMinutes(),
                second: date.getUTCSeconds(),
                cancelToken: timeout.token
            })
            .then((response) => {
                return new Date(response.data * 1000);
            })
            .catch((error) => {
                return new Date(0);
            });
    }
}

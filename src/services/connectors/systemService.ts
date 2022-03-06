//import axios from 'axios';
import { Inject, injectable } from 'inversify-props';
import { HttpFactory } from '_services/factories/HttpFactory';
import { ILocalStorageHelper } from '_services/helpers/localStorageHelper';

export interface ISystemService {
    ping(): Promise<boolean>;
    getSystemTime(): Promise<number>;
    setSystemTime(date: Date): Promise<number>;
}

@injectable()
export class SystemService extends HttpFactory implements ISystemService {
    @Inject()
    private _localStorageHelper: ILocalStorageHelper;

    public async ping(): Promise<boolean> {
        const url = this._localStorageHelper.read<string>('apiPath') ?? 'http://dripdrop.local';
        return await this.$get(`${url}/system/ping`);
        /*
        const timeout = axios.CancelToken.source();
        setTimeout(() => {
            timeout.cancel();
        }, 3000);

        return axios
            .get(`${url}/ping`, { cancelToken: timeout.token })
            .then((response) => {
                return true;
            })
            .catch((error) => {
                return false;
            });*/
    }

    public async getSystemTime(): Promise<number> {
        const url = this._localStorageHelper.read<string>('apiPath') ?? 'http://dripdrop.local';
        return await this.$get(`${url}/system/time`);
        /*const timeout = axios.CancelToken.source();
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
            });*/
    }

    public async setSystemTime(date: Date): Promise<number> {
        const url = this._localStorageHelper.read<string>('apiPath') ?? 'http://dripdrop.local';
        return await this.$post(`${url}/system/time`, {
            year: date.getUTCFullYear(),
            month: date.getUTCMonth() + 1,
            day: date.getUTCDate(),
            hour: date.getUTCHours(),
            minute: date.getUTCMinutes(),
            second: date.getUTCSeconds()
        });
        /*
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
            });*/
    }
}

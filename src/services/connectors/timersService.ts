//import axios from 'axios';
import { Inject, injectable } from 'inversify-props';
import { HttpFactory } from '_services/factories/HttpFactory';
import { ILocalStorageHelper } from '_services/helpers/localStorageHelper';

export interface ITimersService {
    getTimers(): Promise<any>;
    startTimer(valveId: number, duration: number): Promise<any>;
    stopTimer(valveId: number): Promise<any>;
}

@injectable()
export class TimersService extends HttpFactory implements ITimersService {
    @Inject()
    private _localStorageHelper: ILocalStorageHelper;

    public async getTimers(): Promise<any> {
        const url = this._localStorageHelper.read<string>('apiPath') ?? 'http://dripdrop.local';
        return await this.$get(`${url}/timer`);

        /* const timeout = axios.CancelToken.source();
        setTimeout(() => {
            timeout.cancel();
        }, 3000);

        return axios
            .get(`${url}/timer`, { cancelToken: timeout.token })
            .then((response) => {
                return response;
            })
            .catch((error) => {
                return false;
            });*/
    }

    public async startTimer(valveId: number, duration: number): Promise<any> {
        const url = this._localStorageHelper.read<string>('apiPath') ?? 'http://dripdrop.local';
        return await this.$post(`${url}/timer`, { valveId: valveId, duration: duration });

        /*const timeout = axios.CancelToken.source();
        setTimeout(() => {
            timeout.cancel();
        }, 3000);

        return axios
            .post(`${url}/timer`, { valveId: valveId, duration: duration, cancelToken: timeout.token })
            .then((response) => {
                return response;
            })
            .catch((error) => {
                return false;
            });*/
    }

    public async stopTimer(valveId: number): Promise<any> {
        const url = this._localStorageHelper.read<string>('apiPath') ?? 'http://dripdrop.local';
        return await this.$post(`${url}/timer`, { valveId: valveId });

        /* const timeout = axios.CancelToken.source();
        setTimeout(() => {
            timeout.cancel();
        }, 3000);

        return axios
            .post(`${url}/timer`, { valveId: valveId, cancelToken: timeout.token })
            .then((response) => {
                return response;
            })
            .catch((error) => {
                return false;
            });*/
    }
}

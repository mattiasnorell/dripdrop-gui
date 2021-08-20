import axios from 'axios';
import { Inject, injectable } from 'inversify-props';
import { ILocalStorageHelper } from '_services/helpers/localStorageHelper';
import { IValve } from 'src/interfaces/IValve';

export interface IValveService {
    state(valveId: number): Promise<boolean>;
    valveOn(valveId: number): Promise<boolean>;
    valveOff(valveId: number): Promise<boolean>;
    getAll(): Promise<IValve[]>;
}

@injectable()
export class ValveService implements IValveService {
    @Inject()
    private _localStorageHelper: ILocalStorageHelper;

    public async state(valveId: number): Promise<boolean> {
        const url = this._localStorageHelper.read<string>('apiPath') ?? 'http://dripdrop.local';
        const timeout = axios.CancelToken.source();
        setTimeout(() => {
            timeout.cancel();
        }, 3000);

        return axios
            .get(`${url}/valve/state?valveId=${valveId}`, { cancelToken: timeout.token })
            .then((response: any) => {
                return response.data;
            })
            .catch((error: any) => {
                return false;
            });
    }

    public async valveOn(valveId: number): Promise<boolean> {
        const url = this._localStorageHelper.read<string>('apiPath') ?? 'http://dripdrop.local';
        const timeout = axios.CancelToken.source();
        setTimeout(() => {
            timeout.cancel();
        }, 3000);

        return axios
            .post(`${url}/valve/state/on`, { valveId: valveId, cancelToken: timeout.token })
            .then((response) => {
                return true;
            })
            .catch((error) => {
                return false;
            });
    }

    public async valveOff(valveId: number): Promise<boolean> {
        const url = this._localStorageHelper.read<string>('apiPath') ?? 'http://dripdrop.local';
        const timeout = axios.CancelToken.source();
        setTimeout(() => {
            timeout.cancel();
        }, 3000);

        return axios
            .post(`${url}/valve/state/off`, { valveId: valveId, cancelToken: timeout.token })
            .then((response) => {
                return true;
            })
            .catch((error) => {
                return false;
            });
    }

    public getAll(): Promise<IValve[]> {
        const url = this._localStorageHelper.read<string>('apiPath') ?? 'http://dripdrop.local';
        const timeout = axios.CancelToken.source();
        setTimeout(() => {
            timeout.cancel();
        }, 3000);

        return axios
            .get(`${url}/valves`, { cancelToken: timeout.token })
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                return 0;
            });
    }
}
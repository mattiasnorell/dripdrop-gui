import axios, { CancelToken } from 'axios';
import { $localStorageRepository } from '_services/repositories/localStorageRepository';
import { IValve } from 'src/interfaces/IValve';

class ValveService {
    public async state(valveId: number): Promise<any> {
        const url = $localStorageRepository.read<string>('apiPath') ?? 'http://dripdrop.local';
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
                return null;
            });
    }

    public async valveOn(valveId: number): Promise<boolean> {
        const url = $localStorageRepository.read<string>('apiPath') ?? 'http://dripdrop.local';
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

    public async  valveOff(valveId: number): Promise<boolean> {
        const url = $localStorageRepository.read<string>('apiPath') ?? 'http://dripdrop.local';
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
        const url = $localStorageRepository.read<string>('apiPath') ?? 'http://dripdrop.local';
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

const $valveService = new ValveService();
export { $valveService };

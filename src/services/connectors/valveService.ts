import axios, { CancelToken } from 'axios';
import { $localStorageRepository } from '_services/repositories/localStorageRepository';

class ValveService {
    public valveOn(valveId: number): Promise<boolean> {
        const url = $localStorageRepository.read<string>('apiPath') ?? 'http://dripdrop.local';
        const timeout = axios.CancelToken.source();
        setTimeout(() => {
            timeout.cancel();
        }, 3000);

        return axios
            .post(`${url}/valve/state/on`, { valveId: valveId + 1, cancelToken: timeout.token })
            .then((response) => {
                return true;
            })
            .catch((error) => {
                return false;
            });
    }

    public valveOff(valveId: number): Promise<boolean> {
        const url = $localStorageRepository.read<string>('apiPath') ?? 'http://dripdrop.local';
        const timeout = axios.CancelToken.source();
        setTimeout(() => {
            timeout.cancel();
        }, 3000);

        return axios
            .post(`${url}/valve/state/off`, { valveId: valveId + 1, cancelToken: timeout.token })
            .then((response) => {
                return true;
            })
            .catch((error) => {
                return false;
            });
    }
}

const $valveService = new ValveService();
export { $valveService };

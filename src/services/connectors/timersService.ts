import axios, { CancelToken } from 'axios';
import { IScheduleItem } from 'src/interfaces/IScheduleItem';
import { $localStorageRepository } from '_services/repositories/localStorageRepository';

class TimersService {
    public getTimers(): Promise<any> {
        const url = $localStorageRepository.read<string>('apiPath') ?? 'http://dripdrop.local';
        const timeout = axios.CancelToken.source();
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
            });
    }

    public startTimer(valveId: number, duration: number): Promise<any> {
        const url = $localStorageRepository.read<string>('apiPath') ?? 'http://dripdrop.local';
        const timeout = axios.CancelToken.source();
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
            });
    }

    public stopTimer(valveId: number): Promise<any> {
        const url = $localStorageRepository.read<string>('apiPath') ?? 'http://dripdrop.local';
        const timeout = axios.CancelToken.source();
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
            });
    }
}

const $timersService = new TimersService();
export { $timersService };

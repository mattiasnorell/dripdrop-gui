import axios, { CancelToken } from 'axios';
import { $localStorageRepository } from '_services/repositories/localStorageRepository';

class SystemService {
    public ping(): Promise<boolean> {
        const url = $localStorageRepository.read<string>('apiPath') ?? 'http://dripdrop.local';
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

    public getSystemTime(): Promise<any> {
        const url = $localStorageRepository.read<string>('apiPath') ?? 'http://dripdrop.local';
        const timeout = axios.CancelToken.source();
        setTimeout(() => {
            timeout.cancel();
        }, 3000);

        return axios
            .get(`${url}/system/time`, { cancelToken: timeout.token })
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                return false;
            });
    }

    public setSystemTime(date: Date): Promise<any> {
        const url = $localStorageRepository.read<string>('apiPath') ?? 'http://dripdrop.local';
        const timeout = axios.CancelToken.source();
        setTimeout(() => {
            timeout.cancel();
        }, 3000);

        return axios
            .post(`${url}/system/time`, {
                year: date.getUTCFullYear,
                month: date.getUTCMonth,
                day: date.getUTCDay,
                hour: date.getUTCHours,
                minute: date.getUTCMinutes,
                second: date.getUTCSeconds,
                cancelToken: timeout.token
            })
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                return false;
            });
    }
}

const $systemService = new SystemService();
export { $systemService };

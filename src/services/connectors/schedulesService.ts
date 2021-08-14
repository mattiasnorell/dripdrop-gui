import axios, { CancelToken } from 'axios';
import { IScheduleItem } from 'src/interfaces/IScheduleItem';
import { $localStorageRepository } from '_services/repositories/localStorageRepository';

class SchedulesService {
    public getSchedule(valveId: number): Promise<any> {
        const url = $localStorageRepository.read<string>('apiPath') ?? 'http://dripdrop.local';
        const timeout = axios.CancelToken.source();
        setTimeout(() => {
            timeout.cancel();
        }, 3000);

        return axios
            .get(`${url}/schedule/list`, { cancelToken: timeout.token })
            .then((response) => {
                return response;
            })
            .catch((error) => {
                return false;
            });
    }

    public updateSchedule(valveId: number, scheduleItem: IScheduleItem): Promise<boolean> {
        const url = $localStorageRepository.read<string>('apiPath') ?? 'http://dripdrop.local';
        const timeout = axios.CancelToken.source();
        setTimeout(() => {
            timeout.cancel();
        }, 3000);

        return axios
            .post(`${url}/schedule/add`, { valveId: valveId + 1, ...scheduleItem, cancelToken: timeout.token })
            .then((response) => {
                return true;
            })
            .catch((error) => {
                return false;
            });
    }

    public deleteSchedule(valveId: number, scheduleItem: IScheduleItem): Promise<boolean> {
        const url = $localStorageRepository.read<string>('apiPath') ?? 'http://dripdrop.local';
        const timeout = axios.CancelToken.source();
        setTimeout(() => {
            timeout.cancel();
        }, 3000);

        return axios
            .post(`${url}/schedule/delete`, { valveId: valveId + 1, ...scheduleItem, cancelToken: timeout.token })
            .then((response) => {
                return true;
            })
            .catch((error) => {
                return false;
            });
    }
}

const $schedulesService = new SchedulesService();
export { $schedulesService };

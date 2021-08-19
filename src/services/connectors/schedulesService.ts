import axios, { CancelToken } from 'axios';
import { injectable } from 'inversify-props';
import { IScheduleItem } from 'src/interfaces/IScheduleItem';
import { $localStorageRepository } from '_services/repositories/localStorageRepository';

export interface ISchedulesService{
    getSchedule(valveId: number): Promise<any>;
    updateSchedule(valveId: number, scheduleItem: IScheduleItem): Promise<boolean>;
    deleteSchedule(scheduleId: number): Promise<boolean>;
}

@injectable()
export class SchedulesService implements ISchedulesService{
    public getSchedule(valveId: number): Promise<any> {
        const url = $localStorageRepository.read<string>('apiPath') ?? 'http://dripdrop.local';
        const timeout = axios.CancelToken.source();
        setTimeout(() => {
            timeout.cancel();
        }, 3000);

        return axios
            .get(`${url}/schedule/list`, { responseType: 'json', cancelToken: timeout.token })
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
            .post(`${url}/schedule/add`, { valveId: valveId, ...scheduleItem, cancelToken: timeout.token })
            .then((response) => {
                return true;
            })
            .catch((error) => {
                return false;
            });
    }

    public deleteSchedule(scheduleId: number): Promise<boolean> {
        const url = $localStorageRepository.read<string>('apiPath') ?? 'http://dripdrop.local';
        const timeout = axios.CancelToken.source();
        setTimeout(() => {
            timeout.cancel();
        }, 3000);

        return axios
            .post(`${url}/schedule/delete`, { scheduleId: scheduleId, cancelToken: timeout.token })
            .then((response) => {
                return true;
            })
            .catch((error) => {
                return false;
            });
    }
}
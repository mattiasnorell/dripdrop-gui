//import axios, { CancelToken } from 'axios';
import { Inject, injectable } from 'inversify-props';
import { IScheduleItem } from 'src/interfaces/IScheduleItem';
import { HttpFactory } from '_services/factories/HttpFactory';
import { ILocalStorageHelper } from '_services/helpers/localStorageHelper';

export interface ISchedulesService {
    getSchedule(valveId: number): Promise<IScheduleItem[]>;
    updateSchedule(valveId: number, scheduleItem: IScheduleItem): Promise<boolean>;
    deleteSchedule(scheduleId: number): Promise<boolean>;
    deleteAllSchedules(): Promise<boolean>;
}

@injectable()
export class SchedulesService extends HttpFactory implements ISchedulesService {
    @Inject()
    private _localStorageHelper: ILocalStorageHelper;

    public async getSchedule(valveId: number): Promise<any> {
        const url = this._localStorageHelper.read<string>('apiPath') ?? 'http://dripdrop.local';
        return await this.$get<IScheduleItem[]>(`${url}/schedule/list`);
    }

    public async updateSchedule(valveId: number, scheduleItem: IScheduleItem): Promise<boolean> {
        const url = this._localStorageHelper.read<string>('apiPath') ?? 'http://dripdrop.local';
        return await this.$post(`${url}/schedule/add`, { ...scheduleItem });
    }

    public async deleteSchedule(scheduleId: number): Promise<boolean> {
        const url = this._localStorageHelper.read<string>('apiPath') ?? 'http://dripdrop.local';
        return await this.$post(`${url}/schedule/delete`, { scheduleId: scheduleId });
    }

    public async deleteAllSchedules(): Promise<boolean> {
        const url = this._localStorageHelper.read<string>('apiPath') ?? 'http://dripdrop.local';
        return await this.$post(`${url}/schedule/deleteAll`, {});
    }
}

//import axios, { CancelToken } from 'axios';
import { Inject, injectable } from 'inversify-props';
import { HttpFactory } from '_services/factories/HttpFactory';
import { ILocalStorageHelper } from '_services/helpers/localStorageHelper';
import { ITemperatureSensor } from 'src/interfaces/ITemperatureSensor';

export interface ISensorsService {
    getTemperature(): Promise<ITemperatureSensor>;
}

@injectable()
export class SensorsService extends HttpFactory implements ISensorsService {
    @Inject()
    private _localStorageHelper: ILocalStorageHelper;

    public async getTemperature(): Promise<ITemperatureSensor> {
        const url = this._localStorageHelper.read<string>('sensorsPath') ?? 'http://dripdrop-sensors.local';
        return await this.$get<ITemperatureSensor>(`${url}/sensors/temp`);
    }
}

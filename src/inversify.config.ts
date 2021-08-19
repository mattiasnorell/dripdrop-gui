import 'reflect-metadata';
import { container } from 'inversify-props';
import { IValveService, ValveService } from '_services/connectors/valveService';
import { ISchedulesService, SchedulesService } from '_services/connectors/schedulesService';

export default function buildContainer(): void {
    container.addTransient<ISchedulesService>(SchedulesService);
    container.addTransient<IValveService>(ValveService);
}

import 'reflect-metadata';
import { container } from 'inversify-props';
import { IValveService, ValveService } from '_services/connectors/valveService';
import { ISchedulesService, SchedulesService } from '_services/connectors/schedulesService';
import { ISystemService, SystemService } from '_services/connectors/systemService';
import { ITimersService, TimersService } from '_services/connectors/timersService';
import { ArrayHelper, IArrayHelper } from '_services/helpers/arrayHelper';
import { DateHelper, IDateHelper } from '_services/helpers/dateHelper';
import { IGuidHelper } from '_services/helpers/guidHelper';
import { IModalHelper, ModalHelper } from '_services/helpers/modalHelper';
import { IUrlHelper, UrlHelper } from '_services/helpers/urlHelper';
import { ILocalStorageHelper, LocalStorageHelper } from '_services/helpers/localStorageHelper';
import { ILanguageHelper, LanguageHelper } from '_services/helpers/languageHelper';
import { SensorsService, ISensorsService } from '_services/connectors/sensorsService';

export default function buildContainer(): void {
    // Helpers
    container.addSingleton<IArrayHelper>(ArrayHelper);
    container.addSingleton<IDateHelper>(DateHelper);
    container.addSingleton<IGuidHelper>(DateHelper);
    container.addSingleton<IModalHelper>(ModalHelper);
    container.addSingleton<IUrlHelper>(UrlHelper);
    container.addSingleton<ILocalStorageHelper>(LocalStorageHelper);
    container.addSingleton<ILanguageHelper>(LanguageHelper);

    // Services
    container.addTransient<ISchedulesService>(SchedulesService);
    container.addTransient<IValveService>(ValveService);
    container.addTransient<ISystemService>(SystemService);
    container.addTransient<ITimersService>(TimersService);
    container.addTransient<ISensorsService>(SensorsService);
}

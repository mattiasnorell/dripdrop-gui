import Vue from 'vue';
import Component from 'vue-class-component';
import { Layout } from '_components/base/layout/layout';
import { InputText } from '_components/base/input-text/inputText';
import { DropIcon } from '_components/drop-icon/dropIcon';

import { ISystemService } from '_services/connectors/systemService';
import { inject } from 'inversify-props';
import { LocalStorage } from 'src/directives/LocalStorage';
import { ILocalStorageHelper } from '_services/helpers/localStorageHelper';
import { ISchedulesService } from '_services/connectors/schedulesService';

@Component({
    name: 'Settings',
    template: require('./settings.pug'),
    components: {
        Layout,
        DropIcon,
        InputText
    }
})
export default class Setting extends Vue {
    @inject()
    private _systemService: ISystemService;

    @inject()
    private _localStorageHelper: ILocalStorageHelper;

    @inject()
    private _schedulesService: ISchedulesService;
    
    @LocalStorage({storageKey:'apiPath'})
    private apiPath: string | null = '';

    @LocalStorage({storageKey:'sensorsPath'})
    private sensorsPath: string | null = '';

    private systemTime: Date = new Date();
    private systemTimeInterval: any;

    public async mounted() {
        this.apiPath = this._localStorageHelper.read<string | null>('apiPath');
        this.sensorsPath = this._localStorageHelper.read<string | null>('sensorsPath');

        const currentSystemTime = await this._systemService.getSystemTime();
        this.systemTime = new Date(currentSystemTime * 1000);

        this.systemTimeInterval = setInterval(() => {
            const newSecond = this.systemTime.getSeconds() + 1;
            this.systemTime = new Date(this.systemTime.setSeconds(newSecond));
        }, 1000);
    }

    beforeDestroy() {
        clearInterval(this.systemTimeInterval);
    }

    private onApiUrlChange() {
        this._localStorageHelper.write<string | null>('apiPath', this.apiPath);
    }

    private onSensorsUrlChange() {
        this._localStorageHelper.write<string | null>('sensorsPath', this.sensorsPath);
    }

    private async onSetTime() {
        const result = await this._systemService.setSystemTime(new Date());

        if(result){
            this.systemTime = new Date(result * 1000);
        }
    }

    private async onClearAllSchedules() {
        if(!confirm("Radera alla scheman?")){
            return;
        }

        await this._schedulesService.deleteAllSchedules();
    }
}

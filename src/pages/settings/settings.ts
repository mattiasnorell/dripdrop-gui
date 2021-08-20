import Vue from 'vue';
import Component from 'vue-class-component';
import { Layout } from '_components/base/layout/layout';
import { InputText } from '_components/base/input-text/inputText';
import { DropIcon } from '_components/drop-icon/dropIcon';
import { ILocalStorageHelper } from '_services/helpers/localStorageHelper';
import { ISystemService } from '_services/connectors/systemService';
import { inject } from 'inversify-props';

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
    
    private apiPath: string | null = '';
    private systemTime: Date = new Date();
    private systemTimeInterval: any;

    public async mounted() {
        this.apiPath = this._localStorageHelper.read<string | null>('apiPath');

        this.systemTime = await this._systemService.getSystemTime();

        this.systemTimeInterval = setInterval(() => {
            this.systemTime = new Date(this.systemTime.setSeconds(this.systemTime.getSeconds() + 1));
        }, 1000);
    }

    beforeDestroy() {
        clearInterval(this.systemTimeInterval);
    }

    private onApiUrlChange() {
        this._localStorageHelper.write<string | null>('apiPath', this.apiPath);
    }

    private async onSetTime() {
        this.systemTime = await this._systemService.setSystemTime(new Date());
    }
}

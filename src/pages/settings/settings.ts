import Vue from 'vue';
import Component from 'vue-class-component';
import { Layout } from '_components/base/layout/layout';
import { InputText } from '_components/base/input-text/inputText';
import { DropIcon } from '_components/drop-icon/dropIcon';
import { $localStorageRepository } from '_services/repositories/localStorageRepository';
import { $systemService } from '_services/connectors/systemService';

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
    private apiPath: string | null = '';
    private systemTime: Date = new Date();
    private systemTimeInterval: any;

    public async mounted() {
        this.apiPath = $localStorageRepository.read<string | null>('apiPath');

        this.systemTime = await $systemService.getSystemTime();

        this.systemTimeInterval = setInterval(() => {
            this.systemTime = new Date(this.systemTime.setSeconds(this.systemTime.getSeconds() + 1));
        }, 1000);
    }

    beforeDestroy() {
        clearInterval(this.systemTimeInterval);
    }

    private onApiUrlChange() {
        $localStorageRepository.write<string | null>('apiPath', this.apiPath);
    }

    private async onSetTime() {
        this.systemTime = await $systemService.setSystemTime(new Date());
    }
}

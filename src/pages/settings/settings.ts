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

    public async mounted() {
        this.apiPath = $localStorageRepository.read<string | null>('apiPath');

        const systemTime = await $systemService.getSystemTime();
        this.systemTime = new Date(systemTime * 1000);
    }

    private onApiUrlChange() {
        $localStorageRepository.write<string | null>('apiPath', this.apiPath);
    }

    private async onSetTime() {
        await $systemService.setSystemTime(new Date());
        const systemTime = await $systemService.getSystemTime();
        this.systemTime = new Date(systemTime * 1000);
    }
}

import Vue from 'vue';
import Component from 'vue-class-component';
import { Layout } from '_components/base/layout/layout';
import { inject } from 'inversify-props';
import { ISensorsService } from '_services/connectors/sensorsService';
@Component({
    name: 'Sensors',
    template: require('./sensors.pug'),
    components: {
        Layout
    }
})
export default class Sensors extends Vue {
    @inject()
    private _sensorsService: ISensorsService;

    public temperature: number = 0;


    public async mounted() {
        const result = await this._sensorsService.getTemperature();
        this.temperature = result.temperature;
    }
}

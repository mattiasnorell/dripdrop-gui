import Vue from 'vue';
import Component from 'vue-class-component';
import { Layout } from '_components/base/layout/layout';
@Component({
    name: 'Sensors',
    template: require('./sensors.pug'),
    components: {
        Layout
    }
})
export default class Sensors extends Vue {
    private valves: string[] = ['1', '2', '3', '4'];

    private editSensor(id: string): void {
        this.$router.push({ name: 'valvesEdit', params: { id: id } });
    }
}

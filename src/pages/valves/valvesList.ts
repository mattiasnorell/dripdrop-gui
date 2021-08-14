import Vue from 'vue';
import Component from 'vue-class-component';
import { Layout } from '_components/base/layout/layout';
import { DropIcon } from '_components/drop-icon/dropIcon';

@Component({
    name: 'ValvesList',
    template: require('./valvesList.pug'),
    components: {
        Layout,
        DropIcon
    }
})
export default class ValvesList extends Vue {
    private valves: string[] = ['1', '2', '3', '4'];

    private editValve(id: string): void {
        this.$router.push({ name: 'valvesEdit', params: { id: id } });
    }
}

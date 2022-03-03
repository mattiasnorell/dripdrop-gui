import Vue from 'vue';
import Component from 'vue-class-component';
import { Layout } from '_components/base/layout/layout';
import { DropIcon } from '_components/drop-icon/dropIcon';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { inject } from 'inversify-props';
import { IValveService } from '_services/connectors/valveService';

@Component({
    name: 'ValvesList',
    template: require('./valvesList.pug'),
    components: {
        Layout,
        DropIcon,
        FontAwesomeIcon
    }
})
export default class ValvesList extends Vue {
    @inject()
    private _valveService: IValveService;

    private isPending: boolean = true;
    private valves: number[] = [];

    public async mounted() {
        const result = await this._valveService.getAll();
        this.isPending = false;
        if (result) {
            this.valves = result.map((item) => item.id);
        }
    }
    private editValve(id: string): void {
        this.$router.push({ name: 'valvesEdit', params: { id: id } });
    }
}

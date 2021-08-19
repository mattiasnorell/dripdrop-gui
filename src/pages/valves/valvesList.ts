import Vue from 'vue';
import Component from 'vue-class-component';
import { Layout } from '_components/base/layout/layout';
import { DropIcon } from '_components/drop-icon/dropIcon';
import { $valveRoutes } from 'src/routes/valveRoutes';
import { inject } from 'inversify-props';
import { IValveService } from '_services/connectors/valveService';

@Component({
    name: 'ValvesList',
    template: require('./valvesList.pug'),
    components: {
        Layout,
        DropIcon
    }
})
export default class ValvesList extends Vue {
    @inject()
    private _valveService: IValveService;

    private valves: string[] = ['1', '2', '3', '4'];

    public async mounted(): Promise<void>{
        
    }
    private editValve(id: string): void {
        this.$router.push({ name: 'valvesEdit', params: { id: id } });
    }
}

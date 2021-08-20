import Vue from 'vue';
import Component from 'vue-class-component';
import { Layout } from '_components/base/layout/layout';
import { DropIcon } from '_components/drop-icon/dropIcon';
import { ISystemService } from '_services/connectors/systemService';
import { inject } from 'inversify-props';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

@Component({
  name: 'Start',
  template: require('./start.pug'),
  components: {
    Layout,
    DropIcon,
    FontAwesomeIcon
  }
})
export default class Start extends Vue {
  @inject()
  private _systemService: ISystemService;

  private isConnected: boolean = true;

  public async mounted() {
    this.isConnected = await this._systemService.ping();
  }
}

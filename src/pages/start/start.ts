import Vue from 'vue';
import Component from 'vue-class-component';
import { Layout } from '_components/base/layout/layout';
import { DropIcon } from '_components/drop-icon/dropIcon';

@Component({
  name: 'Start',
  template: require('./start.pug'),
  components: {
    Layout,
    DropIcon
  }
})
export default class Start extends Vue {
}

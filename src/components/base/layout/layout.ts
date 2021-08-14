import Vue from 'vue';
import Component from 'vue-class-component';
import { MainMenu } from '../main-menu/mainMenu';
import { DropIcon } from '_components/drop-icon/dropIcon';

@Component({
  name: 'Layout',
  template: require('./layout.pug'),
  components: {
    MainMenu,
    DropIcon
  }
})
export class Layout extends Vue {
  public showMenu: boolean = false;
  
  public created(){
    
  }

  
}

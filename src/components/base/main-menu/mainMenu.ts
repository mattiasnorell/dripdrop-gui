import Vue from 'vue';
import Component from 'vue-class-component';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { RouteConfig } from 'vue-router';
import { DropIcon } from '_components/drop-icon/dropIcon';

@Component({
  name: 'mainMenu',
  template: require('./mainMenu.pug'),
  components: {
    FontAwesomeIcon,
    DropIcon,
  }
})
export class MainMenu extends Vue {
  private menuItems: RouteConfig[] | undefined = [];

  public created() {
    const routes = this.$router.options.routes;
    this.menuItems = routes;
  }

  private subIsActive(path: string): boolean {
    return this.$route.path === path;
  }

  private isActive(path: string): boolean {
    return this.$route.path.startsWith(path);
  }

  private logout(): void {
    this.$router.push('login');
  }
}

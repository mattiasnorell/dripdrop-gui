import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
    name: 'DropIcon',
    template: require('./dropIcon.pug'),
    components: {}
})
export class DropIcon extends Vue {
    public created() {}
}

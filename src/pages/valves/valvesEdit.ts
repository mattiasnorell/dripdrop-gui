import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { Layout } from '_components/base/layout/layout';
import { DropIcon } from '_components/drop-icon/dropIcon';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { IScheduleItem } from 'src/interfaces/IScheduleItem';
import { $timersService } from '_services/connectors/timersService';
import { $schedulesService } from '_services/connectors/schedulesService';
import { $valveService } from '_services/connectors/valveService';
import { SelectOption, InputSelect } from '_components/base/input-select/inputSelect';

@Component({
    name: 'ValvesEdit',
    template: require('./valvesEdit.pug'),
    components: {
        Layout,
        FontAwesomeIcon,
        DropIcon,
        InputSelect
    }
})
export default class ValvesEdit extends Vue {
    @Prop({ type: Number, default: -1 })
    public id: number;

    private schedule: IScheduleItem[] = [];

    private hourValues: SelectOption<number>[] = [];
    private minuteValues: SelectOption<number>[] = [];

    private timerInterval: any = null;
    private timerRemaining: string = '';
    private newSchduleItem: IScheduleItem = {
        fromHour: 0,
        fromMinute: 0,
        toHour: 0,
        toMinute: 0
    };

    public async mounted() {

        for (let i = 0; i < 24; i++) {
            const title: string = i < 10 ? '0' + i.toString() : i.toString();
            this.hourValues.push(new SelectOption<number>(title, i));
        }

        for (let i = 0; i < 60; i++) {
            const title: string = i < 10 ? '0' + i.toString() : i.toString();
            this.minuteValues.push(new SelectOption<number>(title, i));
        }

        this.loadSchedule();
        const timer = await this.loadTimer();

        const hasActiveTimer = timer.to > 0 && timer.to > Math.floor(Date.now() / 1000);

        if (hasActiveTimer) {
            this.timerInterval = setInterval(() => {
                const date = new Date();
                const localTime = date.getTime();
                const dstOffset = date.getTimezoneOffset() * 60;
                const secondsLeft = timer.to - Math.floor(localTime / 1000) + dstOffset;
                const min = Math.floor(secondsLeft / 60);
                const sec = Math.floor(secondsLeft % 60);
                this.timerRemaining = `${min}:${sec < 10 ? '0' + sec.toString() : sec}`;
            }, 1000);
        } else {
            this.timerRemaining = '';
        }
    }

    private async loadTimer(): Promise<any> {
        const result = await $timersService.getTimers();
        const timer = result.data.filter((item: any) => item.valveId === this.id);

        return timer;
    }

    private async loadSchedule(): Promise<void> {
        const result = await $schedulesService.getSchedule(this.id);
        const scheduleItems = result.data.filter((item: any) => item.valveId === this.id);
        this.schedule = scheduleItems;
    }

    private async onTogglePower(): Promise<void> {
        /*const state = await $valveService.state(this.id);
        console.log(state)

        if (state === 0) {
            await $valveService.valveOff(this.id);
        } else {*/
        await $valveService.valveOn(this.id);
        //}
    }

    private async onSetTimer(): Promise<void> {
        const duration = window.prompt('Timers längd i minuter');

        if (duration) {
            await $timersService.startTimer(this.id, parseInt(duration) * 60);
        }
    }

    private async onStopTimer(): Promise<void> {
        await $timersService.stopTimer(this.id);
    }

    private async onRemoveSchedule(item: IScheduleItem): Promise<void> {
        console.log(item)
        if (!item.scheduleId && item.scheduleId != 0) {
            return;
        }

        await $schedulesService.deleteSchedule(item.scheduleId);
        await this.loadSchedule();
    }

    private async onAddSchedule(): Promise<void> {
        if (this.newSchduleItem.fromHour >= this.newSchduleItem.toHour && this.newSchduleItem.fromMinute >= this.newSchduleItem.toMinute) {
            console.log('Fråntid kan inte vara snare än tilltid');

            return;
        }

        await $schedulesService.updateSchedule(this.id, this.newSchduleItem);

        this.newSchduleItem = {
            fromHour: 0,
            fromMinute: 0,
            toHour: 0,
            toMinute: 0
        };

        this.loadSchedule();
    }

    private async onForceOff(): Promise<void> {
        await $valveService.valveOff(this.id);
    }

    private onUpdateFromHour(input: number) { this.newSchduleItem.fromHour = input; }
    private onUpdateFromMinute(input: number) { this.newSchduleItem.fromMinute = input; }
    private onUpdateToHour(input: number) { this.newSchduleItem.toHour = input; }
    private onUpdateToMinute(input: number) { this.newSchduleItem.toMinute = input; }
}

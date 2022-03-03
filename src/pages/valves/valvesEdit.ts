import Vue from 'vue';
import Component from 'vue-class-component';
import _orderBy from 'lodash/orderby';
import { Prop } from 'vue-property-decorator';
import { inject } from 'inversify-props';
import { Layout } from '_components/base/layout/layout';
import { DropIcon } from '_components/drop-icon/dropIcon';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { IScheduleItem } from 'src/interfaces/IScheduleItem';
import { ITimersService } from '_services/connectors/timersService';
import { ISchedulesService } from '_services/connectors/schedulesService';
import { IValveService } from '_services/connectors/valveService';
import { SelectOption, InputSelect } from '_components/base/input-select/inputSelect';
import { IValve } from 'src/interfaces/IValve';

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
    @inject()
    private _valveService: IValveService;

    @inject()
    private _schedulesService: ISchedulesService;

    @inject()
    private _timersService: ITimersService;

    @Prop({ type: Number, default: -1 })
    public id: number;

    public isPending: boolean = false;
    public valve: IValve | undefined = { id: -1, lastRunStart: 0, lastRunEnd: 0 };
    private schedule: IScheduleItem[] = [];

    private hourValues: SelectOption<number>[] = [];
    private minuteValues: SelectOption<number>[] = [];

    private timerInterval: any = null;
    private timerRemaining: string = '';
    private newSchduleItem: IScheduleItem = {
        valveId: 0,
        fromHour: 0,
        fromMinute: 0,
        toHour: 0,
        toMinute: 0,
        days: []
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

        const result = await this._valveService.getAll();
        if (result) {
            this.valve = result.find((valve) => valve.id === this.id);
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

    public get lastRunStart() {
        if(!this.valve?.lastRunStart || this.valve?.lastRunStart === 0){
            return 'Aldrig startad';
        }

        return this.$options.filters?.dateTime(new Date((this.valve?.lastRunStart ?? 0) * 1000));
    }

    public get lastRunEnd() {
        if(!this.valve || this.valve.lastRunStart === 0){
            return '';
        }

        if(this.valve.lastRunEnd < this.valve.lastRunStart){
            return 'Ej avslutad';
        }

        return this.$options.filters?.dateTime(new Date((this.valve?.lastRunEnd ?? 0) * 1000));
    }

    private async loadTimer(): Promise<any> {
        const result = await this._timersService.getTimers();
        const timer = result.filter((item: any) => item.valveId === this.id);

        return timer;
    }

    private async loadSchedule(): Promise<void> {
        this.isPending = true;
        const result = await this._schedulesService.getSchedule(this.id);
        const scheduleItems = result.filter((item) => item.valveId === this.id);
        this.schedule = _orderBy(scheduleItems, ['fromHour', 'fromMinute']);
        this.isPending = false;
    }

    private async onTogglePower(): Promise<void> {
        /*const state = await $valveService.state(this.id);
        console.log(state)

        if (state === 0) {
            await $valveService.valveOff(this.id);
        } else {*/
        await this._valveService.valveOn(this.id);
        //}
    }

    private async onSetTimer(): Promise<void> {
        const duration = window.prompt('Timers längd i minuter');

        if (duration) {
            await this._timersService.startTimer(this.id, parseInt(duration) * 60);
        }
    }

    private async onStopTimer(): Promise<void> {
        await this._timersService.stopTimer(this.id);
    }

    private async onRemoveSchedule(item: IScheduleItem): Promise<void> {
        if (!item.scheduleId && item.scheduleId != 0) {
            return;
        }

        const isConfirmed = window.confirm('Radera?');

        if (!isConfirmed) {
            return;
        }

        await this._schedulesService.deleteSchedule(item.scheduleId);
        await this.loadSchedule();
    }

    private async onAddSchedule(): Promise<void> {
        if (this.newSchduleItem.fromHour >= this.newSchduleItem.toHour && this.newSchduleItem.fromMinute >= this.newSchduleItem.toMinute) {
            alert('Fråntid kan inte vara senare än tilltid');
            return;
        }

        this.newSchduleItem.valveId = this.id;

        await this._schedulesService.updateSchedule(this.id, this.newSchduleItem);
        this.newSchduleItem.days = [false,false,false,false,false,false,false];

        await this.loadSchedule();
    }

    private async onForceOff(): Promise<void> {
        await this._valveService.valveOff(this.id);
    }

    private onUpdateFromHour(input: number) {
        this.newSchduleItem.fromHour = input;
    }
    private onUpdateFromMinute(input: number) {
        this.newSchduleItem.fromMinute = input;
    }
    private onUpdateToHour(input: number) {
        this.newSchduleItem.toHour = input;
    }
    private onUpdateToMinute(input: number) {
        this.newSchduleItem.toMinute = input;
    }
}

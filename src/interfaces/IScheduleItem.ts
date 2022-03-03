export interface IScheduleItem {
    valveId: number;
    scheduleId?: number;
    fromHour: number;
    fromMinute: number;
    toHour: number;
    toMinute: number;
    days: boolean[];
}
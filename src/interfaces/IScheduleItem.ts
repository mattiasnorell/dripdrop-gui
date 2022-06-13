export interface IScheduleItem {
    valveId: number;
    scheduleId?: number;
    fromHour: number;
    fromMinute: number;
    duration: number;
    days: boolean[];
}
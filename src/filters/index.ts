import $addZeroToTime from './addZeroToTime';
import $dateTimeFilter from './dateTimeFilter';
import $translateFilter from './translateFilter';

const $filters = {
    install(Vue: any, options: any) {
        Vue.filter('dateTime', (input: Date) => {
            return $dateTimeFilter(input);
        });

        Vue.filter('translate', (text: string) => {
            return $translateFilter(text);
        });

        Vue.filter('addZeroToTime', (input: number) => {
            return $addZeroToTime(input);
        });
    }
};
export { $filters };

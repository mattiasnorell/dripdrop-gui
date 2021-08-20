import { injectable, Inject } from 'inversify-props';
import Vue from 'vue';
import { IGuidHelper } from './guidHelper';

export interface IModalHelper {
    create<T>(component: T, propsData: object, onClose: Function | null): void;
}

@injectable()
export class ModalHelper {
    @Inject()
    private _guidHelper: IGuidHelper;

    public create<T>(component: T, propsData: object, onClose: Function | null = null) {
        const uniqueId = this._guidHelper.generate();
        const wrapperId = `modal-${uniqueId}`;
        const modalWrapper = document.createElement('div');
        modalWrapper.id = wrapperId;
        document.body.appendChild(modalWrapper);
        document.body.style.overflow = 'hidden';

        const ctor = Vue.extend(component);
        const vm = new ctor({
            propsData: { ...propsData, modalId: uniqueId }
        }).$mount(`#${wrapperId}`);

        window.addEventListener(`closeModal-${uniqueId}`, (payload: any) => {
            vm.$destroy();
            vm?.$el?.parentNode?.removeChild(vm.$el);

            document.body.style.overflow = 'scroll';

            if (onClose) {
                onClose(payload.detail);
            }
        });
    }
}

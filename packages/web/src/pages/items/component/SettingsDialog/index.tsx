import _ from 'lodash';
import { NDrawer, NDrawerContent, NButton } from 'naive-ui';
import { defineComponent, Prop, reactive, ref, PropType, Ref } from 'vue';
import ServerList from './component/ServerList';

export interface DrawerActionType {
    close(): void;
    open(): void;
}

export default defineComponent({
    name: 'SettingDialog',
    props: {
        drawerActionRef: {
            type: Object as PropType<Ref<DrawerActionType | undefined>>,
        },
    },
    setup(props) {
        const state = reactive({
            drawerVisiable: false,
        });

        const actions: DrawerActionType = {
            close() {
                state.drawerVisiable = false;
            },
            open() {
                state.drawerVisiable = true;
            },
        };
        if (props.drawerActionRef) props.drawerActionRef.value = actions;

        return () => (
            <NDrawer
                maskClosable
                closeOnEsc
                onUpdateShow={actions.close}
                show={state.drawerVisiable}
                width="30%"
                style={{ minWidth: '200px', maxWidth: '50%' }}>
                <NDrawerContent
                    title="设置"
                    v-slots={{
                        footer: () => (
                            <NButton onClick={actions.close} text>
                                关闭
                            </NButton>
                        ),
                    }}>
                    <ServerList />
                </NDrawerContent>
            </NDrawer>
        );
    },
});

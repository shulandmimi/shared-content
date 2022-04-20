import _ from 'lodash';
import { NDrawer, NDrawerContent, useMessage } from 'naive-ui';
import { defineComponent } from 'vue';
import useLocale from '../../../../hooks/useLocale';
import ServerList from './component/ServerList';

export default defineComponent({
    name: 'SettingDialog',
    setup() {
        const message = useMessage();

        const state = useLocale('SETTINGS', {
            default: [1234],
        });

        return () => (
            <NDrawer show={false} width="30%" style={{ minWidth: '200px', maxWidth: '50%' }}>
                <NDrawerContent
                    title="哈哈哈"
                    v-slots={{
                        header: () => 'header',
                        footer: () => 'footer',
                    }}>
                    <ServerList
                        initialstate={state.value}
                        onChange={(res: typeof state.value) => {
                            state.value = res;
                            message.success('更新成功');
                        }}
                    />
                </NDrawerContent>
            </NDrawer>
        );
    },
});

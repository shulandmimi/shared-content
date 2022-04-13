// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import Items from './pages/items';
import { defineComponent } from 'vue';

export default defineComponent(function App() {
    return () => <Items />;
});

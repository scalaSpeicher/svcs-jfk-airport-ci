import './bootstrap';
import '../css/app.css';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light-border.css'
import 'tippy.js/dist/svg-arrow.css'
import 'tippy.js/dist/border.css'

import { createApp, h } from 'vue';
import { createInertiaApp } from '@inertiajs/vue3';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { ZiggyVue } from '../../vendor/tightenco/ziggy/dist/vue.m';
import store from './store.js'
import VueTippy from 'vue-tippy'
import { roundArrow } from 'vue-tippy'

const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.vue`, import.meta.glob('./Pages/**/*.vue')),
    setup({ el, App, props, plugin }) {
        return createApp({ render: () => h(App, props) })
            .use(plugin)
            .use(ZiggyVue, Ziggy)
            .use(store)
            .use(VueTippy,{
                defaultProps: {
                    theme: 'light-border',
                    arrow: roundArrow,
                    allowHTML: true,
                    followCursor: true,
                    interactive: false,
                },
            })
            .mount(el);
    },
    progress: {
        color: '#4B5563',
    },
});

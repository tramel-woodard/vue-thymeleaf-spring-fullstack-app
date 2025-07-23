import { createApp } from 'vue'
import App from './App.vue'

import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

import './style.css'

// Brown theme setup
const vuetify = createVuetify({
    components,
    directives,
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: { mdi }
    },
    theme: {
        defaultTheme: 'brownTheme',
        themes: {
            brownTheme: {
                dark: false,
                colors: {
                    primary: '#795548',
                    secondary: '#a1887f',
                    accent: '#5d4037',
                    background: '#f5f5f5',
                    surface: '#ffffff'
                }
            }
        }
    }
});

createApp(App).use(vuetify).mount('#app')

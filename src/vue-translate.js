import * as Vue from 'vue'

// The plugin
const VueTranslate = {

    // Install the method
    install(app, options) {

        const state = Vue.reactive({
            current: '',
            locales: {}
        })

        const text = (t) => {
            const translations = state.locales[state.current]
            return translations && translations[t] || t
        }

        const $translate = {
                    // Current selected language
                    lang() {
                        return state.current;
                    },

                    // Set a language as current
                    setLang(val) {
                        state.current = val;
                    },

                    // Set a locale tu use
                    setLocales(locales) {
                        if (!locales)
                            return;

                        for (let key in locales) {
                            if (!state.locales[key])
                                state.locales[key] = {};

                            Object.assign(state.locales[key], locales[key]);
                        }
                    },

                    text,

                    textWithParams(t, params = null) {
                        t = text(t)

                        if (!this.params || this.params === null || typeof this.params === 'undefined') {
                            return t;
                        }

                        Object.keys(params).forEach((key) => {
                            t = t.replace( new RegExp(`%${key}%`, 'g'), params[key]);
                        });

                        return t;
                    }
            }

            app.config.globalProperties.$translate = $translate;

        // Mixin to read locales and add the translation method and directive
        app.mixin({
            beforeCreate() {
                $translate.setLocales(this.$options.locales);
            },

            methods: {
                // An alias for the .$translate.text method
                t(t, params) {
                    return $translate.textWithParams(t, params);
                },

                tWithParams(t, params) {
                    return $translate.textWithParams(t, params);
                }
            },

            directives: {
                translate: function (el) {
                    if (!el.$translateKey)
                        el.$translateKey = el.innerText;

                    let text = $translate.text(el.$translateKey);

                    el.innerText = text;
                }
            }
        });

        // Global method for loading locales
        app.locales = $translate.setLocales;

        // Global method for setting languages
        app.lang = $translate.setLang;
    }
};

export default VueTranslate;

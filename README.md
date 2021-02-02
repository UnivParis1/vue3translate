## VueTranslate

A VueJS 3 plugin for basic translations.

### What is this?

Is a plugin to handle basic translations for your components, it adds a mixin and a directive to handle it the most comfortable way.

### What about vue-translate-plugin

vue3translate is mostly compatible with [vue-translate-plugin](https://www.npmjs.com/package/vue-translate).

Known incompatibility: events are not handled anymore

### Like Vue-i18n?

Yes and no, Vue-i18n is a great plugin and is a lot more complete than this. This handle translations too, but is a more basic idea and smaller file (is just *one* file!).

### What to expect?

Just translations, it is that simple.

## Example
```js
import Vue from 'vue';
import VueTranslate from 'vue-translate-plugin';

const myComp = Vue.createComponent({
	template: `<div>
	        {{ t('Hello World') }}
	        <span v-translate>How are you?</span>
	    </div>`,

    mounted() {
        // Define what language you want to use.
        // This can be called in something like a header with a language selector menu
        // Or any other case, doesn't need to be called in all components, but
        // at least in one, so it sets the global language of the plugin
    	this.$translate.setLang('es_DO');
    },

    // The translations itself, keyed by language or anything else you one
    locales: {
    	es_DO: {
        	'Hello World': 'Hola Mundo',
        	'How are you?': 'Como estás?'
        }
    }
});

var vm = Vue.createApp({

	components: {myComp},

	template: `<div>
	    <my-comp></my-comp>
	</div>`
});
app.use(VueTranslate);
app.mount('#app');


```

## Usage
### Loading translations
You can do this in three different ways:

- A `locales` option in your component:
```js
app.component({
	...
	locales: {
		spanish: {
			'hello world': 'hola mundo'
		}
	},
	...
})
```
- Inside a component's method:
```js
app.component({
	methods: {
		loadMysuperTranslation() {
			this.$translate.setLocales({
				spanish: {
					'hello world': 'hola mundo'
				}
			});
		}
	}
});
```
- Globally when loading the plugin:
```js
app.use(VueTranslate);

app.locales({
	spanish: {
		'hello world': 'hola mundo'
	}
});
```

### Changing the language to use

Use the `setLang` method of the `$translate` property, like this:
```js
app.component({
	methods: {
		showAppInSpanish() {
			this.$translate.setLang('spanish');
		}
	}
});
```

### Parameters

You can use the method `textWithParams` if you would like to insert parameters in your translation strings.

```js
this.$translate.textWithParams('translation.string', {
  keyA: 'Glenn',
  keyB: 'John'
})

{{ tWithParams('translation.string', { keyA: 'Glenn', keyB: 'John' }) }}

// In locales.js
'translation.string': 'My name is %keyA%. My brother is named %keyB%.'

// Result
'My name is Glenn. My brother is named John.'
```

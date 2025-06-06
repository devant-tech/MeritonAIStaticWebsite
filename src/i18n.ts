import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { translation_resources } from './i18next/translation';

i18next
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        compatibilityJSON: 'v4',
        resources: translation_resources,
        ns: ['auth', 'documents', 'translation', 'common', 'dashboard'],
        defaultNS: 'translation',
        debug: true,
        fallbackLng: 'en', // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
        // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
        // if you're using a language detector, do not define the lng option

        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18next;

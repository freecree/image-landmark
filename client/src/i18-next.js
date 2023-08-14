import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18next
    .use(initReactI18next)
    .use(LanguageDetector)
    .use(HttpBackend)
    .init({
        debug: false,
        fallbackLng: 'ua',
        supportedLngs: ['ua', 'en'],
        interpolation: {
            escapeValue: false
        },
        backend: {
            loadPath: '/translations/{{lng}}/translation.json',
        },
        detection: {
            order: ['cookie', 'localStorage', 'htmlTag', 'path', 'subdomain'],
            caches: ['cookie', 'localStorage'],
        },
    });
export default i18next;
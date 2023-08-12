import React, {useState, useEffect, useRef} from 'react';
import { useTranslation } from 'react-i18next';

const LangSwitcher = ({className}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [t, i18n] = useTranslation();

    function onChangeLang(lang) {
        i18n.changeLanguage(lang);
    }

    return (
        <div className={isOpen ? `open lang-switcher ${className}`: `lang-switcher ${className}`} 
            onClick={() => setIsOpen(!isOpen)}>
            <div className='lang-switcher__inner'>
                <div className='lang-switcher__selected-lang'>
                    <span className='lang-switcher__selected-lang-item'>
                        {i18n.language}
                    </span>
                    <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.5917 12.95L15.3 8.23334C15.3781 8.15587 15.4401 8.0637
                         15.4824 7.96215C15.5247 7.8606 15.5465 7.75168 15.5465 7.64167C15.5465 
                         7.53166 15.5247 7.42274 15.4824 7.32119C15.4401 7.21964 15.3781 7.12747 
                         15.3 7.05001C15.1439 6.8948 14.9327 6.80768 14.7125 6.80768C14.4924 
                         6.80768 14.2811 6.8948 14.125 7.05001L9.95834 11.175L5.83334 
                         7.05001C5.67721 6.8948 5.466 6.80768 5.24584 6.80768C5.02569 
                         6.80768 4.81448 6.8948 4.65834 7.05001C4.5796 7.12718 4.51696 
                         7.21922 4.47405 7.32078C4.43113 7.42235 4.4088 7.53142 4.40834 
                         7.64167C4.4088 7.75193 4.43113 7.861 4.47405 7.96256C4.51696 8.06412 
                         4.5796 8.15616 4.65834 8.23334L9.36668 12.95C9.44471 13.0346 9.53942 
                         13.1021 9.64484 13.1483C9.75025 13.1944 9.86409 13.2183 9.97918 
                         13.2183C10.0943 13.2183 10.2081 13.1944 10.3135 13.1483C10.4189
                         13.1021 10.5136 13.0346 10.5917 12.95Z" />
                    </svg>
                </div>
                <ul className='lang-switcher__lang-list'>
                    <li className='lang-switcher__lang-list-item' onClick={(e) => onChangeLang('ua')}>
                        <img width='20' src="./images/flag-ua.png" alt="UA"/>
                        UA
                    </li>
                    <li className='lang-switcher__lang-list-item' onClick={(e) => onChangeLang('en')}>
                        <img width='20' src="./images/flag-us.png" alt="UA"/>
                        EN
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default LangSwitcher;


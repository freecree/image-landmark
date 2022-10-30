import React, {useState, useEffect} from 'react';

const useValidation = (value, validations) => {
    const [isEmpty, setIsEmpty] = useState(
        {isError: false, mess: "Поле не може бути пустим"}
    );
    const [minLengthError, setMinLengthError] = useState(
        {isError: false, mess: "Занадто мало символів"}
    );
    const [emailError, setEmailError] = useState(
        {isError: false, mess: "Email введено некоректно"}
    );

    useEffect(() => {
        for (const validation in validations) {
            switch(validation) {
                case 'isEmpty':
                    if (value) {
                        setIsEmpty({...isEmpty, isError: false})
                    } else {
                        setIsEmpty({...isEmpty, isError: true});
                    }
                    break;
                case 'minLength': 
                    if (value.length < validations[validation]) {
                        setMinLengthError({...minLengthError, isError: true})
                    } else {
                        setMinLengthError({...minLengthError, isError: false});
                    }
                    break;
                case 'isEmail': 
                    const re = /^\S+@\S+\.\S+$/;
                    if (!re.test(String(value).toLowerCase())) {
                        setEmailError({...emailError, isError: true})
                    } else {
                        setEmailError({...emailError, isError: false});
                    }
                    break;
            }
        }
    }, [value]);
    return [
        isEmpty,
        minLengthError,
        emailError
    ]
}

export default (initialValue, validations) => {
    const [value, setValue] = useState(initialValue);
    const [isDirty, setIsDirty] = useState(false);
    const valid = useValidation(value, validations);

    const onChange = e => {
        setValue(e.target.value);
    }

    const onBlur = e => {
        setIsDirty(true);
    }

    const isValid = () => {
        return valid.filter(v => v.isError).length ? true : false;
    }

    return {
        value,
        isDirty,
        onChange,
        onBlur,
        valid,
        isValid
    }
}

/* eslint-disable max-statements */
import React, { useState } from 'react';
import './Form.css';
import imgBondApprove from './assets/bond_approve.jpg'

const config = {
    firstName: { value: 'james', error: { empty: 'Нужно указать имя', wrong: 'Имя указано не верно' } },
    lastName: { value: 'bond', error: { empty: 'Нужно указать фамилию', wrong: 'Фамилия указана не верно' } },
    password: { value: '007', error: { empty: 'Нужно указать пароль', wrong: 'Пароль указан не верно' } }
};

const Form = () => {
    const [values, setValues] = useState({ firstName: '', lastName: '', password: '' });
    const [errors, setErrors] = useState({});
    const [isValidate, setIsValidate] = useState(false);

    let firstNameInput = React.createRef();
    let lastNameInput = React.createRef();
    let passwordInput = React.createRef();

    const handleInputChange = (event) => {
        setValues({ ...values, ...{ [event.target.name]: event.target.value } });
        setErrors({});
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        Object.keys(config).forEach(field => {
            const inputValue = values[field];

            if (inputValue.toLowerCase() !== config[field].value) {
                errors[field] = (inputValue === '') ? config[field].error.empty : config[field].error.wrong;

                // Focus on the highest input
                if (Object.keys(errors).length === 1) focusTextInput(field);
            }
            else {
                delete errors[field];
            }
        });

        setIsValidate(Object.keys(errors).length === 0);
        setErrors(errors);
    }

    const focusTextInput = (field) => {
        this[field + 'Input'].current.focus();
    };

    if (isValidate) {
        return (
            <img
                src={imgBondApprove}
                alt="Bond Approve"
                className="t-bond-image"/>
        );
    }
    else {
        return (
            <form className="form" onSubmit={handleSubmit}>
                <h1>Введите свои данные, агент</h1>
                <p className="field">
                    <label className="field__label">
                        <span className="field-label">Имя</span>
                    </label>
                    <input type="text" name="firstName" value={values.firstName} className="field__input field-input t-input-firstname" onChange={handleInputChange} ref={firstNameInput} />
                    <span className="field__error field-error t-error-firstname">{errors.firstName}</span>
                </p>
                <p className="field">
                    <label className="field__label">
                        <span className="field-label">Фамилия</span>
                    </label>
                    <input type="text" name="lastName" value={values.lastName} className="field__input field-input t-input-lastname" onChange={handleInputChange} ref={lastNameInput} />
                    <span className="field__error field-error t-error-lastname">{errors.lastName}</span>
                </p>
                <p className="field">
                    <label className="field__label">
                        <span className="field-label">Пароль</span>
                    </label>
                    <input type="password" name="password" value={values.password} className="field__input field-input t-input-password" onChange={handleInputChange} ref={passwordInput} />
                    <span className="field__error field-error t-error-password">{errors.password}</span>
                </p>
                <div className="form__buttons">
                    <input type="submit" value="Проверить" className="button t-submit" />
                </div>
            </form>
        );
    }
};

export default Form;
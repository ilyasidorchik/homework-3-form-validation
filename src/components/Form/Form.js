import React from 'react';
import './Form.css';
import imgBondApprove from './assets/bond_approve.jpg'

const config = {
    firstName: { value: 'james', error: { empty: 'Нужно указать имя', wrong: 'Имя указано не верно' } },
    lastName: { value: 'bond', error: { empty: 'Нужно указать фамилию', wrong: 'Фамилия указана не верно' } },
    password: { value: '007', error: { empty: 'Нужно указать пароль', wrong: 'Пароль указан не верно' } }
};

export default class Form extends React.Component {
    state = {
        firstName: "",
        lastName: "",
        password: "",
        errors: {},
        validate: false
    }

    handleInputChange = (event) => {
        this.setState({ [event.target.name]: event.target.value, errors: {} });
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const { errors } = this.state;

        Object.keys(config).forEach(field => {
            const inputValue = this.state[field];

            if (inputValue.toLowerCase() !== config[field].value) {
                errors[field] = (inputValue === '') ? config[field].error.empty : config[field].error.wrong;

                // Focus on the highest input
                if (Object.keys(errors).length === 1) document.querySelector(`.t-input-${field.toLowerCase()}`).focus()
            }
            else {
                delete errors[field];
            }
        });

        this.setState({ errors, validate: Object.keys(errors).length === 0 });
    }

    render() {
        const {firstName, lastName, password, errors, validate} = this.state;

        if (validate) {
            return (
                <img
                    src={imgBondApprove}
                    alt="Bond Approve"
                    className="t-bond-image"/>
            );
        }
        else {
            return (
                <form className="form" onSubmit={this.handleSubmit}>
                    <h1>Введите свои данные, агент</h1>
                    <p className="field">
                        <label className="field__label">
                            <span className="field-label">Имя</span>
                        </label>
                        <input type="text" name="firstName" value={firstName} className="field__input field-input t-input-firstname" onChange={this.handleInputChange} />
                        <span className="field__error field-error t-error-firstname">{errors.firstName}</span>
                    </p>
                    <p className="field">
                        <label className="field__label">
                            <span className="field-label">Фамилия</span>
                        </label>
                        <input type="text" name="lastName" value={lastName} className="field__input field-input t-input-lastname" onChange={this.handleInputChange} />
                        <span className="field__error field-error t-error-lastname">{errors.lastName}</span>
                    </p>
                    <p className="field">
                        <label className="field__label">
                            <span className="field-label">Пароль</span>
                        </label>
                        <input type="password" name="password" value={password} className="field__input field-input t-input-password" onChange={this.handleInputChange} />
                        <span className="field__error field-error t-error-password">{errors.password}</span>
                    </p>
                    <div className="form__buttons">
                        <input type="submit" value="Проверить" className="button t-submit" />
                    </div>
                </form>
            );
        }
    }
}
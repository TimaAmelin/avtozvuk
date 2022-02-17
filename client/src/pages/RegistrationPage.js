import React, { useState, useRef } from 'react'
import { Form, Button, Overlay, Tooltip } from 'react-bootstrap';
import {checkLogin} from '../functions/checkLogin'

export const RegistrationPage = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [secondPassword, setSecondPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [secondName, setSecondName] = useState('');
    const [showEmail, setShowEmail] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showFields, setShowFields] = useState(false);
    const [showUnableEmail, setShowUnableEmail] = useState(false);
    const target = useRef(null);

    const onSubmitForm = async() => {
        try {
            const loginTrimmed = login.replace(/ /g, "");

            const body = {
                loginTrimmed,
                firstName,
                secondName,
                password
            };

            const response = await fetch(
                'http://localhost:5001/accounts',{
                method: 'POST',
                headers: {'content-type': 'application/json'},
                body: JSON.stringify(body)
            });

            const jsonData = await response.json();

            if (jsonData !== 'Учетная запись с такой электронной почтой уже существует'){
                checkLogin(false, loginTrimmed);
                window.location = '/account';
            } else {
                setShowPassword(false);
                setShowEmail(false);
                setShowUnableEmail(true);
                setShowFields(false);
                                    
                setTimeout(() => {
                    setShowPassword(false);
                    setShowEmail(false);
                    setShowUnableEmail(false);
                    setShowFields(false);
                }, 2000);
            }

            //window.location = '/';
            
        } catch (error) {
            console.error(error.message)
        }
    }

    return (
        <div className="login shadow-lg mt-5 bg-white">
            <div className="registration-header pt-5">
                <h1>Регистрация</h1> 
            </div>
            <div className="registration-body">
                <Form className="login-form">
                    <Form.Label>Электронная почта</Form.Label>
                    <Form.Control 
                        type="email" 
                        placeholder="Адрес электронной почты" 
                        className="rounded inner-shadow mb-3" 
                        value={login}
                        onChange={e => setLogin(e.target.value)}
                    />

                    <Form.Label>Имя</Form.Label>
                    <Form.Control 
                        placeholder="Имя" 
                        value={firstName}
                        className="rounded inner-shadow mb-3" 
                        onChange={e => setFirstName(e.target.value)}
                    />
                    
                    <Form.Label>Фамилия</Form.Label>
                    <Form.Control 
                        placeholder="Фамилия" 
                        value={secondName}
                        className="rounded inner-shadow mb-3" 
                        onChange={e => setSecondName(e.target.value)}
                    />

                    <Form.Label>Пароль</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Введите пароль" 
                        className="rounded inner-shadow mb-3" 
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />

                    <Form.Label>Пароль</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Введите пароль повторно" 
                        className="rounded inner-shadow mb-3" 
                        value={secondPassword}
                        onChange={e => setSecondPassword(e.target.value)}
                    />


                    <Button variant="no" ref={target} className="rounded button mt-3" onClick={() => {
                        if (password && firstName && secondName) {
                            if (login.search('@') !== -1) {
                                if (password === secondPassword) {
                                    onSubmitForm();
                                } else {
                                    setShowPassword(true);
                                    setShowEmail(false);
                                    setShowUnableEmail(false);
                                    setShowFields(false);

                                    setTimeout(() => {
                                        setShowPassword(false);
                                        setShowEmail(false);
                                        setShowUnableEmail(false);
                                        setShowFields(false);
                                    }, 2000);
                                }
                            } else {
                                setShowPassword(false);
                                setShowEmail(true);
                                setShowUnableEmail(false);
                                setShowFields(false);
                                    
                                setTimeout(() => {
                                    setShowPassword(false);
                                    setShowEmail(false);
                                    setShowUnableEmail(false);
                                    setShowFields(false);
                                }, 2000);
                            }
                        } else {
                            setShowPassword(false);
                            setShowEmail(false);
                            setShowUnableEmail(false);
                            setShowFields(true);
                                    
                            setTimeout(() => {
                                setShowPassword(false);
                                setShowEmail(false);
                                setShowUnableEmail(false);
                                setShowFields(false);
                            }, 2000);
                        }
                    }}>
                        Зарегистрироваться
                    </Button>
                    <Overlay target={target.current} show={showFields} placement="right">
                        {(props) => {
                            return(
                                <Tooltip id="overlay-example" {...props}>
                                    Все поля должны быть заполнены
                                </Tooltip>
                            )
                        }}
                    </Overlay>
                    <Overlay target={target.current} show={showEmail} placement="right">
                        {(props) => {
                            return(
                                <Tooltip id="overlay-example" {...props}>
                                    Невозможный адрес электронной почты
                                </Tooltip>
                            )
                        }}
                    </Overlay>
                    <Overlay target={target.current} show={showPassword} placement="right">
                        {(props) => {
                            return(
                                <Tooltip id="overlay-example" {...props}>
                                    Пароли не совпадают
                                </Tooltip>
                            )
                        }}
                    </Overlay>
                    <Overlay target={target.current} show={showUnableEmail} placement="right">
                        {(props) => {
                            return(
                                <Tooltip id="overlay-example" {...props}>
                                    Учетная запись с такой электронной почтой уже существует
                                </Tooltip>
                            )
                        }}
                    </Overlay>
                </Form>
            </div>
        </div>
    )
}
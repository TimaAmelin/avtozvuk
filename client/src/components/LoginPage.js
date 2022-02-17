import React, { useState, useRef } from 'react'
import {checkLogin} from '../functions/checkLogin'
import { Form, Button, Overlay, Tooltip } from 'react-bootstrap';

export const LoginPage = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [wrongPassword, setWrongPassword] = useState(false);
    const [wrongEmail, setWrongEmail] = useState(false);
    const target = useRef(null);

    const onSubmitForm = async() => {
        try {
            const loginTrimmed = login.replace(/ /g, "").toLowerCase();

            const body = {
                loginTrimmed,
                password
            };

            const response = await fetch(
                `http://localhost:5001/accounts/${loginTrimmed}/${password}`,{
                method: 'GET',
                headers: {'content-type': 'application/json'},
                params: JSON.stringify(body)
            });


            const jsonData = await response.json();
            
            console.log(jsonData)

            if (jsonData === 'noSuchAccount') {
                setWrongPassword(false);
                setWrongEmail(true);

                setTimeout(() => {
                    setWrongEmail(false);
                    setWrongPassword(false);
                }, 2000);
            } else if (jsonData){
                checkLogin(false, loginTrimmed);
                window.location = '/account';
            } else {
                setWrongPassword(true);
                setWrongEmail(false);

                setTimeout(() => {
                    setWrongEmail(false);
                    setWrongPassword(false);
                }, 2000);
            }
            
        } catch (error) {
            console.error(error.message)
        }
    }

    return (
        <div className="login shadow-lg mt-5 bg-white">
            <div className="login-header pt-5">
                <h1>Войти</h1> 
            </div>
            <div className="login-body">
                <Form className="login-form">
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Электронная почта</Form.Label>
                        <Form.Control 
                            type="email" 
                            placeholder="Адрес электронной почты" 
                            className="rounded inner-shadow" 
                            value={login}
                            onChange={e => setLogin(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control 
                            type="password" 
                            placeholder="Пароль" 
                            className="rounded inner-shadow" 
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    
                    <Form.Group className="d-flex justify-content-between">
                        <Button variant="no" ref={target} className="rounded mt-3 button" onClick={() => {
                            if (login.search('@') !== -1) {
                                if (password) {
                                    onSubmitForm();
                                } else {
                                    setWrongPassword(true);
                                    setWrongEmail(false);
                    
                                    setTimeout(() => {
                                        setWrongEmail(false);
                                        setWrongPassword(false);
                                    }, 2000);
                                }
                            } else {
                                setWrongPassword(false);
                                setWrongEmail(true);
                
                                setTimeout(() => {
                                    setWrongEmail(false);
                                    setWrongPassword(false);
                                }, 2000);
                            }
                        }}>
                            Войти
                        </Button>
                        <Overlay target={target.current} show={wrongPassword} placement="right">
                            {(props) => {
                                return(
                                    <Tooltip id="overlay-example" {...props}>
                                        <strong>Неверный пароль</strong><br/>
                                        Пожалуйста проверьте правильность написания пароля 
                                    </Tooltip>
                                )
                            }}
                        </Overlay>
                        <Overlay target={target.current} show={wrongEmail} placement="right">
                            {(props) => {
                                return(
                                    <Tooltip id="overlay-example" {...props}>
                                    <strong>Пользователя с таким адресом электронной почты не существует</strong><br/>
                                    Пожалуйста проверьте правильность написания адреса электронной почты 
                                    </Tooltip>
                                )
                            }}
                        </Overlay>
                        <Button variant="no" className="rounded mt-3 button" onClick={() => {
                            window.location = '/registration';
                        }}>
                            Регистрация
                        </Button>
                    </Form.Group>
                </Form>
            </div>
        </div>
    )
}
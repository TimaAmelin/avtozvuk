import React from 'react'
import {checkLogin} from '../functions/checkLogin'
import { LoginPage } from '../components/LoginPage';
import { Profile } from '../components/Profile';

export const Account = () => {

    const login = checkLogin(true, 'drakoper');
    if (login) {
        if (login.search('@') !== -1) {
            return (
                <Profile/>
            )
        } else {
            return (
                <LoginPage/>
            )
        }
    } else {
        return (
            <LoginPage/>
        )
    }
}
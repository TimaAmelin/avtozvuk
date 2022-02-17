import { checkLogin } from '../functions/checkLogin.js';

export const onLike = async (id, favourites, addOrDelete) => {
    if (favourites.indexOf(Number(id)) == -1) {
        const login = checkLogin(true, 'drakoper');
        if (login !== 'drakoper') {
            try {
                const body = {
                    login,
                    id,
                    addOrDelete
                };
        
                const response = await fetch(
                    'http://localhost:5001/usersfavourite',{
                    method: 'POST',
                    headers: {'content-type': 'application/json'},
                    body: JSON.stringify(body)
                });
        
                const jsonData = await response.json();
                if (addOrDelete) {
                    favourites.push(Number(id).toString());
                } else {
                    favourites.splice(favourites.indexOf(Number(id)), 1)
                }
                console.log(favourites)
            } catch (error) {
                console.error(error.message)
            }
        } else {
            alert('log in please');
        }
    }
}
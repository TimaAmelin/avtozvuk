import React from 'react'
import { Card, Button } from 'react-bootstrap';
import { checkLogin } from '../functions/checkLogin';

export const LastContainer = (goods, favourites, last) => {
    console.log(last)
    const onLike = async (id, addOrDelete) => {
        const login = checkLogin(true, 'drakoper');
        if (login !== 'drakoper') {
            if (favourites.indexOf(Number(id)) == -1) {
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
                } catch (error) {
                    console.error(error.message)
                }
            }
        } else {
            alert('log in please');
        }
    }

    const lastList = last.map(item => {
        if (item){
            return(
                <Card key={goods[item].id} style={{ width: '12rem' }} className="card">
                    <div className="card-image-holder">
                        <img src={'goods/' + goods[item].image_name} className="image"/>
                    </div>
                    <Card.Body>
                        <Card.Title>
                            <a href="/item" className="card-title">
                                {goods[item].name}
                            </a>
                        </Card.Title>
                        <Card.Text className="card-price">
                            <div className="price-holder d-flex justify-content-start">
                                {goods[item].price_rozn + 'Руб'}
                            </div>
                        </Card.Text>
                        <Button variant="no" className="favourite-button button mt-2" onClick={() => {
                            
                            onLike(goods[item].id, true);
                            
                            //window.location="/catalog";
                        }}>Добавить в избранное</Button>
                    </Card.Body>
                </Card>
            )
        }
    })

    return(
        <div className="last-container">
            {lastList}
        </div>
    )
    
}

import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { checkLogin } from '../functions/checkLogin';

export const Profile = () => {
    let [firstName, setFirstName] = useState('');
    let [secondName, setSecondName] = useState('');
    let [sex, setSex] = useState('');
    let [birthDate, setBirthDate] = useState('');
    let [country, setCountry] = useState('');
    let [region, setRegion] = useState('');
    let [city, setCity] = useState('');
    let [street, setStreet] = useState('');
    let [building, setBuilding] = useState('');
    let [flat, setFlat] = useState('');

    const login = checkLogin(true, 'drakoper');

    const getAccountInformation = async() => {
        try {
            const response = await fetch(`http://localhost:5001/accounts/${login}`);
            const accountInformation = await response.json();

            setFirstName(accountInformation.first_name.trim());
            setSecondName(accountInformation.second_name.trim());

            if (accountInformation.sex) {
                setSex(accountInformation.sex.trim());
            }
            if (accountInformation.birth_date) {
                setBirthDate(accountInformation.birth_date.trim());
            }
            if (accountInformation.country) {
                setCountry(accountInformation.country.trim());
            }
            if (accountInformation.region) {
                setRegion(accountInformation.region.trim());
            }
            if (accountInformation.city) {
                setCity(accountInformation.city.trim());
            }
            if (accountInformation.street) {
                setStreet(accountInformation.street.trim());
            }
            if (accountInformation.building) {
                setBuilding(accountInformation.building.trim());
            }
            if (accountInformation.flat) {
                setFlat(accountInformation.flat.trim());
            }
        } catch (error) {
            console.error(error.message)
        }
    }

    const updateAccount = async () => {
        try {
            const body = {
                login,
                firstName,
                secondName,
                sex,
                birthDate,
                country,
                region,
                city,
                street,
                building,
                flat
            };

            const response = await fetch(`http://localhost:5001/accounts/${login}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(body)
            });
        } catch (error) {
            console.error(error.message)
        }
    }

    useEffect(() => {
        getAccountInformation();
        //eslint-disable-next-line
    }, []);

    return (
        <div className="profile pt-5">
            <div className="profile-header">
                <h1>???????????? ??????????????</h1>
            </div>
            <div className="profile-body">
            <Form>
                <Row>
                    <Col>
                        <Form.Label>??????</Form.Label>
                        <Form.Control 
                            placeholder="??????" 
                            value={firstName}
                            className="inner-shadow"
                            onChange={e => setFirstName(e.target.value)}/>
                    </Col>
                    <Col>
                        <Form.Label>??????????????</Form.Label>
                        <Form.Control 
                            placeholder="??????????????" 
                            value={secondName}
                            className="inner-shadow"
                            onChange={e => setSecondName(e.target.value)}/>
                    </Col>
                </Row>
                <Form.Group controlId="exampleForm.SelectCustom" className="mt-3">
                    <Row>
                        <Col>
                            <Form.Label>??????</Form.Label>
                            <Form.Control 
                                as="select" 
                                custom style={{width: '100%'}}
                                value={sex}
                                onChange={e => setSex(e.target.value)}
                                className="inner-shadow">
                                <option></option>
                                <option>??????????????</option>
                                <option>??????????????</option>
                            </Form.Control>
                        </Col>

                        <Col>
                            <Form.Label>???????? ????????????????</Form.Label>
                            <input 
                                type="date" 
                                id="date" 
                                name="date" 
                                className="date-input inner-shadow" 
                                value={birthDate}
                                onChange={e => setBirthDate(e.target.value)}/>
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Label>?????????? ????????????????????</Form.Label>
                <Row>
                    <Col>
                        <Form.Control 
                            placeholder="????????????" 
                            value={country}
                            className="inner-shadow"
                            onChange={e => setCountry(e.target.value)}/>
                    </Col>
                    <Col>
                        <Form.Control placeholder="????????????"
                            value={region}
                            className="inner-shadow"
                            onChange={e => setRegion(e.target.value)} />
                    </Col>
                    <Col>
                        <Form.Control 
                            placeholder="??????????" 
                            value={city}
                            className="inner-shadow"
                            onChange={e => setCity(e.target.value)}/>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col>
                        <Form.Control 
                            placeholder="??????????"
                            value={street}
                            className="inner-shadow"
                            onChange={e => setStreet(e.target.value)} />
                    </Col>
                    <Col>
                        <Form.Control 
                            placeholder="??????" 
                            value={building}
                            className="inner-shadow"
                            onChange={e => setBuilding(e.target.value)}/>
                    </Col>
                    <Col>
                        <Form.Control 
                            placeholder="????????????????"
                            value={flat}
                            className="inner-shadow"
                            onChange={e => setFlat(e.target.value)} />
                    </Col>
                </Row>
                <Button variant="no" className="rounded mt-3 button" onClick={() => {
                    updateAccount();
                }
                }>
                    ??????????????????
                </Button>
                <br/>
                <Button variant="no" className="rounded mt-3 button" onClick={() => {
                    const login = checkLogin(false, null);
                    window.location = "/account"
                }
                }>
                    ??????????
                </Button>
            </Form>
            </div>
        </div>
    )
}
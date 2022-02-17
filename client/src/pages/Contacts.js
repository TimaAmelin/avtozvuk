import React from 'react';
export const Contacts = () => {
    let componentDidMount = () => {
        window.addEventListener('load', handleLoad);
    }
    
    let handleLoad = () => {
        window.ymaps.ready(() => {
        let localMap = new window.ymaps.Map('map', {center: this.state.center, zoom: 9}, {
        searchControlProvider: 'yandex#search'});
        });
    }

    componentDidMount()
    return (
        <div className="container">
            <script src="https://api-maps.yandex.ru/2.0-stable/?load=package.standart&lang=ru-Ru" type="text/javascript"></script>
            <div id="myMap">
            </div>
        </div>
    )
}
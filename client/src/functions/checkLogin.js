export const checkLogin = (get, login) => {

    const getCookie = name => {
        let matches = document.cookie.match(new RegExp(
            //eslint-disable-next-line
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    };

    if (get) {
        if (getCookie('login')){
            login = JSON.parse(getCookie('login'));
        };
    } else {
        if (login) {
            document.cookie = `login=${JSON.stringify(login.toLowerCase())}; max-age=345600e3`;
        } else {
            document.cookie = `login=${JSON.stringify(login)}; max-age=1`;
        }
    };

    let loginUpdated = login;

    if (loginUpdated) {
        loginUpdated = loginUpdated.toLowerCase();
    }

    return loginUpdated;
}
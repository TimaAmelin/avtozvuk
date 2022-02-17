export const checkPage = (get, page) => {

    const getCookie = name => {
        let matches = document.cookie.match(new RegExp(
            //eslint-disable-next-line
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    };

    if (get) {
        if (getCookie('page')){
            page = JSON.parse(getCookie('page'));
        };
    } else {
        if (page) {
            document.cookie = `page=${JSON.stringify(page)}; max-age=345600e3`;
        } else {
            document.cookie = `page=${JSON.stringify(page)}; max-age=1`;
        }
    };
    
    let pageUpdated = page;

    return pageUpdated;
}
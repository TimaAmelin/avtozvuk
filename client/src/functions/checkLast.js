export const checkLast = (get, lastOne) => {
    console.log(lastOne)

    const getCookie = name => {
        let matches = document.cookie.match(new RegExp(
            //eslint-disable-next-line
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    };

    let lasts = lastOne

    if (getCookie('lasts')){
        lasts = JSON.parse(getCookie('lasts'));
    } else {
        document.cookie = `lasts=${JSON.stringify([null, null, null, null])}; max-age=345600e3`;
        lasts = JSON.parse(getCookie('lasts'));
    }

    let last = lasts

    console.log(lasts)
    if (last.indexOf(lastOne) === -1){
        last = [lastOne,lasts[0],lasts[1],lasts[2]]
    }

    if (!get) {
        document.cookie = `lasts=${JSON.stringify(last)}; max-age=345600e3`;
    }

    return lasts;
}
export function getUrlFragment(path = null) {
    let fragment;

    path = path === null ? location.pathname : path;

    fragment = clearUrlSlashes(decodeURI(path));
    fragment = fragment.replace(/\?(.*)$/, '');

    return clearUrlSlashes(fragment);
}

/**
 * 把前後 slash 清除
 *
 * @param path
 * @returns {string}
 */
export function clearUrlSlashes(path) {
    return path.toString().replace(/\/$/, '');
}

export function getLocationSearchWithoutQuestionMark() {
    return location.search.replace('?', '');
}

/**
 *
 * 組 search url
 * @param obj
 * @returns {string}
 */
export function convertAndGetLocationSearchByPlainObject(obj) {
    if (typeof obj !== 'object') return '';

    let search = new URLSearchParams();

    for (let [key, value] of Object.entries(obj)) {
        search.append(key, value);
    }

    return '?' + search.toString();
}
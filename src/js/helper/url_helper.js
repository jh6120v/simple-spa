/**
 * 把前後 slash 清除
 *
 * @param path
 * @returns {string}
 */
export function clearUrlSlashes(path) {
    return path !== '/' ? path.toString().replace(/\/$/, '') : path;
}

export function getUrlFragment(path = null) {
    const newPath = path === null ? window.location.pathname : path;

    let fragment = clearUrlSlashes(decodeURI(newPath));
    fragment = fragment.replace(/\?(.*)$/, '');
    fragment = fragment === '' ? '/' : fragment;

    return fragment;
}

/**
 *
 * @returns {string}
 */
export function getLocationSearchWithoutQuestionMark() {
    return window.location.search.replace('?', '');
}

/**
 *
 * 組 search url
 * @param obj
 * @returns {string}
 */
export function convertAndGetLocationSearchByPlainObject(obj) {
    if (typeof obj !== 'object') return '';

    const search = new URLSearchParams();

    for (const [key, value] of Object.entries(obj)) {
        search.append(key, value);
    }

    return `?${search.toString()}`;
}

import dayjs from'dayjs';

export const setToLocaleStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
}

export const getFromLocaleStorage = (key, replacer) => (
    JSON.parse(localStorage.getItem(key), replacer)
)

export const replaceDate = (key, value) => (
    key === 'date'
        ? dayjs(value)
        : value
)

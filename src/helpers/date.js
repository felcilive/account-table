import dayjs from'dayjs';

export const getFormattedDate = (date) => (
    dayjs(date).format('DD/MM/YYYY') 
)

export const sortDate = (a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);

    if (dateA < dateB) {
        return -1;
    }

    if (dateA > dateB) {
        return 1;
    }

    return 0;
}

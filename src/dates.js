import { format } from 'date-fns';

const standardDateFormat = (localDate) => {
    const date = new Date(localDate);
    return `${format(new Date(date), 'E')}, ${format(new Date(date), 'MMM')} ${format(new Date(date), 'd')}`;
};

const inputDateFormat = (localDate) => {
    const localYear = localDate[2];
    const localMonth = localDate[0].length == 1 ? `0${localDate[0]}` : localDate[0];
    const localDay = localDate[1].length == 1 ? `0${localDate[1]}` : localDate[1];

    return `${localYear}-${localMonth}-${localDay}`;
};

export { standardDateFormat, inputDateFormat };
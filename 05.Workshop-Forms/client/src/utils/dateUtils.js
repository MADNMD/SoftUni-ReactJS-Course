import moment from '../../node_modules/moment/dist/moment.js';


export const formatDate = (input) => {
    const date = moment(input).format('ll');
    return date;
}
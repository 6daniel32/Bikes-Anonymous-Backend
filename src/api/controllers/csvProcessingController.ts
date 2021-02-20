import CSVQueue  from '../Queues/CSVQueue';

export default {
    processCSV
}

function processCSV(req, res) {
    CSVQueue.add({'data': req.body.text});
    return;
}
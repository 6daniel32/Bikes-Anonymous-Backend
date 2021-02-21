import { CSVQueue }  from '../Queues/CSVQueue';

function processCSV(req, res) {
    const queue: CSVQueue = CSVQueue.getInstance();
    queue.addJob(req.file);
    res.status(200).send("CSV added for processing");
    return;
}

export default {
    processCSV
}
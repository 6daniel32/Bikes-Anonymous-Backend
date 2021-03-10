import { CSVQueue }  from '../Queues/CSVQueue';
import CSVvalidationService from '../services/CSVvalidationService';

function processCSV(req, res) {
    const queue: CSVQueue = CSVQueue.getInstance();
    const validationResult = CSVvalidationService.validateMimeType(req.file);
    if (!validationResult.isError) {
        res.status(415).send(validationResult.errorMSG);
    }
    queue.addJob(req.file);
    res.status(200).send("CSV added for processing");
    return;
}

export default {
    processCSV
}
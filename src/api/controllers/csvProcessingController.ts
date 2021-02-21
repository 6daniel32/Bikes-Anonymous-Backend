import { CSVQueue }  from '../Queues/CSVQueue';
const CSVParse = require('csv-parse');
const fs = require('fs');

const parser = CSVParse({columns: true}, (err, records) => {console.log(records)});

function processCSV(req, res) {
    const queue: CSVQueue = CSVQueue.getInstance();
    queue.process(job => {
        try {
            fs.createReadStream('./uploads/' + job.data.data.filename).pipe(parser);
        } catch {console.log('CSVreadFailed')}
        return;
    });
    queue.on('completed', (job, result) => {
        try {
            fs.unlink('./uploads/' + job.data.data.filename);
        } catch {
            console.log('error deleting file')
        }   
        console.log("sendEmailTo relevant parts");
        return;
    });
    queue.add({'data': req.file});
    res.status(200).send("CSV added for processing");
    return;
}

export default {
    processCSV
}
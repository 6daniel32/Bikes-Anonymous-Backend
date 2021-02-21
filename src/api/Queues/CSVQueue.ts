const Queue = require('bull');
const CSVParse = require('csv-parse');
const fs = require('fs');

let parser;

import BikeRiderInfo from '../types/bikeRiderInfo';
import licenseCreationService from '../services/licenseCreationService';

export class CSVQueue extends Queue {
    private instance: CSVQueue;

    private constructor() {
        super();
        this.instance = new Queue('CSVQueue');

        this.instance.process(job => {
            try {
                fs.createReadStream('./uploads/' + job.data.data.filename)
                    .pipe(parser)
                    .on('data', (chunk) => {
                        licenseCreationService(chunk as BikeRiderInfo);
                    }).on('end', async () => {
                        await fs.unlinkSync('./uploads/' + job.data.data.filename);
                    });
            } catch {console.log('CSVreadFailed')}
        });

        this.instance.on('completed', async (job, result) => {  
            console.log("sendEmailTo relevant parts");
        });
    }

    public static getInstance(): CSVQueue {
        if(!this.instance) this.instance = new CSVQueue();
        return this.instance;
    }

    public addJob(data: File): void {
        parser = CSVParse({columns: true}); //renew parser
        this.instance.add({'data': data});
    }
}



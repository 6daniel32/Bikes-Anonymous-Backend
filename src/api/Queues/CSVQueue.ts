const Queue = require('bull');

export class CSVQueue extends Queue {
    private instance: CSVQueue;

    private constructor() {
        super();
        this.instance = new Queue('CSVQueue');
    }

    public static getInstance(): CSVQueue {
        if(!CSVQueue.instance) CSVQueue.instance = new CSVQueue();
        return CSVQueue.instance;
    }
}



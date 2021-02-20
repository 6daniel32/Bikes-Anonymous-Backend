const Queue = require('bull');
const CSVQueue = new Queue('CSVQueue');
CSVQueue.process((job, done) => {
    console.log(job.data);
    done(); //call this when finished 
});
export default CSVQueue;
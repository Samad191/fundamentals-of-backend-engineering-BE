// Short Polling
// We assign a id to the job and track it's progress. We send the id to the client
// and create a route which tells the client the progress of the job or whether the job
// is completed or not.
const app = require('express')()
const jobs = {}

app.post('/submit', (req, res) => {
    const jobId = Date.now()
    jobs[jobId] = 0
    updateJob(jobId, 0)
    res.status(200).send(jobId.toString())
})

app.get('/checkstatus', (req, res) => {
    res.status(200).send('\n\n Jobstatus: ' + jobs[req.query.jobId].toString())
})

const updateJob = (jobId, progress) => {
    jobs[jobId] = progress;
    console.log('updated job', jobId, 'to', progress)
    if(progress == 100) return;
    setTimeout(() => updateJob(jobId, progress + 10), 2000)
}

app.listen(8080, () => {
    console.log('Server is listening on port here 8080')
})
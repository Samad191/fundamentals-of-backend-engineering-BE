const app = require('express')()
const jobs = {}

app.post('/submit', (req, res) => {
    const jobId = Date.now()
    jobs[jobId] = 0
    updateJob(jobId, 0)
    res.status(200).send(jobId.toString())
})

app.get('/checkstatus', async (req, res) => {
    // long polling don't respond until the job is complete
    while(await checkJobComplete(req.query.jobId) == false);
    res.status(200).send('\n\n Jobstatus: Complete' + jobs[req.query.jobId])
})

const updateJob = (jobId, progress) => {
    jobs[jobId] = progress;
    console.log('updated job', jobId, 'to', progress)
    if(progress == 100) return;
    setTimeout(() => updateJob(jobId, progress + 10), 1000)
}

const checkJobComplete = async () => {
    return new Promise((resolve, reject) => {
        if(jobs[jobId] < 100) {
            setTimeout(() => resolve(false), 3000)
        } else {
            resolve(true)
        }
    })
}

app.listen(8080, () => {
    console.log('Server is listening on port here 8080 Long Polling')
})
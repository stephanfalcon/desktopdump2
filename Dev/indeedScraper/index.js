const driver = require("./driver")
const dbhandler = require("./dbhandler")
const writer = require("./docxtemplaterLocal/index")
const converter = require("./converter")
const prompt = require("prompt")
const Time = require("./time")
const time = new Time()

const url = "https://www.indeed.com/viewjob?jk=af9c7eee81df11a8&tk=1ghukumv1mjjl802&from=serp&vjs=3"

const prompter = async ()=>{
    prompt.start()
    result = await prompt.get(["phone"])
    return result.phone
}

const main = async (url)=>{
    const job = await driver(url)
    job.phone = await prompter()
    job.time = time.date.time.time
    job.date = time.date.calendar
    job.app = url
    console.log(job)
    await dbhandler.insert(job)
    await writer(job)
    await converter(job)
    return
}

main(url)
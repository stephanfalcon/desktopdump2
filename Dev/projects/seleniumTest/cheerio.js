const axios = require('axios')

const cheerio = require('cheerio')

axios.get("https://www.indeed.com/jobs?q=fullstack&l=remote&vjk=b6ee8af5a5d20238")
.then((data)=>{

    const $ = cheerio.load(data.data)
    console.log(data)
    // console.log($.html())

})
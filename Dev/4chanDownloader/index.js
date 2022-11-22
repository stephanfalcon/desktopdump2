const axios = require("axios");
const fs = require("fs");
const cheerio = require("cheerio");
const http = require("http");


(async() =>{
    try {
        const {data} = await axios.get("https://thumbs4.redgifs.com/ExtralargeOldlaceEidolonhelvum-mobile.mp4?expires=1668488400&signature=33c14a0b633a9226bcc31a37e92a0fdcbd287b964a50aeff8d76d75e16453fc6&for=2601%3A681%3A4100%3A7660%3A411f%3Aae16%3Ac09e%3Ace83#t=0", {responseType: 'arraybuffer'});
        console.log(data)
        return fs.writeFileSync(`newtest.mp4`, data);
      } catch (err) {
        console.log(err);
      }
    // const data = await axios.get("https://boards.4chan.org/gif/thread/23956559#p23956559")
    // // console.log(data.data)
    
    // const $ = cheerio.load(data.data)

    // const links = []
    // try{
    //     $("a.fileThumb").each((i,value)=>{
    //         var link = $(value).attr('href')
    //         links.push(link)
    //     })

    // }finally{
        
    //     links.forEach((data)=>{
    //         data = `http:${data}`
    //         const file = fs.createWriteStream("poop.mp4")
    //         http.get(data,(response)=>{
    //             response.pipe(file)
    //         })


    //     })
    // }

})()

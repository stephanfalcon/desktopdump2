var cheerio = require("cheerio")
var axios = require("axios")

const catObj = {

    arts: {
        cat : "AE",
        category : "arts"
    },
    hospitality: {
        cat: "HT",
        category: "hospitality"
    },
    science: {
        cat: "ST",
        category: "science"
    },
    merchandising: {
        cat: "ME",
        category: "merchandising"
    },
    community: {
        cat: "CM",
        category: "community"
    },
    education: {
        cat: "ED",
        category: "education"
    },
    production: {
        cat: "MA",
        category: "production"
    },
    business: {
        cat: "SE",
        category: "business"
    },
    sports: {
        cat: "SR",
        category: "merchandising"
    },
    dining: {
        cat: "DE",
        category: "dining"
    }

}

const getCats = (cat) => {
        
        return new Promise((resolve,reject)=>{
            axios.get(`https://bestofstate.org/categories_new.php?c=${cat}`)
            .then((data)=>{
                console.log("category made")
                const $ = cheerio.load(data.data)
                // $("br").remove()
                $("a").remove()
                $("div img span").remove()
                $("span").remove()
                $("#main_content_downloads").add(cat)
                $("#main_content_downloads").text().replace(/(\s)+/g,"$1")
    
                // console.log($("#main_content_downloads").text().trim())
                
                

                let text = $("#main_content_downloads").text().trim().split("\n")
                
                for (let i = 0; i < text.length; i++) {
                    let e = text[i];
                    
                    text.splice(i,1,text[i].replace(/\*/ig,""))
                    // text.splice(i,1,text[i].replace(/\*$/ig,""))
                    // text[i].replace(/\*/ig,"")
                    // console.log(text[i])
                    if (e == "" ){
                        text.splice(i,1)
                        // console.log(e)
                        if (e == "" ){
                            text.splice(i,1)
                            // console.log(e)
                            if (e == "" ){
                                text.splice(i,1)
                                // console.log(e)
                                
                                // console.log(text[i] + "this is the test")
            
                            }
                            // console.log(text[i] + "this is the test")
        
                        }

                        // console.log(text[i] + "this is the test")
    
                    }
                }
    
                // console.log(text)
                resolve(text)
                // console.log(text)
            })     
        })
}

const getWinners = (cat,year) => {
    
    return new Promise((resolve,reject)=>{
        axios.get(`https://bestofstate.org/winner${year}_${cat}.html`)
        .then((data)=>{
            console.log("winners request made")
            const $ = cheerio.load(data.data)

            let wonCats = []

            $("p").each((item,ele)=>{

                // console.log($(ele).text())
                
                wonCats.push($(ele).text().replace(/(?=:).*/,""))


            })

            // console.log(wonCats)
            resolve(wonCats)
        })        
    })


}

const getterLoop = (input,year) => {
    let loopArray = []

    return new Promise((resolve)=>{
        getWinners(catObj[input].category,year)
        .then((data1)=>{
            // console.log(data)
            getCats(catObj[input].cat)
            .then((data2)=>{
                loopArray = data2
                for (let i = 0; i < data1.length; i++) {
                    const e = data1[i];

                    for (let j = 0; j < data2.length; j++) {
                        const e = data2[j];
                        if(data1[i]==data2[j]){
                        // console.log(loopArray[j])
                        // console.log("slice")
                        loopArray.splice(j,1)
                    }
                    }

                }

                resolve(loopArray)
    
            })
        })

    })
    // var cat = getCats("ae")


    // console.log(categories)

    // for(let i = 0; i<categories.length;i++){
        
    // }
}
 
// getCats("AE")
// getWinners("arts")
// getterLoop()
getterLoop("business",2019)
.then((data)=>{
    console.log(data)
})
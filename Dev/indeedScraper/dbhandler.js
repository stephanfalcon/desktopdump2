const db = require("./db")

const handler = {
    insert: async (job) =>{
        const data = job
        const redun = await db.find(job)
        if (redun.length){
            console.log("job title is in database")
        }else{
            console.log("inserting new document")
            db.insert(data)
        }
        const final = await handler.find()
        return final
    },

    find: async (query) =>{
        const result = await db.find(query)
        return result 
    },
    
    nuke: async() =>{
        await db.nuke()
        const result = await handler.find()
        console.log(result)
        return result
    },

    delete: async(document) =>{
        await db.remove(document)
        console.log(`deleting: ${JSON.stringify(document)}`)
        return
    }
    
}

module.exports = handler


import express from "express"
const router = express.Router()
router.get("/test",(req:any,res:any)=>{
    // const body = req
    const {chig,nig} = req.body
    console.log(chig,nig)
    console.log("jg kgkgkbllb lfblfg")
    console.log("jg kgkgkbllb lfblfg")
    console.log("jg kgkgkbllb lfblfg")
    console.log("jg kgkgkbllb lfblfg")
    req.body
    return res.status(203).json({"wtf":"hello there"})
    
    
})




export {router}
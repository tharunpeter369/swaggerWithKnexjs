const router = require("express").Router()
const db = require("../db/db")
const table = "users"

//Add user to table (Create)
router.post('/',async(req,res)=>{
    console.log(req.body);
    try{
       const data= await db(table)
        .insert(req.body)
        res.status(200).send(data)
    }catch(err){
        res.status(400).send(err)
    }
})


// Get user details (Read)
router.get('/getdata/:id',async(req,res)=>{
    try{
        const data = await db(table).where(req.params)
        res.status(200).send(data)
    }catch(err){
        res.status(400).send(err)
    }
})

//Update user details (Update)
router.put('/:id',async(req,res)=>{
    try{
        const data = await db(table).where(req.params).update(req.body)
        res.status(200).json(data)
    }catch(err){
        res.status(400).send(err)
    }
})

//Delete user (Delete)
router.delete('/:id',async(req,res)=>{
    try{
        const data = await db(table).where(req.params).del()
        res.status(200).json(data)
    }catch(err){
        res.status(400).json(err)
    }
})

module.exports = router
const router = require("express").Router()
const db = require("../db/db")
const table = "users"



/**
 * @swagger
 * components:
 *   schemas:
 *     users:
 *       type: object
 *       required:
 *         - email
 *         - first_name
 *       properties:
 *         id: 
 *           type: string
 *           description: The auto generated id of the user
 *         email:
 *           type: string
 *           descriiption: The email of the user
 *         first_name:
 *           type: string
 *           description: the first name of the user
 *       example:
 *         id: 1
 *         email: xyz@gmail.com
 *         first_name: tharun
 *          
 */

/**
 * @swagger
 * tags:
 *   name: users
 *   description: The user managing API
 */


/**
 * @swagger
 * /user/getdata:
 *   get:
 *     summary: Retrun all the registered user 
 *     tags: [users]
 *     responses:
 *       200:
 *         description: The list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/users'
 *                 
 */


// Get user details (Read)
router.get('/getdata',async(req,res)=>{
    try{
        const data = await db(table)
        res.status(200).send(data)
    }catch(err){
        res.status(400).send(err)
    }
})


/**
 * @swagger
 * /user/getdata/{id}:
 *   get:
 *     summary: get specified user by id
 *     tags: [users]
 *     parameters: 
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     responses:
 *       200:
 *         description: The specific user by id
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/users'
 *       404:
 *         description: The user is not found
 *         
 */


// Get user details (Read)
router.get('/getdata/:id',async(req,res)=>{
    try{
        const data = await db(table).where(req.params)
        console.log(data.length);
        if(data.length!=0){
        res.status(200).send(data)
        }else{
            res.status(404).send("user not found")
        }
    }catch(err){
        res.status(500).send(err)
    }
})


/**
 * @swagger
 * /user:
 *   post:
 *     summary: Create a new user
 *     tags: [users]
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/users'
 *     responses:
 *       200:
 *         description: The user is created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/users'
 *       500:
 *         description:  some server error
 *     
 */



//Add user to table (Create)
router.post('/',async(req,res)=>{
    console.log(req.body);
    try{
       const data= await db(table)
        .insert(req.body)
        res.status(200).send(data)
    }catch(err){
        res.status(500).send(err)
    }
})

/**
 * @swagger
 * /user/{id}:
 *  put:
 *   summary: Update the existing user
 *   tags: [users]
 *   parameters:
 *     - in: path
 *       name: id
 *       schema:
 *         type: string
 *       required: true
 *       description: The user id
 *   requestBody: 
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           $ref: '#/components/schemas/users'
 *   responses:
 *     200:
 *       description: The user is updated
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/users'
 *     404:
 *       description : The user not found
 *     500:
 *       description : Some error happened
 */



//Update user details (Update)
router.put('/:id',async(req,res)=>{
    console.log(req.body);
    console.log(req.params);
    try{
        const data = await db(table).where(req.params).update(req.body)
        res.status(200).json(data)
    }catch(err){
        res.status(500).send(err)
    }
})

/**
 * @swagger
 * /user/{id}:
 *  delete:
 *   summary: Delete the existing user
 *   tags: [users]
 *   parameters:
 *     - in: path
 *       name: id
 *       schema:
 *         type: string
 *       required: true
 *       description: The user id
 *   responses:
 *     200:
 *       description: The user is deleted
 *     404:
 *       description : The user not found
 *     500:
 *       description : Some error happened
 */


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
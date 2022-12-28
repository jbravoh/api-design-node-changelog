import { Router } from "express";
import { body, validationResult} from "express-validator"

const router = Router()

/**
 * Product
 */

router.get('/product', (req, res) => {
    res.json({message: 'hello'})
})
router.get('/product/:id', () => {})
router.post('/product', () => {})

// req.body should have field called "name"
router.put('/product/:id', body("name").isString(), (req, res) => {
    const errors = validationResult(req)
    console.log(errors)
    if(!errors.isEmpty()) {
        res.status(400);
        // send back json and in the errors field, show the errors in an array
        res.json({errors: errors.array()})
    }
})
router.delete('/product/:id', () => {})

/**
 * Update
 */

 router.get('/update', () => {})
 router.get('/update/:id', () => {})
 router.post('/update', () => {})
 router.put('/update/:id', () => {})
 router.delete('/update/:id', () => {})
 

/**
 * Update Point
 */

 router.get('/updatepoint', (req, res) => {
    res.json({message: 'hello'})
 })
 router.get('/updatepoint/:id', () => {})
 router.post('/updatepoint', () => {})
 router.put('/updatepoint/:id', () => {})
 router.delete('/updatepoint/:id', () => {})
 

 export default router
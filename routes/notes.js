const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const { body, validationResult } = require('express-validator');
const checkLogin = require('../middleware/checklogin')
//ROUTES

//All Notes
router.get('/',checkLogin, async (req, res) => {
    try {
        const notes = await Post.find();
        res.send(notes);
    }catch(err){
        res.send({message: err});
    }
});

//Post Note
router.post('/',checkLogin, [
    body('title').isLength({ min: 5, max: 30}).withMessage('input must be between 5-30 characters'),
    body('description').isLength({ min: 20, max: 70}).withMessage('input must be between 20 - 70 characters')
] , async (req, res) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    };
    const note = new Post ({
        title: req.body.title,
        description: req.body.description
    });

    try{
    const savedNote = await note.save();
    res.send(savedNote);
    }catch(err){
    res.send({message: err});
    }

});

//Specific Note
router.get('/:noteId',checkLogin, async (req, res) => {
    try{
    const note = await Post.findById(req.params.noteId);
    res.json(note);
    }catch(err){
        res.send({message: err})
    }
})

//Delete Note
router.delete('/:noteId',checkLogin, async (req, res) => {
    try{
    const deleteNote = await Post.findByIdAndDelete(req.params.noteId);
    res.json(deleteNote);
    }catch{
        res.send({message: err});
    }
})

//Update a post
router.patch('/:noteId',checkLogin, async (req, res) => {
    try {
    const updatePost = await Post.updateOne(
        {_id: req.params.noteId}, 
        { $set: { title: req.body.title,
        description: req.body.description} }
        );
        res.json(updatePost);
    } catch(err) {
        res.send({message: err})
    }
        
})


module.exports = router;
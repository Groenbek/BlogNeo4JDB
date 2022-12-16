import { Router } from "express";
import postModel from '../models/post'
const post = Router()


// FIND POST BY ID
post.get('/:id', async (req,res)=>{
    const result = await postModel.findPostById(req.params.id)
    res.json(result)
})


// CREATE POSTS
post.post('/', async (req,res)=>{
    const result = await postModel.createPost(req.body)
    res.json(result)
})

// UPDATE POST
post.put('/:id', async (req,res)=>{
    const result = await postModel.findPostByIdAndUpdate(req.params.id, req.body)
    res.json(result)
})

// DELETE USER 
post.delete('/:id', async (req,res)=>{
    const result = await postModel.findPostByIdAndDelete(req.params.id)
    res.json(result)
})

export default post
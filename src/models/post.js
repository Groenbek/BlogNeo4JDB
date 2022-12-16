import { nanoid } from 'nanoid';
const neo4j = require('neo4j-driver');
require('dotenv').config()

const {
    url,
    db_username,
    db_password,
    database
} = process.env

const driver = neo4j.driver(url, neo4j.auth.basic(db_username, db_password));

const session = driver.session({database});


// FIND POST BY ID
const findPostById = async (id) =>{
    const result = await session.run(`MATCH (p:Post {_id : '${id}'} ) return p limit 1`)
    return result.records[0].get('p').properties
}

//CREATE POST
const createPost = async (post) =>{
    const unique_id = nanoid(8)
    await session.run(`CREATE (p:Post {_id : '${unique_id}', title: '${post.title}', desc: '${post.desc}', username: '${post.name}'} ) return p`)
    return await findById(unique_id)
}

// UPDATE Post
const findPostByIdAndUpdate = async (id, post) =>{
    const result = await session.run(`MATCH (p:Post {_id : '${id}'}) SET p.title= '${post.title}', p.desc= '${post.desc}' return p`)
    return result.records[0].get('p').properties
}

// DELETE POST
const findPostByIdAndDelete = async (id) =>{
    await session.run(`MATCH (p:Post {_id : '${id}'}) DELETE p`)
    return await findAll()
}
  
  
export default {
    createPost,
    findPostById,
    findPostByIdAndUpdate,
    findPostByIdAndDelete
}
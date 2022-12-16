import express from 'express'
import user from './src/routes/user'
import post from './src/routes/post'

require('dotenv').config()

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/', user)
app.use("/posts", post);

app.listen(process.env.PORT, () => {
    console.log("Backend is running!")
});


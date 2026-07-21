import express from 'express'
import bcrypt from 'bcrypt'
import { pool }  from '../db.js'




export const createChapter = async(req,res)=>{

    try{
        let{title,content,rating} = req.body

        const userId = req.session.userId

        await pool.query("CREATE TABLE IF NOT EXISTS chapters( id SERIAL PRIMARY KEY,user_id INT NOT NULL REFERENCES users(id),title TEXT NOT NULL,content TEXT ,favourite BOOLEAN DEFAULT false,create_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP , updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP )")
        await pool.query("INSERT INTO chapters(user_id,title,content,favourite) VALUES($1,$2,$3,$4)",[userId,title,content,rating])

         
         res.status(201).json({message : "chapter has successfully created"})


    }catch(err){
        console.error("Something Went worng!",err)
    }

}


export const ViewAllChapter = async(req,res)=>{
    try{
        const userId = req.session.userId
        const result = await pool.query("SELECT * FROM chapters WHERE user_id = $1",[userId])
        res.status(200).json(result.rows)


    }catch(err){
        console.error("Something Went worng!",err)
    }

}

export const Chapter = async(req,res)=>{

    try{
        const userId = req.session.userId

        const id = req.params.id
        
    
        const result = await pool.query("SELECT * FROM chapters WHERE id = $1 AND user_id = $2",[id ,userId])
        res.status(200).json(result.rows[0])
    }catch(err){
        console.error("Something Went worng!",err)
    }


}


export const updateChapter = async(req,res)=>{
    try{
        const id = req.params.id
        const userId = req.session.userId
        let {title , content,favourite} = req.body

        await pool.query("UPDATE chapters SET title = $1 ,content = $2,favourite = $3 , updated_at = CURRENT_TIMESTAMP WHERE id = $4 AND user_id = $5",[title,content,favourite,id,userId])
        res.status(200).json({message : "chapter has successfully updated"})




    }catch(err){
        console.error("Something Went worng!",err)
    }
}


export const deleteChapter = async(req,res)=>{
    try{
        const id = req.params.id
        const userId = req.session.userId

        let { password } = req.body
         password = password.trim();
         const user = await pool.query('SELECT username,password FROM users WHERE id = $1', [userId]);
        const IsMatch = bcrypt.compareSync(password , user.rows[0].password)
        if(!IsMatch){
            return res.status(400).json({ message: "Invalid  password." });
        }
        await pool.query("DELETE FROM chapters WHERE id = $1 AND user_id = $2",[id,userId])
        res.status(200).json({message : "chapter has successfully deleted"})

    }catch(err){
        console.error("Something Went worng!",err)
    }
}

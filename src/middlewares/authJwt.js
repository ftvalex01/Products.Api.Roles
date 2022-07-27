import jwt from 'jsonwebtoken'
import config from '../config'
import User from '../models/User';

export const verifyToken = async(req,res,next)=>{
    try {
        const token = req.headers["x-access-token"];
    if(!token) return res.status(403).json({message:"sin token no pasas"})

    const decoded = jwt.verify(token,config.SECRET)//para extraer del token el userid
    req.userId = decoded.id;// en el objeto req guardamos el userid

    const user = await User.findById(req.userId,{password:0})
    if(!user) return res.status(404).json({message:"este usuario no existe"})

    next()
    } catch (error) {
        console.log(error)
    }
}

import {ROLES} from '../models/Role'
import User from '../models/User'

export const checkDuplicateUser = async(req,res,next)=>{
    const user = await User.findOne({username: req.body.username})
    if(user) return res.status(400).json({message:"este nombre de ususario ya existe"})

    const email = await User.findOne({email: req.body.email})
    if(email) return res.status(400).json({message:"este email de ususario ya existe"})
    
    next()
}


export const checkRolesExisted = async(req,res,next)=>{
    if(req.body.roles){
        for(let i = 0 ; i < req.body.roles.length ; i++){
            if(!ROLES.includes(req.body.roles[i])){
                return res.status(400).json({
                    message:`ROLE ${req.body.roles[i]} no existe campeon no te inventes los putos roles `
                })
            }
        }
    }
    next();
}
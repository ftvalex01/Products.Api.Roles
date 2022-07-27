import User from '../models/User'
import jwt from 'jsonwebtoken'
import config from '../config'
import Role from '../models/Role';

export const signUp = async(req,res)=>{
    const {username,email,password,roles} = req.body;

    const newUser = new User({
        username,
        email,
        password:await User.encryptPassword(password), //llamamos al metodo encryptPassword el user para encriptar la contraseña
    })
    if(roles){
       const foundRoles = await Role.find({name:{$in:roles}})//si existe la propiedad role ,  voy a buscar de todos los name si en una de ellas($in) exite el role
       newUser.roles = foundRoles.map(role =>role._id)
    }else{//en caso de que el user no tnga rol se le assigna el de user
        const role = await Role.findOne({name:"user"})
        newUser.roles = [role._id]
    }
    const savedUser = await newUser.save() //guardamos el nuevo usuario
    const token = jwt.sign({id: savedUser._id},config.SECRET,{  //que dato se guarda , palabra secreta para guardarlo , objeto de configuracion
        expiresIn:86400//24h
    })

    res.status(200).json({token})


}

export const signIn = async(req,res)=>{
    
   const userFound =  await User.findOne({email:req.body.email}).populate("roles")
   if(!userFound) return res.status(400).json({message:"user not found"})

   const matchPassword = await User.comparePassword(req.body.password, userFound.password)
   if(!matchPassword) return res.status(401).json({token:null,message:"invalid password"})

   const token = jwt.sign({id:userFound._id},config.SECRET,{
    expiresIn:86400
   }) 
   res.json({token})

   

}

import Role from '../models/Role'


export const createRoles = async()=>{
   try {
    const count = await Role.estimatedDocumentCount()//Miramos si en el modelo role si ya existen documentos

    if(count > 0)return;//compramos si hay roles nos salimos. con esto evitamos que cree roles cada ves que lancemos la app

   const values = await Promise.all([
        new Role({name:'user'}).save(),
        new Role({name:'moderador'}).save(),
        new Role({name:'admin'}).save()
    ])
   
    console.log(values)

   } catch (error) {
    console.log(error)
   }
}
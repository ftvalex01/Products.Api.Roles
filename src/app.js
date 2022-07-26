import express from "express";
import morgan from "morgan";
import pkg from '../package.json';
import productsRoute from './routes/products.routes';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import { createRoles } from "./libs/initialSetup";



const app = express()
createRoles()


app.set('pkg', pkg)//metodo set , guardamos una variable y le asignamos un valor
app.use(morgan('dev'));
app.use(express.json())//para que entienda los objetos en formato JSON que le llegan

app.get('/', (req, res) => {
    res.json({
        name: app.get('pkg').name,
        author: app.get('pkg').author,
        description: app.get('pkg').description,
        version: app.get('pkg').version
    })
})
app.use('/api/products', productsRoute);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

export default app;
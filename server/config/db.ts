
import * as dotenv from 'dotenv' 
dotenv.config()


import { DataSource } from 'typeorm';
import { Usuario } from '../models/Usuario';
import { Conversion } from '../models/Conversion';
import { Rol } from '../models/Rol';



  export const conection = new DataSource({
    type: "mysql",
    port: parseInt(process.env.DB_PORT??'3306'),
    host:process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    database:process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    synchronize: true,
    logging: true,
    entities: [Usuario, Conversion,Rol],
    subscribers: [],
    migrations: [],
});
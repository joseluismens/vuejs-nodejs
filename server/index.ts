import { conection } from './config/db';
import bodyParser from 'body-parser';
import  app  from "./app";

app.use(bodyParser.json({ limit: '50mb' })); 
const PORT = process.env.PORT || 3010;
function main(){
    conection.initialize().then(()=>{
        console.log("Conectado a la Base de Datos")
    }).catch((error)=>{
        console.log("¡Error en la conexión!", error)
        throw error;
    })
    
    app.listen(PORT,()=>{
        console.log('Servidor sequelize inicializado en el puerto '+PORT)
    })
}

main();
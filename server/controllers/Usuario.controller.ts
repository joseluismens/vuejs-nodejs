import { Request, Response } from "express";

import https from 'https';
import * as jwt from "jsonwebtoken";
import { ROLES, SECRETKEY } from "../config/constantes";
import { Usuario } from "../models/Usuario";
import checkIfUnencryptedPasswordIsValid from "../config/utils";
import { Rol } from "../models/Rol";

export default class ConversionController {


    static register = async (req: Request, res: Response) => {    
    
            try {
                const  { fullname,
                    email,
                    password } = req.body;
    
                
                if (!(email && password))
                    return res.status(500).json({
                        message: "No se han enviado las credenciales para el usuario",
    
                    })
    
                const existe_usuario = await Usuario.findOne({ where: { email } })
    
                if (existe_usuario != null) {
                    return res.status(500).json({
                        message: "El correo ya ha sido registrado",
    
                    });
                }
                const rol_usuario :Rol | null = await Rol.findOneBy({nombre:'user'});
                const usuario = new Usuario();
                usuario.email = email;
                usuario.fullname = fullname;
                usuario.password = password;
                usuario.hashPassword();
                usuario.roles =[rol_usuario!];
                await usuario.save();
                
                if (usuario && rol_usuario){
                    
                   
                   return res.status(200).json({ message: 'Usuario registrado' });

                }
                    
                return res.status(500).json( "Hubo un problema al realizar el registro, intente nuevamente más tarde")

    
            } catch (error) {
                console.log(error);
                
                return res.status(500).json( "Hubo un problema al realizar el registro, intente nuevamente más tarde")
            }

    }

    static login = async (req: Request, res: Response) => {
        try {

            const { email, password } = req.body;
            if (!(email && password)){
                return res.status(500).json({
                    message: "No se han completado las credenciales de inicio de sesión",

                });
            
            }

            const usuario = await   Usuario.findOne({ where: { email: email },relations:["roles"]});
            console.log(usuario);
            
            if (usuario) {
                if (!checkIfUnencryptedPasswordIsValid(password, usuario.password))
                return res.status(500).json({
                    message: "Credenciales incorrectas",
                });

                const token = jwt.sign(
                    {
                        id_usuario: usuario.id,
                        nombre_completo: usuario.fullname,
                        email: usuario.email,
                        roles: usuario.roles,
                    
                    },
                    SECRETKEY,
                    { expiresIn: '1h' }
                );

                return res.header('auth-token', token).json({
                    id: usuario.id,
                    nombre_completo: usuario.fullname,
                    email: usuario.email,
                    roles: usuario.roles,
                    token: token
                });
            }
            return res.status(500).json({
                message: "Este usuario no esta registrado en nuestro sistema",
            })
            
            
          

        } catch (error) {
            return res.status(500).json( "Hubo un problema al iniciar sesión")
        }
    }

}

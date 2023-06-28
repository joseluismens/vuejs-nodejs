import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import jwt_decode from 'jwt-decode';
import { SECRETKEY } from "../config/constantes";



export const checkTokenPassword = (req: Request, res: Response, next: NextFunction) => {
  try{
    /* Obtener el token password y asignarlo a la variable token*/
    const token = String( req.headers?.token).split(' ')[1];
    const ct = _checkToken(req, res, token, [], false) //Por defecto se envia un false
    if(ct !== true) return ct;
  }catch(err){
    return res.status(500).send({
      success: false,
      message: 'Ocurrió un error al obtener/validar la sesión',
      token_error_code: 'TOKEN_ERR'
    });
  }
  next();
}

export const checkToken = (rolesPermitidos: Array<any> = [], allowExpiredToken = false) => {
  
  return function( req: Request, res: Response, next: NextFunction){
    try{
      
      const token = req.headers?.authorization?.split(' ')[1];
      const  ct = _checkToken(req, res, token, rolesPermitidos, allowExpiredToken)
      if(ct !== true) return ct;
    }catch(err){
      return res.status(500).send({
        success: false,
        message: 'Ocurrió un error al obtener/validar la sesión',
        token_error_code: 'TOKEN_ERR'
      });
    }
    next();
  }
  
}

function _checkToken(req: Request, res: Response, token:any, rolesPermitidos:Array<any>, allowExpiredToken = false) {
  let tokenError = '';
  let payload:any;
 
  //Bearer [jwt............................]
  if (token === 'null' || token === null || token === undefined || token === "") {
    return res.status(401).send({
      success: false,
      message: 'Token no encontrado',
      token_error_code: 'TOKEN_NOT_FOUND'
    });
    /*
    return res.status(401).send({
      success: false,
      message: 'Token vacío',
      token_error_code: 'TOKEN_EMPTY'
    });
    */
  }
  jwt.verify(token, SECRETKEY, function (err:any, decoded:any) {
    if (err) {
      /* Formato error:
        err = {
          name: 'TokenExpiredError',
          message: 'jwt expired',
          expiredAt: 1408621000
        }
      */
      tokenError = err.message;
    } else {
      payload = decoded;
      console.log(payload);
      
      res.locals.jwtPayload = decoded
      res.locals.id = payload.id_usuario;
      res.locals.roles = payload.roles;
     
    }
  });

  if (tokenError !== '') {
    if (tokenError === 'jwt expired') {
      if(allowExpiredToken === true){
        
        const expiracion:any = jwt_decode(token);
        if((expiracion.exp+24*3600) < (Date.now()/1000)){
          return res.status(401).send({
            success: false,
            message: 'Token expirado (extendido)',
            token_error_code: 'TOKEN_EXPIRED'
          });
        }

      }else{
        return res.status(401).send({
          success: false,
          message: 'Token expirado',
          token_error_code: 'TOKEN_EXPIRED'
        });
      }
      
    } else {
      return res.status(401).send({
        success: false,
        message: 'Token Error: ' + tokenError,
        token_error_code: 'TOKEN_ERR'
      });
    } 
  }else if (payload === '') {
    return res.status(401).send({
      success: false,
      message: 'Token inválido',
      token_error_code: 'TOKEN_INVALID'
    });
  } else {
     
        let encontrado = false;        
        for(const rol of payload.roles){
          
          if(rolesPermitidos.includes(parseInt(rol.id))){
            encontrado=true;
            break;
          }
        }
        
        if(!encontrado){
          return res.status(403).send({
            success: false,
            message: 'No autorizado',
            token_error_code: 'TOKEN_ERR'
          });
        }
        return true;

    
      
  }
}


import { Request, Response, NextFunction } from "express";

export const tokenValidation = (req:Request,res:Response,next:NextFunction) => {
    const token = req.header("apiKey");
    if(!token){
        return res.status(401).json('Access denied');
    }
    if(token=="tokentest"){
        next();
    }else{
        return res.status(401).json('Access denied');   
    }    
}
import jwt from "jsonwebtoken";

const generateToken=async(id)=> {
    return await new Promise((resolve,reject) => {
        jwt.sign (
             { id },
             process.env.JWT_SECRET,
             { expiresIn:"7d"},
             (err, token)=>{
                if(err) reject(err);
                else resolve(token);
             }
        );

    });
};

export default generateToken;
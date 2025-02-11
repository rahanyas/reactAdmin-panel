import jwt from 'jsonwebtoken'

function createToken (id){
  try {  
    const token = jwt.sign({id}, process.env.JWT_KEY, {expiresIn :'3d' });
    return token;

  } catch (error) {
    throw Error ('error occured while jwt signining')
  }
};

export default createToken
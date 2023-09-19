import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';

export const authRequired = (req, res, next) => {
  const { access_token } = req.cookies;
  if (!access_token) {
    return res
      .status(401)
      .json({ message: 'No access_token. Authorization denied' });
  }
  jwt.verify(access_token, TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ message: 'Invalid access_token. Authorization denied' });
    }
    // console.log(decoded);
    //{ id: '6509e77d66364baff67d591a', iat: 1695160135, exp: 1695163735 }
    req.user = decoded;
    next();
  });
};

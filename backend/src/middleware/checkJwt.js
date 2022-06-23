import jwt from "jsonwebtoken";

export default function checkJwt(req, res, next) {
  const token = req.headers.authorization;
  if (token) {
    const payload = jwt.verify(token, "privatekey");
    req.auth = payload;
    next();
  } else {
    res.send(403);
  }
}

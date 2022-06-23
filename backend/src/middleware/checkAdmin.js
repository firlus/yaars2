export default function checkAdmin(req, res, next) {
  if (req.auth.role === "A") {
    next();
  } else {
    res.send(403);
  }
}

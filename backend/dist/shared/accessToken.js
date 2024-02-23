import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const generateAccessToken = (user) => {
    console.log("GENERATE TOKEN");
    return jwt.sign({ user: user }, process.env.SECRET || "acstkn");
};
export const validateToken = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token)
        return res.status(401).json({ message: "La sesión ha expirado" });
    try {
        const payload = jwt.verify(token, process.env.SECRET || "acstkn");
        req.userId = payload.user.id;
        req.isAdmin = payload.user.tipoUsuario.descripcion == "Empleado";
        next();
    }
    catch (error) {
        console.log("ERROR VERIFYING TOKEN!!");
        return res.status(500).json({ message: "Error al validar sesión" });
    }
};
//# sourceMappingURL=accessToken.js.map
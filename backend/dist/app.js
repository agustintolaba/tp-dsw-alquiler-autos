import express from 'express';
import { provinciaRouter } from './provincia/provincia.routes.js';
import { tipoVehiculoRouter } from './tipovehiculo/tipovehiculo.routes.js';
import { usuarioRouter } from './usuario/usuario.routes.js';
const app = express();
app.use(express.json());
app.use('/api/provincia', provinciaRouter);
app.use('/api/usuario', usuarioRouter);
app.use('/api/tipovehiculo', tipoVehiculoRouter);
app.use((_req, res) => {
    return res.status(404).send({ message: 'Recurso no encontrado' });
});
app.listen(3000, () => {
    console.log('Server running...');
});
//# sourceMappingURL=app.js.map
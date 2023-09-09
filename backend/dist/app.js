import express from 'express';
import { Provincia } from './provincias.js';
const app = express();
app.use(express.json());
const prov = [
    new Provincia('1', 'Santa Fe'),
];
app.get('/api/provincia', (req, res) => {
    res.json(prov);
});
app.get('/api/provincia/:idProvincia', (req, res) => {
    const provincia = prov.find((prov) => prov.idProvincia === req.params.idProvincia);
    if (!provincia) {
        res.status(404).send({ message: 'Provincia no encontrada' });
    }
    res.json(provincia);
});
app.post('/api/provincia', (req, res) => {
    const { idProvincia, descripcionProvincia } = req.body;
    const provinciaNueva = new Provincia(idProvincia, descripcionProvincia);
    prov.push(provinciaNueva);
    res.status(201).send({ message: 'Se cargo nueva provincia', data: provinciaNueva });
});
app.listen(3000, () => {
    console.log('Server running...');
});
//# sourceMappingURL=app.js.map
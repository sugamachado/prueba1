const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Importa el modelo de usuario

// Ruta para obtener todos los usuarios
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Ruta para obtener un usuario específico por su ID
router.get('/:id', getUser, (req, res) => {
    res.json(res.user);
});

// Ruta para crear un nuevo usuario
router.post('/', async (req, res) => {
    const user = new User({
        din: req.body.din,
        nombre: req.body.nombre,
        primerApellido: req.body.primerApellido,
        segundoApellido: req.body.segundoApellido,
        naf: req.body.naf,
        contrato: req.body.contrato
    });

    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Ruta para actualizar un usuario
router.patch('/:id', getUser, async (req, res) => {
    if (req.body.din != null) {
        res.user.din = req.body.din;
    }
    if (req.body.nombre != null) {
        res.user.nombre = req.body.nombre;
    }
    if (req.body.primerApellido != null) {
        res.user.primerApellido = req.body.primerApellido;
    }
    if (req.body.segundoApellido != null) {
        res.user.segundoApellido = req.body.segundoApellido;
    }
    if (req.body.naf != null) {
        res.user.naf = req.body.naf;
    }
    if (req.body.contrato != null) {
        res.user.contrato = req.body.contrato;
    }

    try {
        const updatedUser = await res.user.save();
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Ruta para eliminar un usuario
router.delete('/:id', getUser, async (req, res) => {
    try {
        await res.user.remove();
        res.json({ message: 'Usuario eliminado' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Middleware para buscar un usuario por su ID
async function getUser(req, res, next) {
    try {
        const user = await User.findById(req.params.id);
        if (user == null) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.user = user;
        next();
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

module.exports = router;

const express = require('express');
const router = express.Router();
import { createVacancy } from '../services/servicesVacancy';

router.post('/', async (request, response) => {
    const dataVacancy = {
        name: request.body.name,
        skill: request.body.skill,
        description: request.body.description
    }
    try {
        await createVacancy(dataVacancy);
        response.status(201).send('Administrador cadastrado com sucesso!');

    } catch (error) {
        response.status(400).send('Não foi possivel cadastrar, verifique os campos.');
    }
});

module.exports = (api) => api.use('/api/vagas', router)
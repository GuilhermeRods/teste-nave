
import { vacancyExists } from './vacancyService';
import { candidateExists } from './candidateService';


import database from '../database/connectDB';

const createSubscription = async (dataSubscription) => {
    const { idVacancy, idCandidate, idAdmin } = dataSubscription;

    const subscriptionChecked = await subscriptionIsValid(dataSubscription);
    if (!subscriptionChecked) {
        throw ("Valide os campos")
    }
   
    const insertSubscription = 'INSERT INTO Subscription (idAdmin, idVacancy, idCandidate) VALUES (?, ?, ?)';
    await database.run(insertSubscription, [idAdmin, idVacancy, idCandidate]);

};

const subscriptionIsValid = async dataSubscription => {
    const { idVacancy, idCandidate } = dataSubscription;


    const candidate = await candidateExists(idCandidate);
    if (!candidate) {
        return false
    }
    const vacancy = await vacancyExists(idVacancy);
    if (!vacancy) {
        return false;
    }

    const exists = await subscriptionExists(dataSubscription);

    if (!exists) {
        return false;
    }
    return true
};

const subscriptionExists = async subscription => {
    const { idVacancy, idCandidate } = subscription;

    const subscriptionExists = 'SELECT * FROM Subscription WHERE idVacancy = ? and  idCandidate = ?';
    const subscriptionMatched = await database.get(subscriptionExists, [idVacancy, idCandidate]);
    if (subscriptionMatched !== undefined) {
        return false;
    }
    return true;
};

module.exports = { createSubscription };
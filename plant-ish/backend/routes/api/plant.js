const express = require('express');
const router = express.Router();
const Plant = require('../../models/Plant');
const jwt = require('jsonwebtoken');

router.get('/', (req, res) => {
    Plant.find()
        .then((plants) => res.json(plants))
        .catch((err) => res.status(404).json({ noitemfound: 'No plants found' }));
});

router.get('/:id', (req, res) => {
    Plant.findById(req.params.id)
        .then((plant) => res.json(plant))
        .catch((err) => res.status(404).json({ noitemsfound: 'No plant found' }));
});

router.post('/', async (req, res) => {
    const { name, description, maintenancelvl, rating, price, imageUrl } = req.body;

    try {
        const plant = new Plant({
            name,
            description,
            maintenancelvl,
            rating,
            price,
            imageUrl,
        });

        const result = await plant.save();
        res.json({ msg: 'Plant added successfully', plant: result });
    } catch (error) {
        console.error('Error during plant addition:', error.message);
        res.status(400).json({ error: 'Unable to add this plant' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const result = await Plant.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ msg: 'Update Successfully', plant: result });
    } catch (err) {
        res.status(404).json({ error: 'Unable to update the Database' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const result = await Plant.findByIdAndDelete(req.params.id);
        res.json({ mgs: 'Plant entry deleted successfully', plant: result });
    } catch (err) {
        res.status(404).json({ error: 'No such plant' });
    }
});

module.exports = router;

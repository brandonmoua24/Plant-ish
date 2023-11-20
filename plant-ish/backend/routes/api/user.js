const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const jwt = require('jsonwebtoken');

router.get('/', (req, res) => {
    User.find()
    .then((user) => res.json(user))
    .catch((err) => res.status(404).json({noitemfound: 'No User found'}));
});
router.get('/:id', (req, res) => {
    User.findById(req.params.id)
    .then((user) => res.json(user))
    .catch((err) => res.status(404).json({ noitemsfound: 'No User found'}));
});
router.post('/', (req, res) => {
    User.create(req.body)
    .then((user) => res.json({ msg: 'User added successfully'}))
    .catch((err) => res.status(400).json({ error: 'Unable to add this user'}));
});
router.put('/:id', (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body)
    .then((user) => res.json({ msg: 'Update Successfully'}))
    .catch((err) =>
        res.status(404).json({ error: 'Unable to update the Database'})
    );
});
router.delete('/:id', (req, res) => {
    User.findByIdAndDelete(req.params.id)
    .then((user) => res.json({ mgs: 'User entry deleted successfully'}))
    .catch((err) => res.status(404).json({ error: 'No such user'}));
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        if (!user || user.password !== password) {
            console.error('Incorrect username or password');
            return res.status(401).json({ error: 'Incorrect username or password' });
        }

        // Create a simple token
        const accessToken = jwt.sign({ username: user.username, roles: user.roles }, 'plantish', {
            expiresIn: '1h',
        });

        console.log('Login successful');
        res.json({ success: true, message: 'Login successful', accessToken, roles: user.roles });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = router;
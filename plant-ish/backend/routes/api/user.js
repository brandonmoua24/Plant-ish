const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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

        if (!user) {
            console.error('User not found');
            return res.status(401).json({ error: 'Incorrect username or password' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            console.error('Incorrect password');
            return res.status(401).json({ error: 'Incorrect username or password' });
        }

        const accessToken = jwt.sign({ userId: user._id, username: user.username }, 'your-secret-key', {
            expiresIn: '1h',
        });

        console.log('Login successful');

        res.cookie('token', accessToken, { httpOnly: true, maxAge: 3600000 });

        res.json({ success: true, message: 'Login successful', accessToken });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

const verifyToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, 'your-secret-key');
        req.user = decoded;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ error: 'Unauthorized' });
    }
};

router.get('/protected-route', verifyToken, (req, res) => {
    res.json({ message: 'Access granted', user: req.user });
});



module.exports = router;
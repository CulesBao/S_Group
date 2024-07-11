import fetch from 'node-fetch';
import router from '.';

router.get('/login', async (req, res) => {
    try {
        const authorizationHeader = req.headers['authorization'];
        const response = await fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authorizationHeader
            }
        });

        if (!response.ok) {
            // Forward the status code from the authentication server
            return res.status(response.status).json({ message: 'Authentication failed' });
        }

        const data = await response.json();
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'An error occurred while processing your request.' });
    }
});

export default router;
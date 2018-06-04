const express = require('express');
const app = express();

const PORT = process.env.PORT || 5000;

app.get('/api/hello', (req, res) => res.send({
    message: `Hi, I'm Noa's Server. Node express proxy on port 5000.`
}));

app.listen(PORT, () => console.log(`I'm listening on port ${PORT}`));

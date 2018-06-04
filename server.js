const express = require('express');
const app = express();

const PORT = process.env.PORT || 5000;

app.get('/api/hello', (req, res) => res.send({
    message: `Hi, I'm Noa's Server. Node express proxy on port ${PORT}.`
}));

if (process.env.NODE_ENV === 'production') {
    console.log('This is the production build.');
    app.use(express.static(`${__dirname}/client/build`));
    app.get('*', (req, res) => res.sendFile(`${__dirname}/client/build/index.html`));
}

app.listen(PORT, () => console.log(`I'm listening on port ${PORT}`));

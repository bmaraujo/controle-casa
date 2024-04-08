const express = require('express');
const categoriaRoute = require("./routes/categoria");
const { verifyToken } = require('./middleware/verifyToken');
const app = express();
const port = 3000;

app.use(verifyToken);
app.use("/api/v1/categoria",categoriaRoute);

app.listen(port, () => console.log(`Example app listening on port ${port}! http://localhost:${port}/`));
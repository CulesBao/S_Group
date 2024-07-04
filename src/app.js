import express from "express"
const app = express();
import router from "./routes/auth.routes.js";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', router);
app.use('', router)

app.listen(3000, () => {
    console.log(`Server is running on http://localhost:3000`);
})

export default app;
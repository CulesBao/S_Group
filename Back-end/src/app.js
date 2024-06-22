import express from "express"
const app = express();
import router from "./routes/users.routes.js";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/user', router);

app.listen(3000, () => {
    console.log("Server is running on port 3000")
})

export default app;
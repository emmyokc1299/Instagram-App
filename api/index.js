const express = require("express")
const app = express();
const mongoose = require("mongoose")
const dotenv = require("dotenv");
const cors = require("cors")
const authRoute = require("./routes/auth")
const postRoute = require("./routes/posts")
const userRoute = require("./routes/users")
const conversationRoute = require("./routes/conversations")
const messageRoute = require("./routes/messages");

dotenv.config()

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log('DB Connection successful')
    }).catch((err) => {
        console.log(err)
})


app.use(cors())
app.use(express.json())
app.use("/api/auth", authRoute)
app.use("/api/post", postRoute)
app.use("/api/users", userRoute)
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);


app.listen(process.env.PORT || 5000, () => {
    console.log("Backend server is running")
})
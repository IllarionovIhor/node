const uri = "mongodb+srv://admin:admin@cluster0.lgoujte.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const mongoose = require("mongoose");
mongoose.connect(uri);

export default mongoose;
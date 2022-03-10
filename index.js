const express = require("express");
const Post = require("./model/post");
//const History = require("./model/history");
const path = require("path");
const bodyParser = require("body-parser");

require("./model/conn");

const app = express();
const port = 3000;


app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'))

// app.get("/", (req, res) => {
//     res.render("index");
// })

app.get("/forum", async (req, res) => {
    try {
        const post = await Post.find({});
        res.render("index", { post });
        //res.render("customer");
    }
    catch (e) {
        console.log(e);
        res.send(e);
    }

})

app.post("/post", async(req, res) => {
    try{
        //const {name, content} = req.body;
        
        const name = req.body.name;
        const content = req.body.content;
        if(name == '' || content == '')
        {
            alert("required");
        }
        const post = {name, content};
        console.log(post);
        //var myData = new Post(req.body);
        //myData.save();
        Post.create(post);//.then(res.send("Works!"));
        res.redirect("/");
    }catch(err){
        res.status(400).send("Doesn't Work!");
        console.log(err);
    }
})

// app.post("/reply", async(req, res) => {
//     try{
//         const {name, post} = req.body;
//         const reply = {name, post};
//         console.log(reply);
//         const id = await Customer.findOne({_id})
//         // customer.save();
//         //Reply.create(post);
//         res.send("Works!");
//     }catch(err){
//         res.status(400).send("Doesn't Work!");
//     }
// })

// app.post("/transfer", async (req, res, next) => {
//     try {
//         const from = req.body.transferFrom;
//         // const a = req.body;
//         // console.log(a);
//         const to = req.body.transferTo;
//         const amount = req.body.amount;

//         const fromcust = await Customer.findOne({ name: from })
//         const tocust = await Customer.findOne({ name: to })

//         console.log(from, to, amount, fromcust, tocust);

//         if (!fromcust || !tocust) {
//             throw new AppError("User Not Found", 401);
//         }

//         if (fromcust.currentBalance > 0 && amount < fromcust.currentBalance && amount > 0) {
//             const f = new History({ transferredFrom: fromcust.name, transferredTo: tocust.name, timeStamp: Date(), amount: amount, });
//             await f.save();
//             await Customer.findOneAndUpdate({ name: fromcust.name }, { currentBalance: parseInt(fromcust.currentBalance) - parseInt(amount) });
//             await Customer.findOneAndUpdate({ name: tocust.name }, { currentBalance: parseInt(tocust.currentBalance) + parseInt(amount) });
//         }
//         res.redirect("/");
//     }

//     catch (e) {
//         console.log(e);
//         res.send(e);
//     }
// })



app.listen(port, () => {
    console.log("Server running")
})




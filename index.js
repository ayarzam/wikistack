const express = require("express");
const morgan = require("morgan");
const layout = require("./views/layout");
const addPage = require("./views/addPage");
const models = require('./models');
const wikiRouter = require('./routes/wiki');
// const userRouter = require('./routes/user');

// const goToIndex = require("./views/index");
const app = express();

app.use('/wiki/', wikiRouter);
// app.use('/user', userRouter);


app.use(morgan("dev"));

// app.use('/index', goToIndex);
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public"));


//main route to redirect to wiki
app.get("/", (req, res, next)=> {
  res.redirect("/wiki/");
  res.send(layout(""));
})

//redirect to add
app.get("/add", (req, res, next)=> {
  res.redirect("/wiki/add");
  res.send(layout(""));
})

// app.post("/", async (req, res, next)=> {
//   res.redirect("/wiki/");
  // res.send(layout(""));
  // res.send(addPage(name, email, content, status))
  // const person = new User({
  //   name: "Kate",
  //   pictureUrl: "http://fillmurrary.com/10/10"
  // });
// })

//defining wiki
app.get("/wiki/", (req, res, next)=> {
  res.send(layout("Hello World"));
})

//dfining add
app.get("/wiki/add", (req, res, next)=> {
  res.send(addPage());
})


app.post("/wiki/", async (req, res, next)=> {
  // res.send(addPage());
  console.log('title', req.body.title)
  console.log('body', req.body)
  // res.send('hello world');

  res.send(req.body);
})

// app.post("/wiki/add", async (req, res, next)=> {
//   // res.send(addPage());
//   // console.log(req.body.name);
//   // const name = new User ({
//   //   name: req.body.name,
//   //   email: req.body.email
//   // })
//   //page title
//   console.log(req.body.title)
//   console.log(req.body)
//   res.send('hello world');

//   // await name.save();
// })





// models.authenticate().
// then(() => {
//   console.log('connected to the database');
// })

const init = async () => {
  await models.User.sync()
  await models.Page.sync()
  await models.db.sync({force: true})
  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`App listening in port ${PORT}`);
  })

}






init();

const express = require("express");
const morgan = require("morgan");
const layout = require("./views/layout");
const addPage = require("./views/addPage");
const models = require('./models');
// const user = require("./routes/user");
// const wiki = require("./routes/wiki");
// const goToIndex = require("./views/index");
const app = express();



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

app.post("/", (req, res, next)=> {
  res.redirect("/wiki/");
  // res.send(layout(""));
  // res.send(addPage(name, email, content, status))

  const name = req.body.name;
  const title = req.body.email;
  const content = req.body.content;
  const status = req.body.status;
})

//defining wiki
app.get("/wiki/", (req, res, next)=> {
  res.send(layout("Hello World"));
})

//dfining add
app.get("/wiki/add", (req, res, next)=> {
  res.send(addPage());
})






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

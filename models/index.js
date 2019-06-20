const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack', {
  logging: false
});

const Page = db.define('page', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    // defaultValue: null
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false,
    // defaultValue: null
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
    // defaultValue: null
  },
  status: {
    // boolean: true
    type: Sequelize.ENUM('open', 'closed')
  }

})

const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    // defaultValue: null,
    // validate: {
    //   notNull: {
    //     msg: 'Please enter your name'
    //   }
    // }
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    // defaultValue: null,
    validate: {
      // notNull: {
      //   msg: 'Please enter your email'
      // }
      isEmail: true
    },
    // unique: true,
  }
})

function slug (title) {
  if(!title){
    console.log(Math.random().toString(36).substring(7))
    return Math.random().toString(36).substring(7);
  }
  var regex = / /gi;
  console.log(title.replace(regex, "_"))
  return title.replace(regex, "_");
}



Page.beforeValidate((pageInstance) => {
  let slugFromTitle = slug(Page.title);
  return Page.slug({
    where: {
      slug : slugFromTitle
    }
  })
})


module.exports = {
  db,
  Page,
  User
}

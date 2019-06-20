const express = require('express');
const router = express();


const { Page } = require("../models");
const { addPage } = require("../views");



function slug (title) {
  if(!title){
    console.log(Math.random().toString(36).substring(7))
    return Math.random().toString(36).substring(7);
  }
  var regex = / /gi;
  console.log(title.replace(regex, "_"))
  return title.replace(regex, "_");
}

router.post('/', async (req, res, next) => {

  // STUDENT ASSIGNMENT:
  // add definitions for `title` and `content`

  const page = new Page({
    title: req.body.title,
    content: req.body.content,
    // status: req.body.status,
    // slug: "https://google.com"
  });

  // make sure we only redirect *after* our save is complete!
  // note: `.save` returns a promise.
  try {
    await page.save();
    res.redirect('/');
  } catch (error) { next(error) }
});

module.exports = router;

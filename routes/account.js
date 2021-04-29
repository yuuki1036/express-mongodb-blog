const {
  CONNECTION_URL,
  OPTIONS,
  DATABASE,
} = require("../config/mongodb.config.js");
const MongoClient = require("mongodb").MongoClient;
const router = require("express").Router();

const validateRegistData = (body) => {
  let isValidated = true,
    errors = {};
  if (!body.url) {
    isValidated = false;
    errors.url = "URLが未入力です。'/'から始まるURLを入力してください。";
  }
  if (body.url && /^\//.test(body.url) === false) {
    isValidated = false;
    errors.url = "'/'から始まるURLを入力してください。";
  }

  if (!body.title) {
    isValidated = false;
    errors.title = "タイトルが未入力です。任意のタイトルを入力してください。";
  }

  return isValidated ? undefined : errors;
};

const createRegistData = (body) => {
  const datetime = new Date();
  return {
    url: body.url,
    published: datetime,
    update: datetime,
    title: body.title,
    content: body.content,
    keywords: (body.keywords || "").split(","),
    authors: (body.keywords || "").split(","),
  };
};

router.get("/", (req, res) => {
  res.render("./account/index.ejs");
});

router.get("/posts/regist", (req, res) => {
  res.render("./account/posts/regist-form.ejs");
});

router.post("/posts/regist/input", (req, res) => {
  const original = createRegistData(req.body);
  res.render("./account/posts/regist-form.ejs", { original });
});

router.post("/posts/regist/confirm", (req, res) => {
  const original = createRegistData(req.body);
  const errors = validateRegistData(req.body);
  if (errors) {
    res.render("./account/posts/regist-form.ejs", { errors, original });
    return;
  }
  res.render("./account/posts/regist-confirm.ejs", { original });
});

router.post("/posts/regist/execute", (req, res) => {
  const original = createRegistData(req.body);
  const errors = validateRegistData(req.body);
  if (errors) {
    res.render("./account/posts/regist-form.ejs", { errors, original });
    return;
  }

  MongoClient.connect(CONNECTION_URL, OPTIONS, (error, client) => {
    const db = client.db(DATABASE);
    db.collection("posts")
      .insertOne(original)
      .then(() => {
        res.render("./account/posts/regist-complete.ejs");
      })
      .catch((error) => {
        throw error;
      })
      .then(() => {
        client.close();
      });
  });
});

module.exports = router;

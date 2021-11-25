// router index.js はトップページ
let express = require('express');
let router = express.Router();

// indexはトップページアクセスがあったらスラッシュ
router.get('/', function(req, res, next) {
  // タイトルで’Express’を表示させる
  res.render('index', { title: 'Express' });
});

module.exports = router;

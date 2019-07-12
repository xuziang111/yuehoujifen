var http = require('http')
var fs = require('fs')
var url = require('url')
var express = require('express');
var bodyParser = require('body-parser');


const app = express()

// app.use('/',express.static('Public'))
// app.use(express.static(__dirname));

app.listen(88, () => {
    console.log(`App listening at port 8080`)
  })
  app.get('/', (req, res) => {
    let string = fs.readFileSync('./index.html','utf-8')
    res.send(string)
    // res.end()
  })
  app.use(bodyParser.json());
  // app.use(express.favicon())
  app.post('/', (req, res) => {

    console.log(req.body)
    var randomString = require('random-string');
    var x = randomString({
        length: 20,
        numeric: true,
        letters: true,
        special: false,
      }); 
    // let string = fs.readFileSync('./index.html','utf-8')
    fs.writeFile('./Public/' + x  ,req.body.name,'utf8',function(error){
        if(error){
            console.log(error);
            return false;
        }
        console.log('写入成功');
      })

    res.send(x)
    res.end()

  })

  app.get('/all', (req, res) => {
    let filename = req.query.filename

    try{
      string = fs.readFileSync('./Public/' + filename,'utf-8')
      console.log(string)
      res.set({
        'Content-Type': 'text/plain',
      });
      res.send(string)
      fs.unlinkSync('./Public/' + filename)
    }catch(err){
      console.log(err)
      res.send(`<h1>该链接已被浏览过或不存在</h1>`)
    }

    // res.send('未找到或已被读取。')
    // fs.open('./Public/' + filename, 'r', (err, fd) => {
    //     if (err) {
    //       res.send('未找到或已被读取。')
      
    //       // throw err
    //       return
    //     }
    //     fs.readFile('./Public/' + filename,'utf8', function (err, data) {
    //       if(err) {
    //        console.error(err);
    //        return;
    //       }
    //       console.log(data);
    //   });
    //   });


  })

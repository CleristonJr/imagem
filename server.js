const fs = require('fs');
const multer = require('multer');
const cors = require('cors');
const express = require('express');
const app = express();
const path = require('path');
const pastaDesigner = './Designer';
const pastaPlotter = './Plotter';
const pastaLaser = './Laser';

const port = 3000;

app.use(express.static('.'));

//salvar arquivo na pasta
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let localSalvar;

let body = '';

  req.on('data', chunk => {
    body += chunk.toString();
  });

let data = JSON.parse(body);
if(data.radioDesigner){
  localSalvar = 'Designer/';
}else if(!(data.radioDesigner)&&(data.radioPlotter)){
  localSalvar = 'Plotter/';
}else if(!(data.radioDesigner)&&!(data.radioPlotter)&&(data.radioLaser)){
  localSalvar = 'Laser/';
}
    cb(null, localSalvar)
  },
  filename: function (req, file, cb) {
    cb(null, `${file.originalname}`)
  }
})

const upload = multer({ storage: storage});

app.use('/Designer', express.static('Designer'));




app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/list-files-Designer', (req, res) => {
  fs.readdir('./Designer', (err, files) => {
    if (err) {
      console.log(err);
      res.status(500).send('Erro ao listar arquivos de Desinger');
    } else {
      console.log(files);
      res.json(files);
    }
  });
});

app.get('/list-files-Plotter', (req, res) => {
  fs.readdir('./Plotter', (err, files) => {
    if (err) {
      console.log(err);
      res.status(500).send('Erro ao listar arquivos de Plotter');
    } else {
      console.log(files);
      res.json(files);
    }
  });
});

app.get('/list-files-Laser', (req, res) => {
  fs.readdir('./Laser', (err, files) => {
    if (err) {
      console.log(err);
      res.status(500).send('Erro ao listar arquivos de Laser');
    } else {
      console.log(files);
      res.json(files);
    }
  });
});





const corsOptions = {
  origin: '*', 
  methods: ['GET', 'POST']
};

app.use(cors(corsOptions));

app.post('/', (req, res) => {
  

  req.on('end', () => {
    

    let content = `Aberta em ${new Date()}\nPor ${data.codigoCriarOS}\nVai para Plotter: ${data.radioPlotter}\nVai para Designer: ${data.radioDesigner}\nVai para Laser: ${data.radioLaser}\n`;
    let local;
    if(data.radioDesigner){
        local = 'Designer';
    }else if(!(data.radioDesigner)&&(data.radioPlotter)){
        local = 'Plotter';
    }else if(!(data.radioDesigner)&&!(data.radioPlotter)&&(data.radioLaser)){
        local = 'Laser';
    }
    fs.writeFile(`./${local}/${data.textOS}.txt`, content, err => {
      if (err) {
        console.log(err);
        res.end('Erro ao criar arquivo');
      } else {
        console.log('Arquivo criado com sucesso!');
        res.end('Arquivo criado com sucesso!');
      }
    });
  });
});

app.get('/', (req, res) => {
  fs.readdir(pastaDesigner, (err, files) => {
    if (err) {
      console.error('Ocorreu um erro ao ler o diretório!', err);
      res.status(500).send('Ocorreu um erro ao ler o diretório!');
      return;
    }
    
    res.json(files);
  });
  fs.readdir(pastaPlotter, (err, files) => {
    if (err) {
      console.error('Ocorreu um erro ao ler o diretório!', err);
      res.status(500).send('Ocorreu um erro ao ler o diretório!');
      return;
    }
    
    res.json(files);
  });
  fs.readdir(pastaLaser, (err, files) => {
    if (err) {
      console.error('Ocorreu um erro ao ler o diretório!', err);
      res.status(500).send('Ocorreu um erro ao ler o diretório!');
      return;
    }
    
    res.json(files);
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

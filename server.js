const http = require('http');
const fs = require('fs');
const cors = require('cors');

const port = 3000;

const corsOptions = {
  origin: '*', 
  methods: ['GET', 'POST']
};

const server = http.createServer((req, res) => {
  cors(corsOptions)(req, res, () => {
    if (req.method === 'POST') {
      let body = '';

      req.on('data', chunk => {
        body += chunk.toString();
      });

      req.on('end', () => {
        let data = JSON.parse(body);

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
    } else {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Servidor rodando!\n');
    }
  });
});

server.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

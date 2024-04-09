const textOS = document.getElementById("textOS");
const codigoCriarOS = document.getElementById("codigoCriarOS");
const radioDesigner = document.getElementById("radioDesigner");
const radioPlotter = document.getElementById("radioPlotter");
const radioLaser = document.getElementById("radioLaser");
const botaoCriar = document.getElementById("botaoCriar");
//const fs = require('fs');

let campos = false;
let abriu;
let vaiParaDesigner = false;
let vaiParaLaser = false;
let vaiParaPlotter = false;

botaoCriar.addEventListener('click', function() {
    if (isNaN(textOS.value)) {
        alert('Por favor, insira apenas valores numéricos no numero da OS.');
    } else if (isNaN(codigoCriarOS.value)) {
        alert('Por favor, insira apenas valores numéricos no codigo.');
    } else if (!textOS.value || !codigoCriarOS.value || !(radioDesigner.checked || radioPlotter.checked || radioLaser.checked)) {
        alert('Por favor, preencha todos os campos.');
    } else {
        campos = true;
        let dataEspecifica = new Date();
        console.log(dataEspecifica);
        console.log(campos);
        console.log(radioDesigner.checked);

        if(radioDesigner.checked){
            vaiParaDesigner = true;
        }else if(radioLaser.checked){
            vaiParaLaser = true;
        }else if(radioPlotter.checked){
            vaiParaPlotter = true;
        }

        switch (parseInt(codigoCriarOS.value)){
            case 1001:
                console.log("O vendedor gerou uma nova OS");
                abriu = "vendedor";
                break;
            case 1002:
                console.log("O Gerente gerou uma nova OS");
                abriu = "gerente";
                break;
            case 1003:
                console.log("O Desinger gerou uma nova OS");
                abriu = "designer";
                break;
            case 1004:
                console.log("O Plotter gerou uma nova OS");
                abriu = "plotter";
                break;
            case 1005:
                console.log("O Laser gerou uma nova OS");
                abriu = "laser";
                break;
        }

        console.log("Aberta em " + dataEspecifica + "\n");
        console.log("Por " + abriu + "\n");
        console.log("Vai para Plotter: " + vaiParaPlotter + "\n");
        console.log("Vai para Designer: " + vaiParaDesigner + "\n");
        console.log("Vai para Laser: " + vaiParaLaser + "\n");
        

        /*function GravaArquivo(arq, texto) {
            // pasta a ser salvo o arquivo
            var pasta = "./site/";
            // se o parametro arq que é o nome do arquivo vier vazio ele salvará o arquivo com o nome “Sem Titulo”
            if (arq == textOS.value) { arq = "Sem Titulo"; }
            // carrega o txt
            var esc = fs.createWriteStream(pasta + arq + ".txt");
            // escreve o que foi passado no parametro texto que é o texto contido no TextArea
            esc.write("Aberta em " + dataEspecifica + "\n");
            esc.write("Por " + abriu + "\n");
            esc.write("Vai para Plotter: " + vaiParaPlotter + "\n");
            esc.write("Vai para Designer: " + vaiParaDesigner + "\n");
            esc.write("Vai para Laser: " + vaiParaLaser + "\n");
            // fecha o txt
            esc.end();
        }*/

        // Código do front-end
let data = {
    textOS: textOS.value,
    codigoCriarOS: codigoCriarOS.value,
    radioDesigner: radioDesigner.checked,
    radioPlotter: radioPlotter.checked,
    radioLaser: radioLaser.checked
  };
  
  fetch('http://localhost:3000', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(response => {
    if (response.ok) {
      return response.text();
    } else {
      throw new Error('Erro ao enviar dados para o servidor');
    }
  }).then(data => {
    console.log(data);
  }).catch(error => {
    console.log(error);
  });
  

    }
});
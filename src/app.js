const express = require("express");
const cors = require("cors");
const {uuid} = require('uuidv4')

// const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
   return response.json(repositories);
});


app.post("/repositories", (request, response) => {

  const {title, url, techs} = request.body;
  // para criar um id universal
  const repositore = {
        id:uuid(),
        title, 
        url,
        techs,
        likes: 0
      }
  repositories.push(repositore)
  return response.json(repositore)

});



app.put("/repositories/:id", (request, response) => {
  // buncando id do projeto
  const { id } = request.params;

  // buscando variaveis do projeto
  const {title,url,techs} = request.body;
  // buncando id do projeto
  const repositoretIndex = repositories.findIndex(repositore => repositore.id ==id);
  if (repositoretIndex==-1){
      return response.status(400).json({error: '🤣 Respositorio nao existe'})
  }

  const repositore = {
          id,
          title,
          url,
          techs,
          likes: repositories[repositoretIndex].likes
  };
  repositories[repositoretIndex] = repositore;
  return response.json(repositore);


});

app.delete("/repositories/:id", (request, response) => {
  const {id} = request.params;

  // localizando indice
  const repositoreIndex = repositories.findIndex(repositore => repositore.id ==id);
  
  if (repositoreIndex >= 0){
    repositories.splice(repositoreIndex, 1);
    } 
  else{
    return response.status(400).json({error: 'Repositório nao existe'})
  }
    return response.status(204).send();

});

app.post("/repositories/:id/like", (request, response) => {
  
  const { id } = request.params;

  const repositoreIndex = repositories.findIndex(repositore => repositore.id ==id);
  
  if (repositoreIndex==-1){
    return response.status(400).json({error: '🤣 Respositorio nao existe'})
   }
  
  repositories[repositoreIndex].likes+=1;

  return response.json(repositories[repositoreIndex]);
});

module.exports = app;

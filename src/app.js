const express = require("express");
const cors = require("cors");
const {uuid} = require('uuidv4')

// const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  // TODO
   const result = request.query;

   // filtro para buscar apenas o titulo
   //const result = title
    // ? repositories.filter(repositore => repositore.title.includes(title))
     //: repositories;d
    return response.json(repositories);
});


app.post("/repositories", (request, response) => {
  // TODO
  const {title, url, techs} = request.body;
  // para criar um id universal
  const repositore = {id:uuid(),title, url,techs}
  repositories.push(repositore)
  return response.json(repositore)

});



app.put("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params;

  const {title,url,techs} = request.body;
  // buncando id do projeto
  const repositoretIndex = repositories.findIndex(repositore => repositore.id ==id);
  if (repositoretIndex < 0){
      return response.status(400).json({erro: '🤣 Errou'})
  }

  const repositore = {
          id,
          title,
          url,
          techs
  };
  repositories[repositoretIndex] = repositore;
  return response.json(repositore);


});

app.delete("/repositories/:id", (request, response) => {
  // TODO
  const {id} = request.params;

  const repositoreIndex = repositories.findIndex(repositore => repositore.id ==id);
  if (repositoreIndex < 0){
      return response.status(400).json({erro: '🤣 Errou'})
  }
  
  repositories.splice(repositoreIndex, 1)
  
      return response.status(204).send('😱');

});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
  //const {id} = request.params;
  //const repositoreIndex = repositories.findIndex(repositoreIndex => repositoreIndex.id ==id);
  //if (repositoreIndex < 0){
   //   return response.status(400).json({erro: '🤣 Errou'})
  //}
  
 // repositoreIndex.like+=1;
  //repositories[repositoreIndex].likes+=1;
  //return response.json(repositoreIndex);
  //return response.status(204).send('😱sucesso');
  const { id } = request.params;

  const repository = repositories.find( repository => repository.id === id );
  
  if (!repository)
    return response.status(400).json({ error: "Repository not found." });
  
    repository.likes=+1;

  return response.json(repository);
});

module.exports = app;

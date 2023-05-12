


const express = require('express')
var bodyParser = require('body-parser')
const bp = require('body-parser')
const app = express()
const port = 3000
var numero_candidat = "1";
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// app.post('/', (req, res) => {
//   // numero_candidat = connexion_pool(req.body.value)
//   const pool = new Pool({
//         user: 'postgres',
//         host: 'localhost',
//         database: 'semaine_eiffel',
//         password: 'postgres',
//         port: 5433,
//   })
//   const ajout_particpant = "INSERT INTO participant (numero_zoom) VALUES ('"+req.body.value+"');SELECT id FROM participant order by id DESC LIMIT 1";
//   pool.query(ajout_particpant, (err, rep) => {
//     if (err) {
//       console.error(err);
//       return;
//     }
//     console.log('La modification a été effectuée avec succès !');
//     for (let row of rep[1].rows) {
//       numero_candidat = row['id'];
//     }
//     console.log(numero_candidat)
//     pool.end()
  
//     })

//     res.send(numero_candidat.toString())
// })

app.post('/', (req, res) => {
  // numero_candidat = connexion_pool(req.body.value)
  const pool = new Pool({
        user: 'postgres',
        host: 'localhost',
        database: 'semaine_eiffel',
        password: 'postgres',
        port: 5433,
  })
  const ajout_particpant = "INSERT INTO participant (numero_zoom) VALUES ('"+req.body.value+"');SELECT id FROM participant order by id DESC LIMIT 1";
  pool.query(ajout_particpant)
  .then((rep) => {
    console.log('La modification a été effectuée avec succès !');
    for (let row of rep[1].rows) {
      numero_candidat = row['id'];
    }    
    pool.end()
    res.send(numero_candidat.toString())
  }).catch((err)=> console.error(err))
    

    
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


const {Pool, Client} = require('pg');

function connexion_pool(valeur){
    const pool = new Pool({
        user: 'postgres',
        host: 'localhost',
        database: 'semaine_eiffel',
        password: 'postgres',
        port: 5433,
      })
    const ajout_particpant = "INSERT INTO participant (numero_zoom) VALUES ('"+valeur+"');SELECT id FROM participant order by id DESC LIMIT 1";

    let numero = "";
    
    pool.query(ajout_particpant, (err, res) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log('La modification a été effectuée avec succès !');

        for (let row of res[1].rows) {
            numero = row['id'];
        }
        
        pool.end()
      })
    console.log(numero);
    return numero;
    
}
app.use(express.static('.'));

app.get('/', (req, res) => {
    res.sendFile('./index.html');
})

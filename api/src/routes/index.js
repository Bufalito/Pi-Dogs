const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Dog, Temperament } = require("../db");
const axios = require('axios');
const { api_key } = process.env;

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


//Aca me traigo la info de la api.
const getApiInfo = async () => {
    const apiUrl = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${api_key}`)
    //console.log(apiUrl)
    const apiInfo = apiUrl.data.map(el => {
        return {
            name: el.name,
            height: el.height.metric,
            weight: el.weight.metric,
            //breed_group: el.breed_group,
            life_span: el.life_span,
            url_image: el.image.url,
            temperaments: el.temperament

        }
    });
    //console.log(apiInfo)
    return apiInfo;
};
//getApiInfo()

//Aca me traigo la info de la base de datos.
const getDbInfo = async () => {
    return await Dog.findAll({
        includes: {
            model: Temperament,
            attributes: ["name"],
            through: {
                attributes: "",
            }
        }
    })
}

//Aca me traigo todos los perros.
const getAllDogs = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = apiInfo.concat(dbInfo); //Me devuelve un arreglo con toda la info solicitada, tanto de la api como de la base de datos.

    //console.log(infoTotal);
    return infoTotal;
}
//getAllDogs()


//GET /dogs.
router.get("/dogs", async (req, res) => {
    const name = req.query.name; //Busco si hay un query con propiedad name.

    var dogsTotal = await getAllDogs();
    if (name) {
        var dogsName = await dogsTotal.filter(el => el.name.toLowerCase().includes(name.toLowerCase()))
        dogsName.length ?
            res.status(200).send(dogsName) :
            res.status(404).send("No existe la raza solicitada")
    } else {
        res.status(200).send(dogsTotal);
    }

})

/* //GET/dogs?name="..."
router.get(`/dogs?name="..."`, async (req, res) => {
    Esta esta echa en la misma ruta principal porque la fomra de query siempre va a ser igual.
}) */

//GET/dogs/{idRaza}
router.get("/dogs/{idRaza}", (req, res) => {

})

//GET/temperament
router.get("/temperament", async (req, res) => {
    const temperamentApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${api_key}`)//me traje toda la info de la api

    const temperament = temperamentApi.data.map(el => el.temperament
    )
        
    var asd = function join(arr) {
        var newArray = []
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] !== undefined) {

                newArray = newArray.concat(arr[i].split(", "))
            }
        }
        console.log(newArray)
        return newArray
    }

    var daleKeVa = asd(temperament)

    let result = daleKeVa.filter((item, index) => {
        return daleKeVa.indexOf(item) === index;
    })
    console.log(result);

    for (var i = 0; i < result.length; i++) {
        const temp = await Temperament.create({
            name: result[i]
        })
    }

    res.send(result)
})

//POST/dog
router.post("/dog", async (req, res) => {
    /*  const { name, altura, peso, añosDeVida } = req.body,
 
     const dog = await Dog.create({
         name: name,
         altura: altura,
         peso: peso,
         añosDeVida: añosDeVida,
     })
 
     await dog.addTemperament(Temperament);//aca hay un temita con temprament.
     res.status(200).send("Perro creado con exito");
  */
})

module.exports = router;

const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Dog, Temperament } = require("../db");
const axios = require('axios');
const { api_key } = process.env;

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


//Info de la api.
const getApiInfo = async () => {
    const apiUrl = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${api_key}`)
    //console.log(apiUrl)
    const apiInfo = apiUrl.data.map(el => {

        const af = el.weight.metric.split("-")
        var aux = [];
        for (var i = 0; i < af.length; i++) {
            if (Number(af[i])) {
                aux.push(Number(af[i]));
                aux;
            }
        }
        function abc(aux) {
            if (aux.length === 1) {
                const valorUnico = aux[0];
                return valorUnico;
            } else {
                const suma = aux[0] + aux[1];
                suma;
                const valor = suma / 2;
                return valor;
            }
        }

        return {
            id: el.id,
            name: el.name,
            height: el.height.metric,
            weight: el.weight.metric,

            life_span: el.life_span,
            url_image: el.image.url,
            temperaments: el.temperament,

            promedio: abc(aux)

        }
    });
    //console.log(apiInfo)
    return apiInfo;
};
//getApiInfo()

//Info de la base de datos.
const getDbInfo = async () => {
    const dbDogs = await Dog.findAll({
        attributes: [
            "name",
            "id",
            "createdInDb",
            "url_image",
            "life_span",
            "weight",
            "height",

        ],
        include: {
            model: Temperament,
            as: "temperaments",
            attributes: ["name"],
            through: {
                attributes: [],
            },
        },
    });

    /* console.log("subcero",dbDogs[0]) */


    const dbDogstoJson = dbDogs.map((dog) => dog.toJSON());
    /* console.log("json", dbDogstoJson) */
    dbDogstoJson.forEach(perro =>
        perro.temperaments = perro.temperaments.map(e => e.name).join(", ")
    )

    /* console.log("te estas haceindo odiar temperamento", dbDogstoJson) */
    return dbDogstoJson

}


//Todos los perros.
const getAllDogs = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = apiInfo.concat(dbInfo); //Info Db y Api

    //console.log(infoTotal);
    return infoTotal;
}

//GET /dogs.
router.get("/dogs", async (req, res) => {
    const name = req.query.name; //query => ?name = "..."

    var dogsTotal = await getAllDogs(); //getAllDogs() = [(todos los perros)]

    if (name) {

        var dogsName = await dogsTotal.filter(el => el.name.toLowerCase().includes(name.toLowerCase()))//Filtro los coincidentes con query.
        dogsName.length ?
            res.status(200).send(dogsName) :
            res.status(404).send("No existe la raza solicitada")
    } else {
        res.status(200).send(dogsTotal);//Todos los perros.
    }

})

//GET/dogs/{idRaza}
router.get("/dogs/:id", async (req, res) => {
    const { id } = req.params;

    const razaApi = await getAllDogs();
    //console.log(razaApi)
    if (id) {
        const raza = razaApi.filter(e => e.id == id)
        raza.length ?
            res.status(200).json(raza) :
            res.status(404).send("No se encontro raza")
    }

})



//GET/temperament
router.get("/temperament", async (req, res) => {
    const temperamentApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${api_key}`)//me traje toda la info de la api

    const temperament = temperamentApi.data.map(el => el.temperament
    ) //En una variable me guardo todos los temperamentos que existen en la api.(Tengo un array que cada elemento es una cadena de strings con muchso temperamentos)
    // console.log(temperament)

    var asd = function join(arr) {
        var newArray = []
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] !== undefined) {

                newArray = newArray.concat(arr[i].split(", "))
            }
        }
        //console.log(newArray)
        return newArray
    }

    //Con la funcion join me creo un array global que contenga a todos los temperamentos que existen concatenando a un array vacio el resultado de splitear cada cadena de string en sus comas. Si no estuviera el concat esto devolveria un array de muchos arrays.

    var daleKeVa = asd(temperament) //Me guardo en una variable la ejecucion de la funcion join, pasandole como argumento temperament.
    //console.log(daleKeVa)

    daleKeVa.forEach(el => {
        Temperament.findOrCreate({
            where: {
                name: el,
            }
        })
    })

    const temperamentosTodos = await Temperament.findAll();
    res.send(temperamentosTodos);

})

//POST/dog
router.post("/dog", async (req, res) => {
    const { name, height, weight, life_span, createdInDb, temperament, url_image } = req.body;

    //console.log(name)


    //console.log("post temp", temperament)

    const dogCreated = await Dog.create({
        name, height, weight, life_span, createdInDb, url_image
    });

    const temperamentDb = await Temperament.findAll({
        where: {
            name: temperament
        }
    });
    //console.log("tempdb", temperamentDb)

    dogCreated.addTemperament(temperamentDb);


    res.status(200).send(dogCreated);
    //console.log("asdasd", dogCreated)


});

module.exports = router;

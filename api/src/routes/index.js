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

        /* const suma = Number(el.weight.metric.split("-")[0]) + Number(el.weight.metric.split("-")[1])
        const promedio = suma / 2 */
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
            //breed_group: el.breed_group,
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

//Aca me traigo la info de la base de datos.
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

    var dogsTotal = await getAllDogs(); //Me guardo en una variable el resultado de ejecutar la funcion que me trae a todos los perros
    if (name) { //Ahora me pregunto si tengo un nombre por query.
        var dogsName = await dogsTotal.filter(el => el.name.toLowerCase().includes(name.toLowerCase()))//Si tengo un nombre por query me guardo en una variable los nombres que coincidan en el filtrado de todos los perros en general.
        dogsName.length ? // Y me pregunto, si existe el nombre dado lo mando con un status 200 y si no me devuelve un mensaje de error.
            res.status(200).send(dogsName) :
            res.status(404).send("No existe la raza solicitada")
    } else {
        res.status(200).send(dogsTotal);//Si no me proporcionan nombre por query me traigo a todos los perros.
    }

})

/* //GET/dogs?name="..."
router.get(`/dogs?name="..."`, async (req, res) => {
    Esta esta echa en la misma ruta principal porque la forma de query siempre va a ser igual.
}) */



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

    //Investigar .flat()

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
    console.log(daleKeVa)

    daleKeVa.forEach(el => {
        Temperament.findOrCreate({
            where: {
                name: el,
            }
        })//Aca le digo que al array de strings que tengo que lo itere y que por cada uno busque si lo tiene y que si no lo cree en la base de datos, pasandole por nombre cada elemento iterado.
    })

    const temperamentosTodos = await Temperament.findAll();//Aca voy a buscar todos los temperamentos que tengo en mi base de datos.
    res.send(temperamentosTodos);//Mando todo mis temperamentos.

})

//POST/dog
router.post("/dog", async (req, res) => {
    const { name, height, weight, life_span, createdInDb, temperament, url_image } = req.body;

    /*  console.log(name) */


    /*   console.log("post temp", temperament) */

    const dogCreated = await Dog.create({
        name, height, weight, life_span, createdInDb, url_image
    });

    /*   console.log("1, : ", res); */

    const temperamentDb = await Temperament.findAll({
        where: {
            name: temperament
        }
    });
    console.log("tempdb", temperamentDb)

    dogCreated.addTemperament(temperamentDb);


    res.status(200).send(dogCreated);
    console.log("asdasd", dogCreated)


});

module.exports = router;

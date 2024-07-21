import pool from './db.js';

//realizar consultas a la db
const consultarDB = (consulta) => {
    return new Promise(async (resolve, reject) => {
        try {
            let result = await pool.query(consulta);
            resolve(result);
        } catch (error) {
            console.log(error);
            reject("No se pudo traer los registros.");
        }
    });
};

//agregar nueva canción a la db
const nuevaCancion = async (titulo, artista, tono) => {
    try {
        //consulta parametrizada
        const query = {
            text: "INSERT INTO canciones (titulo, artista, tono) VALUES ($1, $2, $3) RETURNING id, titulo, artista, tono",
            values: [titulo, artista, tono],
        };
        let results = await consultarDB(query);
        //respuesta
        let cancion = results.rows[0];
        return cancion;
    //captura de error    
    } catch (error) {
        console.log('Error en la consulta a la base de datos', error);
        throw new Error(`Error al intentar agregar una nueva canción: ${error.message}`);
    }
};

//obtener todas las canciones de la db
const obtenerCanciones = async () => {
    try {
        //consulta parametrizada
        let query = "SELECT * FROM canciones ORDER BY id";
        let results = await consultarDB(query);
        return results.rows;
    //captura de error     
    } catch (error) {
        console.log('Error en la consulta a la base de datos', error);
        throw new Error("Error al traer los datos de las canciones");
    }
};

//editar una canción existente en la db
const editarCancion = async (id, titulo, artista, tono) => {
    try {
        //consulta parametrizada
        const query = {
            text: "UPDATE canciones SET titulo = $1, artista = $2, tono = $3 WHERE id = $4 RETURNING id, titulo, artista, tono",
            values: [titulo, artista, tono, id],
        };
        let results = await consultarDB(query);
        return results.rows[0];
    } catch (error) {
        console.log('Error en la consulta a la base de datos', error);
        throw new Error("Error al intentar actualizar la canción");
    }
};

//eliminar una canción de la db
const eliminarCancion = async (id) => {
    try {
        //consulta parametrizada
        const query = {
            text: "DELETE FROM canciones WHERE ID = $1 RETURNING id",
            values: [id],
        };
        let result = await consultarDB(query);
        return result.rowCount > 0;
    } catch (error) {
        console.log(error);
        throw new Error("Error al intentar eliminar la canción.");
    }
};

//exportación de operaciones
export default {
    nuevaCancion,
    obtenerCanciones,
    editarCancion,
    eliminarCancion
};
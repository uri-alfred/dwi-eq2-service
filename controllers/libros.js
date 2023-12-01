
function ControllerLibro(repository) {
    return {
        obtenerLibros: async () => {
            return await repository.getAll();
        },
        obtenerLibroPorId: async (id) => {
            console.log("Llega al controller:", id)
            return await repository.getById(id);
        },
        agregarLibro: async (params) => {
            await repository.create(
                {
                    "titulo_lib": params.titulo,
                    "anio_lib": params.anio,
                    "autor_lib": params.autor,
                    "editorial_lib": params.editorial,
                    "fk_cat": params.cat
                }
            )
        },
        actualizarLibro: async (params) => {
            const response = await repository.updateById(
                params.id,
                {
                    "titulo_lib": params.titulo,
                    "anio_lib": params.anio,
                    "autor_lib": params.autor,
                    "editorial_lib": params.editorial,
                    "fk_cat": params.cat
                },
            )
            console.log(response);
        },
        eliminarLibro: async (id) => {
            const response = await repository.deleteById(id);
            console.log(response);
        }
    }
}

module.exports = ControllerLibro;
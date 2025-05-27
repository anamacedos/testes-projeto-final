//Função para inserir no banco de dados um novo ingrediente
const insertIngrediente = async function(ingrediente){
    try {
        let sql = `insert into tbl_ingrediente(
                                        nome
        )values(
                '${ingrediente.nome}'
        )`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else 
            return false
    } catch (error) {
        console.log(error)
    }
}

//Função para listar todos os ingredientes ja existentes
const selectAllIngrediente = async function (ingrediente){
    try {
        let sql = `select * from tbl_ingrediente order by id desc`
        let result = await prisma.$queryRawUnsafe(sql)

        if (result)
            return result
        else
            return false
    } catch (error) {
        return false
    }
}

//Função para buscar um ingrediente no banco de dados com base no seu id
const selectByIdIngrediente = async function(id){
    try {
        let sql = `select * from tbl_ingrediente where id = ${id}`
        let result = await prisma.$queryRawUnsafe(sql)
        if(result)
            return result
        else 
            return false
    } catch (error) {
        return false
    }
}

//Função para buscar um ingrediente no banco de dados com base no seu nome
const selectByNameIngrediente = async function(nome){
    try {
        let sql = `select * from tbl_ingrediente where nome = ${nome}`
        let result = await prisma.$queryRawUnsafe(sql)
        if(result)
            return result
        else 
            return false
    } catch (error) {
        return false
    }
}

//Função para deletar no banco um ingrediente
const deleteIngrediente = async function(id){
    try {
        let sql = `delete from tbl_ingrediente where id = ${id}`
        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else 
            return false
    } catch (error) {
        return false
    }
}

//Função para atualizar no banco um Ingrediente
const updateIngrediente = async function(ingrediente){
    try {
        let sql = `update tbl_ingrediente set nome = ${ingrediente.nome} where id = ${ingrediente.id}`
        let result = prisma.$executeRawUnsafe(sql)
        if(result)
            return true
        else 
            return false
    } catch (error) {
        console.log(error)
        return false
    }
}

module.exports = {
    insertIngrediente,
    selectAllIngrediente,
    selectByIdIngrediente,
    selectByNameIngrediente,
    deleteIngrediente,
    updateIngrediente
}
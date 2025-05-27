//Função para inserir no banco de dados uma nova quantidade
const insertQuantidade = async function(quantidade){
    try {
        let sql = `insert into tbl_quantidade(
                                        nome
        )values(
                '${quantidade.nome}'
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


//Função para listar todas as quantidades existentes
const selectAllQuantidade = async function (quantidade){
    try {
        let sql = `select * from tbl_quantidade order by id desc`
        let result = await prisma.$queryRawUnsafe(sql)

        if (result)
            return result
        else
            return false
    } catch (error) {
        return false
    }
}

//Função para buscar uma quantidade no banco de dados com base no seu id
const selectByIdQuantidade = async function(id){
    try {
        let sql = `select * from tbl_quantidade where id = ${id}`
        let result = await prisma.$queryRawUnsafe(sql)
        if(result)
            return result
        else 
            return false
    } catch (error) {
        return false
    }
}

//Função para buscar uma quantidade no banco de dados com base no seu nome
const selectByNameQuantidade = async function(nome){
    try {
        let sql = `select * from tbl_quantidade where nome = ${nome}`
        let result = await prisma.$queryRawUnsafe(sql)
        if(result)
            return result
        else 
            return false
    } catch (error) {
        return false
    }
}

//Função para deletar no banco uma quantidade
const deleteQuantidade = async function(id){
    try {
        let sql = `delete from tbl_quantidade where id = ${id}`
        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else 
            return false
    } catch (error) {
        return false
    }
}


//Função para atualizar no banco uma quantidade
const updateQuantidade = async function(quantidade){
    try {
        let sql = `update tbl_quantidade set sexo = ${quantidade.nome} where id = ${quantidade.id}`
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
    insertQuantidade,
    selectAllQuantidade,
    selectByIdQuantidade,
    selectByNameQuantidade,
    deleteQuantidade,
    updateQuantidade
}
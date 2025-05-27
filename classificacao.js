//Função para inserir no banco de dados uma nova classificação
const insertClassificacao = async function(classificacao){
    try {
        let sql = `insert into tbl_classificacao(
                                        nome
        )values(
                '${classificacao.nome}'
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

//Função para listar todas as classificações ja existentes
const selectAllClassificacao = async function (classificacao){
    try {
        let sql = `select * from tbl_classificacao order by id desc`
        let result = await prisma.$queryRawUnsafe(sql)

        if (result)
            return result
        else
            return false
    } catch (error) {
        return false
    }
}

//Função para buscar uma classificacao no banco de dados com base no seu id
const selectByIdClassificacao = async function(id){
    try {
        let sql = `select * from tbl_classificacao where id = ${id}`
        let result = await prisma.$queryRawUnsafe(sql)
        if(result)
            return result
        else 
            return false
    } catch (error) {
        return false
    }
}

//Função para buscar uma classificacao no banco de dados com base no seu nome
const selectByNameClassificacao = async function(nome){
    try {
        let sql = `select * from tbl_classificacao where nome = ${nome}`
        let result = await prisma.$queryRawUnsafe(sql)
        if(result)
            return result
        else 
            return false
    } catch (error) {
        return false
    }
}

//Função para deletar no banco uma classificacao
const deleteClassificacao = async function(id){
    try {
        let sql = `delete from tbl_classificacao where id = ${id}`
        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else 
            return false
    } catch (error) {
        return false
    }
}

//Função para atualizar no banco uma classificacao
const updateClassificacao = async function(classificacao){
    try {
        let sql = `update tbl_classificacao set nome = ${classificacao.nome} where id = ${classificacao.id}`
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
    insertClassificacao,
    selectAllClassificacao,
    selectByIdClassificacao,
    selectByNameClassificacao,
    deleteClassificacao,
    updateClassificacao
}
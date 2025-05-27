//Chamar o DAO de classificação aqui em cima e não esquecer de chama-la de "classificacaoDAO"
//Chamar o arquivo de mensagens como "MESSAGE"

//Função para inserir uma nova classificação
const insertClassificacao = async function (classificacao, contentType){
    try {
        if(contentType == 'application/json'){
            if(classificacao.nome == undefined || classificacao.nome == null || classificacao.nome == "" ){
                return MESSAGE.ERROR_REQUIRED_FIELDS
            }else{
                //encaminha os dados do novo sexo para ser inserido no banco de dados
                let resultClassificacao = await classificacaoDAO.insertClassificacao(classificacao)
                if (resultClassificacao)
                    return MESSAGE.SUCESS_CREATED_ITEM
                else
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
            }
        }else{
            return MESSAGE.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

//Função para listar todas as classificações
const listarClassificacao = async function(){
    try {
        let dadosClassificacao = {}
        let resultClassificacao = await classificacaoDAO.selectAllClassificacao()

        if(resultClassificacao != false){
            if(resultClassificacao.length > 0 || typeof(resultClassificacao == 'object')){

                //definindo os dados do objeto json que será retornado
                dadosClassificacao.status = true
                dadosClassificacao.status_code = 200
                dadosClassificacao.item = resultClassificacao.length
                dadosClassificacao.classificacoes = resultClassificacao

                return dadosClassificacao
            }else{
                return MESSAGE.ERROR_NOT_FOUND
            } 
        }else{
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}


//Função para listar a classificação com base no id
const buscarClassificacaoPeloId = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id<=0){
            return MESSAGE.ERROR_REQUIRED_FIELDS
        }else{
            let dadosClassificacao = {}
            let resultClassificacao = await classificacaoDAO.selectByIdClassificacao(parseInt(id))

            if (resultClassificacao != false){
                if(resultClassificacao.length > 0 || typeof(resultClassificacao) == 'object'){
                    //cria um objeto do tipo json para retornar a lista de jogos (o jogo)
                    dadosClassificacao.status = true
                    dadosClassificacao.status_code = 200
                    dadosClassificacao.classificacao = resultClassificacao

                    return dadosClassificacao
                }else{
                    return MESSAGE.ERROR_NOT_FOUND
                }
            }else{
                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
            }
        }
    } catch (error) {
        console.log(error)
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

//Função para listar a classificação com base no id
const buscarClassificacaoPeloNome = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id<=0){
            return MESSAGE.ERROR_REQUIRED_FIELDS
        }else{
            let dadosClassificacao = {}
            let resultClassificacao = await classificacaoDAO.selectByNameClassificacao(parseInt(id))

            if (resultClassificacao != false){
                if(resultClassificacao.length > 0 || typeof(resultClassificacao) == 'object'){
                    //cria um objeto do tipo json para retornar a lista de jogos (o jogo)
                    dadosClassificacao.status = true
                    dadosClassificacao.status_code = 200
                    dadosClassificacao.classificacao = resultClassificacao

                    return dadosClassificacao
                }else{
                    return MESSAGE.ERROR_NOT_FOUND
                }
            }else{
                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
            }
        }
    } catch (error) {
        console.log(error)
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

//Função para deletar uma classificação
const deleteClassificacao = async function(id){
    try {
        if(id == "" || id == undefined || id == null || isNaN(id) || id<=0){
            return MESSAGE.ERROR_REQUIRED_FIELDS
            }else{
                let resultClassificacao = await classificacaoDAO.selectByIdClassificacao(parseInt(id))
                if(resultClassificacao != false || typeof resultClassificacao == 'object'){
                    if(resultClassificacao.length > 0 ){
                        let result = await classificacaoDAO.deleteClassificacao(parseInt(id))

                        if(result)
                            return MESSAGE.SUCESS_DELETED_ITEM
                        else
                            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
                    }else{
                        return MESSAGE.ERROR_NOT_FOUND
                    }
                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
                }
            }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

//Função para atualizar uma classificacao
const updateClassificacao = async function(classificacao, id, contentType){
    try {
        if(contentType == 'application/json'){
            if(classificacao.nome == undefined || classificacao.nome == null || classificacao.nome == "" ){
                return MESSAGE.ERROR_REQUIRED_FIELDS
            }else{
                //validar se o id existe no banco
                let resultClassificacao = await classificacaoDAO.selectByIdClassificacao(parseInt(id))
                if(resultClassificacao.status_code == 200){
                    //adiciona o atributo id no json para encaminhar o id da requisição
                    classificacao.id = parseInt(id)
                    let result = await sexoDAO.updateClassificacao(classificacao)

                    if(result)
                        return MESSAGE.SUCESS_UPDATED_ITEM
                    else
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
                }else if(resultClassificacao.status_code == 404){
                    return MESSAGE.ERROR_NOT_FOUND
                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
                }
            }
        }else{
            return MESSAGE.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

module.exports = {
    insertClassificacao,
    listarClassificacao,
    buscarClassificacaoPeloId,
    buscarClassificacaoPeloNome,
    deleteClassificacao,
    updateClassificacao
}
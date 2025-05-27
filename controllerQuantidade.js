//Chamar o DAO de quantidade aqui em cima e não esquecer de chama-la de "quantidadeDAO"
//Chamar o arquivo de mensagens como "MESSAGE"

//Função para inserir uma nova quantidade
const insertQuantidade = async function (quantidade, contentType){
    try {
        if(contentType == 'application/json'){
            if(quantidade.nome == undefined || quantidade.nome == null || quantidade.nome == "" ){
                return MESSAGE.ERROR_REQUIRED_FIELDS
            }else{
                //encaminha os dados do novo sexo para ser inserido no banco de dados
                let resultQuantidade = await quantidadeDAO.insertQuantidade(quantidade)
                if (resultQuantidade)
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

//Função para listar todas as quantidades
const listarQuantidade = async function(){
    try {
        let dadosQuantidade = {}
        let resultQuantidade = await quantidadeDAO.selectAllQuantidade()

        if(resultQuantidade != false){
            if(resultQuantidade.length > 0 || typeof(resultQuantidade == 'object')){

                //definindo os dados do objeto json que será retornado
                dadosQuantidade.status = true
                dadosQuantidade.status_code = 200
                dadosQuantidade.item = resultQuantidade.length
                dadosQuantidade.quantidades = resultQuantidade

                return dadosQuantidade
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

//Função para listar a quantidade com base no id
const buscarQuantidadePeloId = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id<=0){
            return MESSAGE.ERROR_REQUIRED_FIELDS
        }else{
            let dadosQuantidade = {}
            let resultQuantidade = await quantidadeDAO.selectByQuantidade(parseInt(id))

            if (resultQuantidade != false){
                if(resultQuantidade.length > 0 || typeof(resultQuantidade) == 'object'){
                    //cria um objeto do tipo json para retornar a lista de jogos (o jogo)
                    dadosQuantidade.status = true
                    dadosQuantidade.status_code = 200
                    dadosQuantidade.quantidade = resultQuantidade

                    return dadosQuantidade
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

//Função para listar a quantidade com base no nome
const buscarQuantidadePeloNome = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id<=0){
            return MESSAGE.ERROR_REQUIRED_FIELDS
        }else{
            let dadosQuantidade = {}
            let resultQuantidade = await quantidadeDAO.selectByNameQuantidade(parseInt(id))

            if (resultQuantidade != false){
                if(resultQuantidade.length > 0 || typeof(resultQuantidade) == 'object'){
                    //cria um objeto do tipo json para retornar a lista de jogos (o jogo)
                    dadosQuantidade.status = true
                    dadosQuantidade.status_code = 200
                    dadosQuantidade.quantidade = resultQuantidade

                    return dadosQuantidade
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

//Função para deletar uma quantidade
const deleteQuantidade = async function(id){
    try {
        if(id == "" || id == undefined || id == null || isNaN(id) || id<=0){
            return MESSAGE.ERROR_REQUIRED_FIELDS
            }else{
                let resultQuantidade = await quantidadeDAO.selectByQuantidade(parseInt(id))
                if(resultQuantidade != false || typeof resultQuantidade == 'object'){
                    if(resultQuantidade.length > 0 ){
                        let result = await quantidadeDAO.deleteQuantidade(id)

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


//Função para atualizar uma quantidade
const updateQuantidade = async function(quantidade, id, contentType){
    try {
        if(contentType == 'application/json'){
            if(quantidade.nome == undefined || quantidade.nome == null || quantidade.nome == "" ){
                return MESSAGE.ERROR_REQUIRED_FIELDS
            }else{
                //validar se o id existe no banco
                let resultQuantidade = await buscarQuantidadePeloId(parseInt(id))
                if(resultQuantidade.status_code == 200){
                    //adiciona o atributo id no json para encaminhar o id da requisição
                    quantidade.id = parseInt(id)
                    let result = await quantidadeDAO.updateQuantidade(quantidade)

                    if(result)
                        return MESSAGE.SUCESS_UPDATED_ITEM
                    else
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
                }else if(resultSexo.status_code == 404){
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
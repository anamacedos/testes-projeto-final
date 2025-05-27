//Chamar o DAO de ingrediente aqui em cima e não esquecer de chama-la de "ingredienteDAO"
//Chamar o arquivo de mensagens como "MESSAGE"


//Função para inserir um novo ingrediente
const insertIngrediente = async function (ingrediente, contentType){
    try {
        if(contentType == 'application/json'){
            if(ingrediente.nome == undefined || ingrediente.nome == null || ingrediente.nome == ""){
                return MESSAGE.ERROR_REQUIRED_FIELDS
            }else{
                //encaminha os dados do novo sexo para ser inserido no banco de dados
                let resultIngrediente = await ingredienteDAO.insertIngrediente(ingrediente)
                if (resultIngrediente)
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

//Função para listar todos os ingredientes
const listarIngrediente = async function(){
    try {
        let dadosIngredientes = {}
        let resultIngrediente = await ingredienteDAO.selectAllIngrediente()

        if(resultIngrediente != false){
            if(resultIngrediente.length > 0 || typeof(resultIngrediente == 'object')){

                //definindo os dados do objeto json que será retornado
                dadosIngredientes.status = true
                dadosIngredientes.status_code = 200
                dadosIngredientes.item = resultIngrediente.length
                dadosIngredientes.ingredientes = resultIngrediente

                return dadosIngredientes
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

//Função para listar o ingrediente com base no id
const buscarIngredientePeloId = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id<=0){
            return MESSAGE.ERROR_REQUIRED_FIELDS
        }else{
            let dadosIngrediente= {}
            let resultIngrediente = await ingredienteDAO.selectByIdIngrediente(parseInt(id))

            if (resultIngrediente != false){
                if(resultIngrediente.length > 0 || typeof(resultIngrediente) == 'object'){
                    //cria um objeto do tipo json para retornar a lista de jogos (o jogo)
                    dadosIngrediente.status = true
                    dadosIngrediente.status_code = 200
                    dadosIngrediente.ingrediente = resultIngrediente

                    return dadosIngrediente
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

//Função para listar o ingrediente com base no nome
const buscarIngredientePeloNome = async function(nome){
    try {
        if(nome == '' || nome == undefined || nome == null ){
            return MESSAGE.ERROR_REQUIRED_FIELDS
        }else{
            let dadosIngrediente = {}
            let resultIngrediente = await ingredienteDAO.selectByNameIngrediente(nome)

            if (resultIngrediente != false){
                if(resultIngrediente.length > 0 || typeof(resultIngrediente) == 'object'){
                    //cria um objeto do tipo json para retornar a lista de jogos (o jogo)
                    dadosIngrediente.status = true
                    dadosIngrediente.status_code = 200
                    dadosIngrediente.quantidade = resultIngrediente

                    return dadosIngrediente
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

//Função para deletar um ingrediente
const deleteIngrediente = async function(id){
    try {
        if(id == "" || id == undefined || id == null || isNaN(id) || id<=0){
            return MESSAGE.ERROR_REQUIRED_FIELDS
            }else{
                let resultIngrediente = await ingredienteDAO.selectByIdIngrediente(parseInt(id))
                if(resultIngrediente != false || typeof resultIngrediente == 'object'){
                    if(resultIngrediente.length > 0 ){
                        let result = await ingredienteDAO.deleteIngrediente(id)

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

//Função para atualizar um ingrediente
const updateIngrediente = async function(ingrediente, id, contentType){
    try {
        if(contentType == 'application/json'){
            if(ingrediente.nome == undefined || ingrediente.nome == null || ingrediente.nome == "" ){
                return MESSAGE.ERROR_REQUIRED_FIELDS
            }else{
                //validar se o id existe no banco
                let resultIngrediente = await ingredienteDAO.selectByIdIngrediente(parseInt(id))
                if(resultIngrediente.status_code == 200){
                    //adiciona o atributo id no json para encaminhar o id da requisição
                    ingrediente.id = parseInt(id)
                    let result = await ingredienteDAO.updateIngrediente(ingrediente)

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


module.exports = {
    insertIngrediente,
    listarIngrediente,
    buscarIngredientePeloId,
    buscarIngredientePeloNome,
    deleteIngrediente,
    updateIngrediente
}
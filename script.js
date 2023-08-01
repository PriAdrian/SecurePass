// Algoritmo
// OK 1. Pegar os valores dos inputs
// OK 2. Fazer o calculador do IMC -> valorImc
// OK 3. Gerar a classificação IMC -> classificacaoImc
// OK 4. Organizar os dados do usuário para salvar na lista e gerar a data de cadastro
// OK 5. Inserir o usuario na lista (salvar no localStorage)
//      6. Função para carregar os usuários (localStorage), chamar ao carregar a página
//      7. Renderizar o conteúdo da tabela com os usuários cadastrados
// OK    6. Função para carregar os usuários (localStorage), chamar ao carregar a página
// OK    7. Renderizar o conteúdo da tabela com os usuários cadastrados
// 8. Botão para limpar os registros (localStorage)


função  calcular ( evento )  {
    // Previne o recarregar da página
    evento . prevenirPadrão ( )
    console . log ( "Foi executada a função calcular" )
    // Passo 1
    let  usuario  =  receberValores ( )
    // Passo 2
    let  imcCalculado  =  calcularImc ( usuario . altura ,  usuario . peso )
    // Passo 3
    let  classificacaoImc  =  classificarImc ( imcCalculado )
    console . log ( classificaçãoImc )
    // Passo 4
    usuario  =  organizaDados ( usuario ,  imcCalculado ,  classificacaoImc )

    // Passo 5
    cadastrarUsuario ( usuario )

    // Esse
    carregarUsuarios ( )


    // Ou
    // window.location.reload()

}

função  receberValores ( )  {
    let  nomeRecebido  =  document . getElementById ( "nome" ) . valor . aparar ( )
    let  alturaRecebida  =  document . getElementById ( "altura" ) . valor
    let  pesoRecebido  =  document . getElementById ( "peso" ) . valor
    let  dadosUsuario  =  {
        nome : nomeRecebido ,
        altura : alturaRecebida ,
        peso : pesoRecebido
    }
    console . log ( dadosUsuario )
    retornar  dadosUsuario
}
função  calcularImc ( altura ,  peso )  {
    deixe  imc  =  peso  /  ( altura  *  altura )
    console . registro ( imc )
    retornar  imc
}
função  classificarImc ( imc )  {
    /*
    Resultado Situação
    Abaixo de 18.5 Abaixo do peso
    Entre 18,5 e 24,99 Peso normal
    Entre 25 e 29.99 Sobrepeso
    Acima de 30 Obesidade    
    */
    if  ( imc  <  18,5 )  {
        voltar  "Abaixo do peso"
    }  else  if  ( imc  >=  18,5  &&  imc  <  25 )  {
        return  "Peso normal"
    }  else  if  ( imc  >=  25  &&  imc  <  30 )  {
        voltar  "Sobrepeso"
    }  senão  {
        voltar  "Obesidade"
    }
}
function  organizarDados ( dadosUsuario ,  valorImc ,  classificacaoImc )  {
    // Pegar um dataHoraAtual
    let  dataHoraAtual  =  new  Intl . DateTimeFormat ( 'pt-BR' ,  {  timeStyle : 'long' ,  dateStyle : 'short'  } ) . formato ( Data . agora ( ) )
    console . log ( dataHoraAtual ) ;
    // Organizando o objeto para salvar
    let  dadosUsuarioAtualizado  =  {
        ... dadosUsuario ,
        imc : valorImc ,
        situacaoImc : classificacaoImc ,
        dataCadastro : dataHoraAtual
    }
    return  dadosUsuarioAtualizado ;
}
função  cadastrarUsuario ( dadosUsuario )  {
    let  listaUsuarios  =  [ ]
    // Se houver uma lista de usuários no localStorage, carregue isso para uma lista variável de usuários
    if  ( localStorage . getItem ( "usuáriosCadastrados" )  !=  null )  {
        listaUsuarios  =  JSON . parse (  localStorage . getItem ( "usuáriosCadastrados" )  )
    }
    // Adiciona o usuário na lista de usuários
    listaUsuarios . push ( dadosUsuario )
    // Salva a listaUsuarios no localStorage
    localStorage . setItem ( "usuáriosCadastrados" ,   JSON . stringify ( listaUsuarios )  )
}
function  carregarUsuarios ( )  {
    let  listaCarregada  =  [ ]
    if  (  localStorage . getItem ( "usuáriosCadastrados" )  !=  null  )  {
        listaCarregada  =  JSON . parse ( localStorage . getItem ( "usuáriosCadastrados" ) )
    }
    if ( lista Carregada . length  ==  0 )  {
        // Se não tiver nenhum usuário cadastrado, mostrar mensagem
        let  tabela  =  document . getElementById ( "corpo-tabela" )

        tabela . innerHTML  =  "Nenhum usuário cadastrado"
        tabela . innerHTML  =  `<tr class="linha-mensagem">
            <td colspan="6">Nenhum usuário cadastrado ☹ </td>
        </tr>`

    }  senão  {
        // Montar conteudo da tabela
        montarTabela ( listaCarregada )
    }

    console . log ( lista Carregada )
}

janela . addEventListener ( "DOMContentLoaded" ,  ( )  =>  carregarUsuarios ( )  )

// Passo 7
function  montarTabela ( listaUsuarios )  {
    let  tabela  =  document . getElementById ( "corpo-tabela" )

    deixar  modelo  =  ""

    listaUsuarios . forEach ( usuário  =>  {
        modelo  +=  `<tr>
            <td data-cell="nome"> ${ usuario . nome } </td>
            <td data-cell="altura"> ${ usuario . altura } </td>
            <td data-cell="peso"> ${ usuario . peso } </td>
            <td data-cell="valor do IMC"> ${ usuario . imc . toFixed ( 2 ) } </td>
            <td data-cell="classificação do IMC"> ${ usuario . situacaoImc } </td>
            <td data-cell="dados de cadastro"> ${ usuario . dadosCadastro } </td>
        </tr>`
    } )

    tabela . innerHTML  =  modelo ;
}

function  deletarRegistros ( )  {
    // Remove o item do localStorage
    localStorage . removeItem ( "usuáriosCadastrados" )

    // Recarrega a página
    janela . localização . recarregar ( )
}
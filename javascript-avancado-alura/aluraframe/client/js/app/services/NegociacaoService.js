class NegociacaoService{
    obterNegociacoesDaSemana(cb){
        let xhr = new XMLHttpRequest();
        //prepara a requisicao para o endereco e metodo especificados.
        xhr.open('GET', 'negociacoes/semana');

        /* Configuracoes */
        
        /* estados da requisicao assincrona */
        /* 
            0. requisicao ainda nao iniciada.
            1. conexao estabelecida com o servidor
            2. requisicao recebida
            3. processando requisicao
            4. requisicao concluida e resposta pronta.
        */

        //Eh chamada toda vez que um estado eh mudado
        xhr.onreadystatechange = () => {
            if(xhr.readyState == 4){
                if(xhr.status == 200){
                    console.log("obtendo negociacoes do servidor.");

                    cb(null, JSON.parse(xhr.responseText)
                    .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
                }else{
                    console.log(xhr.responseText);
                    cb("Nao foi possivel obter as negociacoes", null);
                }
            }
        }

        //efetivamente exeuta a requisicao
        xhr.send();
    }
}
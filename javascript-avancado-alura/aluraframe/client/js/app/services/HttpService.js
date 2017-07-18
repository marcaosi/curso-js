class HttpService {

    

    get(url) {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            //prepara a requisicao para o endereco e metodo especificados.
            xhr.open('GET', url);

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
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        console.log("obtendo negociacoes do servidor.");

                        resolve(JSON.parse(xhr.responseText));
                    } else {
                        console.log(xhr.responseText);
                        reject(xhr.responseText);
                    }
                }
            }

            //efetivamente exeuta a requisicao
            xhr.send();
        });
    }

    post(url, dado){
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();

            xhr.open('POST', url, true);
            xhr.setRequestHeader("Content-type", "application/json");

            xhr.onreadystatechange = () => {
                if(xhr.readyState == 4){
                    if(xhr.status == 200){
                        resolve(JSON.parse(xhr.responseText));
                    }else{
                        reject(xhr.responseText);
                    }
                }
            }

            xhr.send(JSON.stringify(dado));
        });
    }
}
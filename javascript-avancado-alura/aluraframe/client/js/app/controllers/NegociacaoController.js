class NegociacaoController {

    constructor() {

        let $ = document.querySelector.bind(document);

        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
        this._ordemAtual = '';

        this._listaNegocioacoes = new Bind(
            new ListaNegociacoes(),
            new NegociacoesView($("#negociacoesView")),
            'adiciona', 'esvazia', 'ordena', 'inverteOrdem'
        );

        this._mensagem = new Bind(
            new Mensagem(),
            new MensagemView($("#mensagemView")),
            'texto'
        );
    }

    adiciona(event) {

        event.preventDefault();

        try {
            this._listaNegocioacoes.adiciona(this._criaNegociaciao());
            this._mensagem.texto = "Negociação adicionada com sucesso.";
            this._limpaFormulario();
        }catch(erro){
            this._mensagem.texto = erro;
        }
    }

    importaNegociacoes() {
        let service = new NegociacaoService();

        Promise.all([
            service.obterNegociacoesDaSemana(),
            service.obterNegociacoesDaSemanaAnterior(),
            service.obterNegociacoesDaSemanaRetrasada()
        ]
        ).then(
            negociacoes => {
                console.log(negociacoes);
                negociacoes
                    .reduce((arrayAchatado, array) => arrayAchatado.concat(array), [])
                    .forEach(negociacao => this._listaNegocioacoes.adiciona(negociacao));
                this._mensagem.texto = "Negociacoes importadas com sucesso.";
            }
            ).catch(
            error => {
                this._mensagem.texto = error;
            }
            );
    }

    apaga() {
        this._listaNegocioacoes.esvazia();
        this._mensagem.texto = "Negociações apagadas com sucesso.";
    }

    _criaNegociaciao() {
        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value
        );
    }

    _limpaFormulario() {
        this._inputData.value = "";
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;

        this._inputData.focus();
    }

    ordena(coluna) {
        if (this._ordemAtual == coluna) {
            this._listaNegocioacoes.inverteOrdem();
        } else {
            this._listaNegocioacoes.ordena((a, b) => a[coluna] - b[coluna]);
        }
        this._ordemAtual = coluna;
    }
}
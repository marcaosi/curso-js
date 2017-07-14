class NegociacaoController {
    
    constructor() {
        
        let $ = document.querySelector.bind(document);

        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

        this._listaNegocioacoes = new Bind(
            new ListaNegociacoes(),
            new NegociacoesView($("#negociacoesView")),
            'adiciona', 'esvazia'
        );
        
        this._mensagem = new Bind(
            new Mensagem(),
            new MensagemView($("#mensagemView")),
            'texto'
        );
    }
    
    adiciona(event) {
        
        event.preventDefault();
        this._listaNegocioacoes.adiciona(this._criaNegociaciao());
        this._mensagem.texto = "Negociação adicionada com sucesso.";
        this._limpaFormulario();
    }

    importaNegociacoes(){
        let service = new NegociacaoService();

        service.obterNegociacoesDaSemana((err, negociacoes) => {
            if(err){
                this._mensagem.texto = err;
                return;
            }

            negociacoes.forEach(negociacao => this._listaNegocioacoes.adiciona(negociacao));

            this._mensagem.texto = "Negociacoes importadas com sucesso.";
        });
    }

    apaga(){
        this._listaNegocioacoes.esvazia();
        this._mensagem.texto = "Negociações apagadas com sucesso.";
    }

    _criaNegociaciao(){
        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value  
        );
    }

    _limpaFormulario(){
        this._inputData.value = "";
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;

        this._inputData.focus();
    }
}
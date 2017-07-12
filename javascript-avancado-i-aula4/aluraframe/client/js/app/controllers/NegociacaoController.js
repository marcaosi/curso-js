class NegociacaoController {
    
    constructor() {
        
        let $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
        this._listaNegocioacoes = new ListaNegociacoes();
        this._negociacoesView = new NegociacoesView($("#negociacoesView"));
        this._negociacoesView.update(this._listaNegocioacoes);
        
        this._mensagem = new Mensagem();
        this._mensagemView = new MensagemView($("#mensagemView"));
        this._mensagemView.update(this._mensagem);
    }
    
    adiciona(event) {
        
        event.preventDefault();
        this._listaNegocioacoes.adiciona(this._criaNegociaciao());
        this._negociacoesView.update(this._listaNegocioacoes);

        this._mensagem.texto = "Negociação adicionada com sucesso.";
        this._mensagemView.update(this._mensagem); 
        this._limpaFormulario();
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
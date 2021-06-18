import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import './index.css';
 
class criarProduto extends Component {
    constructor(props) {
        super(props);
 
        this.state = {
            produto: {
                produto: "",
                descricao: "",
                preco: "",
                qtd_prod: "",
                ativo: "true"
            },
            erro: null,
            redirect: false
        };
    }
 
    exibeErro() {
        const { erro } = this.state;
 
        if (erro) {
            return (
                <div className="alert alert-danger" role="alert">
                    Erro de conexão com o servidor
                </div>
            );
        }
    }
 
    render() {
        const { redirect } = this.state;
        if (redirect) {
            return <Redirect to="/produto" />;
        } else {
            return (
                <form onSubmit={this.handleSubmit}>
                    <fieldset>
                        <legend>Criar Produto</legend>
                        <div className="produto-insert">
                            <label htmlFor="nome">Nome </label>
                            <br />
                            <input
                                type="text"
                                id="nome"
                                name="nome"
                                placeholder="Nome"
                                minLength="3"
                                maxLength="100"
                                required
                                value={this.state.produto.nome}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="produto-insert">
                            <label htmlFor="descricao">Descrição </label>
                            <br />
                            <input
                                type="text"
                                id="descricao"
                                name="descricao"
                                placeholder="Descricao"
                                minLength="3"
                                maxLength="100"
                                required
                                value={this.state.produto.descricao}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="produto-insert">
                            <label htmlFor="produto">Preço </label>
                            <br />
                            <input
                                type="text"
                                id="preco"
                                name="preco"
                                placeholder="Preço"
                                required
                                value={this.state.produto.preco}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="produto-insert">
                            <label htmlFor="qtd_prod">Quantidade </label>
                            <br />
                            <input
                                type="text"
                                id="qtd_prod"
                                name="qtd_prod"
                                placeholder="Quantidade"
                                required
                                value={this.state.produto.qtd_prod}
                                onChange={this.handleInputChange}
                            />
                        </div>
 
                        <div className="produto-insert">
                            <label>
                                <input
                                    type="radio"
                                    name="ativo"
                                    value="true"
                                    checked={this.state.produto.ativo === "true"}
                                    onChange={this.handleInputChange}
                                />
                                Ativo
                        </label>
                            <label>
                                <input
                                    type="radio"
                                    value="false"
                                    name="ativo"
                                    checked={this.state.produto.ativo === "false"}
                                    onChange={this.handleInputChange}
                                />
                                Inativo
                        </label>
                        </div>
 
 
                        <button type="submit" className="btn btn-primary">
                            Cadastrar
                    </button>
                    </fieldset>
                </form>
            );
        }
    }
 
    handleInputChange = event => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
 
        this.setState(prevState => ({
            produto: { ...prevState.produto, [name]: value }
        }));
        console.log(value);
    };
 
    handleSubmit = event => {
        fetch("${process.env.REACT_APP_API_URL}/", {
            method: "post",
            body: JSON.stringify(this.state.produto),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(data => {
                if (data.ok) {
                    this.setState({ redirect: true });
                } else {
                    data.json().then(data => {
                        if (data.error) {
                            this.setState({ erro: data.error });
                        }
                    });
                }
            })
            .catch(erro => this.setState({ erro: erro }));
 
        event.preventDefault();
    };
}
 
export default criarProduto;



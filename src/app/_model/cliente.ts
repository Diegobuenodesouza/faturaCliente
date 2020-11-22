import { Servico } from './servico';

export class Cliente{

    constructor(
        public CNPJ: string,
        public nomeEmpresarial: string,
        public logradouro: string,
        public numero: string,
        public cep: string,
        public bairro: string,
        public estado: string,
        public UF: string,
        public listaServico: Array<Servico>
    ){

    }
}

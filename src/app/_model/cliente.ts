import { Servico } from './servico';

export class Cliente{

    constructor(
        id: number,
        public cnpj: string,
        public nomeEmpresarial: string,
        public cep: string,
        public logradouro: string,
        public numero: string,
        public bairro: string,
        public localidade: string,
        public UF: string,
        public listaServico: Array<Servico>
    ){

    }
}

export class Servico{
    constructor(
        public descricao: string = '',
        public valor: number = 0,
        public vencimento = new Date(2020, 1 , 1)
    ){}
}

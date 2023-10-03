
export enum TipoNotificacao{
    SUCESSO,
    ATENTACAO,
    FALHA
    
}

export interface INotificacao {
    title: string
    texto: string
    tipo: TipoNotificacao
    id: number

}
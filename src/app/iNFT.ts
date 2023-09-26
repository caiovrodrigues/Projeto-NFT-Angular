export interface Nft{
  id?: number | string;
  name: string;
  description: string;
  price: number;
  qtd: number;
  comment?: [
    {
      usuario: string,
      comentario: string
    }
  ]
}

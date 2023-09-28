export interface Nft{
  id?: number | string;
  name: string;
  description: string;
  price: number;
  qtd: number;
  img_url?: string;
  comment?: [
    {
      usuario: string,
      comentario: string
    }
  ]
}

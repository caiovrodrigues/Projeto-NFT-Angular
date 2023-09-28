export interface Nft{
  id?: number | string;
  date: Date;
  name: string;
  description: string;
  price: number;
  qtd: number;
  img_url?: string;
  comment?: [
    {
      date: Date,
      usuario: string,
      comentario: string
    }
  ]
}

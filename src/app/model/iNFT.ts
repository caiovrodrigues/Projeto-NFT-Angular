export interface Nft{
  id: number;
  user: {
    id: number;
    name: string;
  }
  date: Date;
  name: string;
  description: string;
  price: number;
  qtd: number;
  urlMinio?: string;
}

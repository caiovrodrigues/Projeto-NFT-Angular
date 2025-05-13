import { Nft } from "./iNFT";

export interface PageableResponseNfts{
    content: [
        Nft
    ],
    pageable: {
        pageNumber: number;
        offset: number;
    }
    totalElements: number;
    totalPages: number;
}
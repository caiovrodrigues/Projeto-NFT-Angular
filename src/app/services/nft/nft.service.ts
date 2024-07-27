import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Nft } from '../../interfaces/iNFT';
import { Observable } from 'rxjs';
import { PageableResponseNfts } from 'src/app/interfaces/PageableResponseNfts';
import { Params } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NftService {
  
  apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getNft(id: number){
    return this.http.get<Nft>(`${this.apiUrl}/api/nft/${id}`);
  }

  getAll(): Observable<PageableResponseNfts>{
    return this.http.get<PageableResponseNfts>(`${this.apiUrl}/api/nft`);
  }

  getAllPageable(page: Params): Observable<PageableResponseNfts>{
    return this.http.get<PageableResponseNfts>(`${this.apiUrl}/api/nft`, {params: page});
  }

  post(nft: Nft): Observable<Nft>{
    return this.http.post<Nft>(`${this.apiUrl}/api/nft`, nft);
  }

  put(nft: Nft, id: number): Observable<Nft>{
    return this.http.put<Nft>(`${this.apiUrl}/api/nft/atualizar/${id}`, nft);
  }

  delete(id: number){
    return this.http.delete(`${this.apiUrl}/api/nft/${id}`);
  }

  gerarRelatorio(user_id: number): Observable<void>{
    return this.http.get<void>(`${this.apiUrl}/api/users/${user_id}/relatorio`);
  }
}

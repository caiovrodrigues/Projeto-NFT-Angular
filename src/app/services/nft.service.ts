import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Nft } from '../iNFT';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NftService {
  apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getNft(id: number){
    return this.http.get<Nft>(`${this.apiUrl}/nft/${id}`);
  }

  getAll(): Observable<Nft[]>{
    return this.http.get<Nft[]>(`${this.apiUrl}/nft`);
  }

  post(nft: Nft): Observable<Nft>{
    return this.http.post<Nft>(`${this.apiUrl}/nft`, nft);
  }

  put(nft: Nft, id: number): Observable<Nft>{
    return this.http.put<Nft>(`${this.apiUrl}/nft/atualizar/${id}`, nft);
  }

  delete(nft: Nft){
    return this.http.delete(`${this.apiUrl}/nft`, {body: nft});
  }
}

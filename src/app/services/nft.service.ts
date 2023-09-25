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

  getAll(): Observable<Nft[]>{
    return this.http.get<Nft[]>(`${this.apiUrl}/nft`);
  }

  getNft(id: number){
    return this.http.get<Nft>(`${this.apiUrl}/nft/${id}`);
  }

  delete(nft: Nft){
    return this.http.delete(`${this.apiUrl}/nft`, {body: nft});
  }
}

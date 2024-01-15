import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import Comentario from '../../interfaces/iComentario'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {

  apiUrl = 'http://localhost:8080'

  constructor(private http: HttpClient) { }

  post(comentario: Comentario, idNft: number): Observable<Comentario>{
    return this.http.post<Comentario>(`${this.apiUrl}/nft/${idNft}`, comentario);
  }

  getCommentsNft(id: number): Observable<Comentario>{
    return this.http.get<Comentario>(`${this.apiUrl}/nft/comments/${id}`);
  }
}

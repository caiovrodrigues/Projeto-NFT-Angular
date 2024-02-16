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

  postComment(nftId: number, comentario: {mensagem: string} ): Observable<Comentario>{
    return this.http.post<Comentario>(`${this.apiUrl}/api/comments/nft/${nftId}`, comentario);
  }

  getCommentsNft(idNft: number): Observable<Comentario[]>{
    return this.http.get<Comentario[]>(`${this.apiUrl}/api/comments/nft/${idNft}`);
  }

  delete(id: number, userId: number){
    return this.http.delete<void>(`${this.apiUrl}/api/comments/delete/${id}/user/${userId}`);
  }
}

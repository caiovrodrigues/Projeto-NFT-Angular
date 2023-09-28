import { Component } from '@angular/core';
import { Nft } from 'src/app/iNFT';
import { NftService } from 'src/app/services/nft.service';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'src/app/services/message.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ComentarioService } from 'src/app/services/comentario.service';
import Comentario from 'src/app/iComentario';

@Component({
  selector: 'app-nft',
  templateUrl: './nft.component.html',
  styleUrls: ['./nft.component.css']
})
export class NftComponent {

  id: number | null = null;
  nft!: Nft;
  commentForm!: FormGroup;
  comentariosNft: Comentario[] = [];

  constructor(private nftService: NftService, private comentarioService: ComentarioService, private route: ActivatedRoute, private messageService: MessageService){}

  ngOnInit(){
    this.id = Number(this.route.snapshot.paramMap.get("id"));
    this.comentarioService.getCommentsNft(this.id).subscribe(comentario => this.comentariosNft = comentario);
    console.log(this.id);

    this.nftService.getNft(this.id).subscribe({
      next: (nft) => {
        this.nft = nft;
      },
      error: (error) => {
        console.log('Algo deu errado', error);
      }
    });

    this.commentForm = new FormGroup({
        usuario: new FormControl('', Validators.required),
        comentario: new FormControl('', Validators.required)
    });
  }

  get usuario(){
    return this.commentForm.get("usuario");
  }

  get comentario(){
    return this.commentForm.get("comentario");
  }

  deleteNft(nft: Nft){
    this.messageService.add("Nft excluído com sucesso!");
    this.nftService.delete(nft).subscribe();
  }

  submitComment(){
    if(!this.commentForm.invalid){
      this.comentariosNft.push(this.commentForm.value);

      this.comentariosNft.map((comentario) => {
        if(comentario.hasOwnProperty('id')){
          delete comentario.id;
        }
      })

      console.log(this.comentariosNft);

      this.comentarioService.post(this.comentariosNft, this.id!).subscribe();

      this.messageService.add("Comentário adicionado com sucesso! ✔");
    }
  }
}

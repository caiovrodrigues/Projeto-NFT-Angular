import { Component } from '@angular/core';
import { Nft } from 'src/app/iNFT';
import { NftService } from 'src/app/services/nft.service';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'src/app/services/message.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ComentarioService } from 'src/app/services/comentario.service';

@Component({
  selector: 'app-nft',
  templateUrl: './nft.component.html',
  styleUrls: ['./nft.component.css']
})
export class NftComponent {
  nft!: Nft;
  commentForm!: FormGroup;

  constructor(private nftService: NftService, private comentarioService: ComentarioService, private route: ActivatedRoute, private messageService: MessageService){}

  ngOnInit(){
    const id = Number(this.route.snapshot.paramMap.get("id"));
    console.log(id);
    
    this.nftService.getNft(id).subscribe({
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
      console.log(this.commentForm.value);
      this.comentarioService.post(this.commentForm.value, nft.id).subscribe();
      console.log('Comentário enviado com sucesso');
    }
  }
}


import { Component, inject } from '@angular/core';
import { Nft } from 'src/app/iNFT';
import { NftService } from 'src/app/services/nft.service';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'src/app/services/message.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ComentarioService } from 'src/app/services/comentario.service';

@Component({
  selector: 'app-nft',
  templateUrl: './nft.component.html',
  styleUrls: ['./nft.component.css']
})
export class NftComponent {

  id: number | null = null;
  nft!: Nft;

  private formBuilder = inject(FormBuilder);

  commentForm = this.formBuilder.group({
    usuario: ['', Validators.required],
    comentario: ['', Validators.required]
  })
  
  constructor(private nftService: NftService, private comentarioService: ComentarioService, private route: ActivatedRoute, private messageService: MessageService){}

  ngOnInit(){
    this.id = Number(this.route.snapshot.paramMap.get("id"));

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
      const commentForm = {
        usuario: this.commentForm.value.usuario as string,
        comentario: this.commentForm.value.comentario as string
      }

      this.comentarioService.post(commentForm, this.id!).subscribe({
        next: (response) => {
          console.log(response);
        }
      });

      this.messageService.add("Comentário adicionado com sucesso! ✔");
    }
  }
}

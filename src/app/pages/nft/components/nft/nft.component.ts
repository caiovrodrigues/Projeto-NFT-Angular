import { Component, OnDestroy, inject } from '@angular/core';
import { Nft } from 'src/app/model/iNFT';
import { NftService } from 'src/app/services/nft/nft.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { ComentarioService } from 'src/app/services/comentario/comentario.service';
import { Subject, takeUntil } from 'rxjs';
import Comentario from 'src/app/model/iComentario';
import { IsLoggedService } from 'src/app/services/isLogged/is-logged.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-nft',
  templateUrl: './nft.component.html',
  styleUrls: ['./nft.component.css']
})
export class NftComponent implements OnDestroy{

  private destroy$ = new Subject<number>();
  id!: number;
  nft!: Nft;
  comments: Comentario[] = [];

  isOwner: boolean = false;
  userLogadoId?: number | null;
  usernameLogado?: string | null;

  private formBuilder = inject(FormBuilder);
  private comentarioService = inject(ComentarioService);
  private isLoggedService = inject(IsLoggedService);
  private messageService = inject(MessageService);
  private router = inject(Router);

  commentForm = this.formBuilder.group({
    usuario: ['', Validators.required],
    mensagem: ['', Validators.required]
  })

  constructor(private nftService: NftService, private route: ActivatedRoute){}

  ngOnInit(){
    this.id = Number(this.route.snapshot.paramMap.get("id"));

    let hasToken = this.isLoggedService.checkHasToken();

    if(hasToken){
      this.isLoggedService.idLogado$.pipe(takeUntil(this.destroy$)).subscribe(value => this.userLogadoId = value);
      this.isLoggedService.usernameLogado$.pipe(takeUntil(this.destroy$)).subscribe(value => {
        this.commentForm.patchValue({usuario: value});
        value ? this.commentForm.get("usuario")?.disable() : this.commentForm.get("usuario")?.enable();
      });

      this.isLoggedService.isLogadoSubject$.pipe(takeUntil(this.destroy$)).subscribe(value => !value ? this.isOwner = value : null);
    }

    this.nftService.getNft(this.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (nft) => {
          this.nft = nft;
          if(hasToken){
            let setIsOwner = nft.user.id === this.userLogadoId ? true : false;

            this.isOwner = setIsOwner;

            console.log('id do dono do nft: ', nft.user.id, '; id do usuário logado : ', this.userLogadoId, '; resultado: ', setIsOwner);
          }
          
        },
        error: (error) => {
          if(error.status == 403){
            this.messageService.add({severity: 'info', summary: 'Atenção', detail: `Você precisar estar logado para ter acesso detalhado a este nft.`});
            this.router.navigateByUrl("/auth");
          }
          console.log('Algo deu errado', error);
        }
      });

    this.fetchComentarios();
  }

  get usuario(){
    return this.commentForm.get("usuario");
  }

  get mensagem(){
    return this.commentForm.get("mensagem");
  }

  deleteNft(nft: Nft){
    this.nftService.delete(nft.id).subscribe({
      next: () => {
        this.messageService.add({severity: 'success', summary: 'Sucesso', detail: `O NFT '${nft.name}' foi deletado!`});
        this.router.navigate(['']);
      },
      error: () => console.log("Não foi possível deletar esse nft")
    });
  }

  fetchComentarios(){
    this.comentarioService.getCommentsNft(this.id)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (response) => {
        this.comments = response;
      }
    });
  }

  submitComment(){
    if(this.commentForm.valid && this.userLogadoId){
      const commentObj = {
        mensagem: this.commentForm.value.mensagem as string
      }
      this.comentarioService.postComment(this.nft.id, commentObj).subscribe({
        next: () => {
          this.fetchComentarios();
          this.messageService.add({severity: 'success', summary: 'Sucesso', detail: 'Comentário feito com sucesso'});
        },
        error: () => {
          this.messageService.add({severity: 'error', summary: 'Erro', detail: 'Houve algum erro ao fazer comentário'});
        }
      });
      return;
    }
    this.messageService.add({severity: 'info', summary: 'Atenção', detail: 'Você precisa estar logado para fazer um comentário'});
    this.router.navigate(['auth']);
  }

  deleteComment(id: number){
    if(!this.userLogadoId){
      this.messageService.add({severity: 'error', summary: 'Erro', detail: 'Você precisa estar logado para excluir este comentário'});
      this.router.navigate(['auth']);
      return;
    }

    this.comentarioService.delete(id, this.userLogadoId).subscribe({
      next: () => {
        this.fetchComentarios();
        this.messageService.add({severity: 'success', summary: 'Sucesso', detail: 'Comentário excluído sucesso'});
      },
      error: () => {
        this.messageService.add({severity: 'error', summary: 'Erro', detail: 'Houve algum erro ao deletar comentário'});
      }
    });
  }

  gerarRelatorio(user_id: number){
    this.nftService.gerarRelatorio(user_id).subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next(1);
    this.destroy$.complete();
  }
}

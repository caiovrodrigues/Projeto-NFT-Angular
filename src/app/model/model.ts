/* tslint:disable */
/* eslint-disable */
// Generated using typescript-generator version 3.2.1263 on 2025-05-11 14:13:00.

export interface RequestCadastroNft {
    name: string;
    description: string;
    price: number;
    qtd: number;
}

export interface RequestCadastroUsuario {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
}

export interface RequestCommentDTO {
    mensagem: string;
}

export interface RequestLoginUsuario {
    username: string;
    password: string;
}

export interface ResponseCadastroUsuario {
    id: number;
    email: string;
    username: string;
    password: string;
}

export interface ResponseComentarioNftDTO {
    id: number;
    userId: number;
    username: string;
    message: string;
    userImgUrl: string;
    date: Date;
}

export interface ResponseLoginUsuario {
    id: number;
    name: string;
}

export interface ResponseNftDTO {
    id: number;
    user: ResponseLoginUsuario;
    name: string;
    description: string;
    price: number;
    qtd: number;
    urlMinio: string;
    date: string;
}

export interface Comment {
    id: number;
    mensagem: string;
    date: Date;
}

export interface Nft {
    id: number;
    name: string;
    description: string;
    price: number;
    qtd: number;
    urlMinio: string;
    created_at: Date;
    update_at: Date;
}

export interface Usuario {
    id: number;
    email: string;
    username: string;
    password: string;
    role: AppRole;
    nfts: Nft[];
    comments: Comment[];
    enabled: boolean;
    authorities: GrantedAuthority[];
    accountNonExpired: boolean;
    accountNonLocked: boolean;
    credentialsNonExpired: boolean;
}

export interface GrantedAuthority {
    authority: string;
}

export type AppRole = "USER" | "ADMIN" | "SYSADMIN";

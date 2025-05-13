import { Routes } from "@angular/router";
import { NftComponent } from "./components/nft/nft.component";
import { NftEditComponent } from "./components/nft-edit/nft-edit.component";
import { editGuard } from "src/app/guards/edit.guard";

export const NFT_ROUTES: Routes = [
    { path: '', component: NftComponent },
    { 
        path: 'editar',
        component: NftEditComponent,
        canActivate: [editGuard]
    }
]
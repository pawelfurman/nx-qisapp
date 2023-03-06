import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { AuthFacade } from "@qisapp/store";
import { LocalStorageService } from "@qisapp/utils/auth";

export function initializeApp(): () => Promise<void> {

    const ls = inject(LocalStorageService)
    const authFacade = inject(AuthFacade)
    const router = inject(Router)

    return () => new Promise((resolve, reject) => {
        const {token, username} = JSON.parse(ls.getItem('qisapp-user') || '{}')

        console.log('toekn user', token, username)
  
        if(token?.length){
            authFacade.login(token, username)
        }else{
            router.navigate(['/', 'access'])
        }

        resolve();
    })
  }
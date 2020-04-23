import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/animal'
  },
  {
    path: 'animal',
    loadChildren: () => import('./animal/animal.module').then(m => m.AnimalModule)
  },
  {
    path: 'owner',
    loadChildren: () => import('./owner/owner.module').then(m => m.OwnerModule)
  },
  {
    path: 'wild-animal',
    loadChildren: () => import('./wild-animal/wild-animal.module').then(m => m.WildAnimalModule)
  },
  {
    path: 'pet',
    loadChildren: () => import('./pet/pet.module').then(m => m.PetModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

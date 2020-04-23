import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './sidenav/sidenav.component';
import { SharedModule } from '../shared/shared.module';
import {ListPokemonComponent} from '../list-pokemon/list-pokemon.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule } from '@angular/forms';
import { NgImageSliderModule } from 'ng-image-slider';

@NgModule({
  declarations: [SidenavComponent, ListPokemonComponent],
  imports: [
    CommonModule,
    SharedModule,
    Ng2SearchPipeModule,
    FormsModule,
    NgImageSliderModule
  ],
  exports: [SidenavComponent, ListPokemonComponent]
})
export class CoreModule { }

import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule, Pipe } from '@angular/core';
import { SharedModule } from './shared/shared.module'
import { CoreModule } from './core/core.module'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import 'hammerjs';
import { PokeCardComponent } from './poke-card/poke-card.component';
import { Pokemon } from './models/Pokemon';
import { HttpClientModule} from "@angular/common/http";
import { PokemonService } from './pokemon.service';
import { ListPokemonComponent } from './list-pokemon/list-pokemon.component';
import { NgImageSliderModule } from 'ng-image-slider';
import { PokemonEvo } from './models/PokemonEvo';

@NgModule({
  declarations: [
    AppComponent,
    PokeCardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    CoreModule,
    HttpClientModule,
    NgImageSliderModule
  ],
  exports:[],
  providers: [Pokemon, PokemonService, ListPokemonComponent, PokemonEvo],
  bootstrap: [AppComponent],
  entryComponents:[PokeCardComponent]
})
export class AppModule { }

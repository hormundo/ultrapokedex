import { PokemonService } from './pokemon.service';
import { Pokemon } from './models/Pokemon';
import { Component, OnChanges, SimpleChanges, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.less']
})
export class AppComponent {

  constructor(private pokemonService: PokemonService, private pokemon: Pokemon) { }

  

}
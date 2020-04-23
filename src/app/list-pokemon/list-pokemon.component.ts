import { Component, Input } from '@angular/core';
import { Pokemon } from '../models/Pokemon';
import { MatDialog } from '@angular/material/dialog';
import { PokeCardComponent } from '../poke-card/poke-card.component';
import { PokemonService } from '../pokemon.service';
import { PokemonEvo } from '../models/PokemonEvo';

@Component({
  selector: 'app-list-pokemon',
  templateUrl: './list-pokemon.component.html',
  styleUrls: ['./list-pokemon.component.less']
})
export class ListPokemonComponent {
  searchText: string;
  
  spriteEvolution_1: string= "";
  spriteEvolution_2: string= "";
  spriteEvolution_3: string= "";

  type1: string;
  type2: string;

  @Input() pokemons=[]
  @Input() pokemonsEvoSet=[]

  constructor(public dialog: MatDialog, public pokemonService: PokemonService, private pokemonEvo: PokemonEvo) { 
    this.pokemonsEvoSet=[]
      this.pokemonService.getAllPokemons().subscribe((dataPokemons: any)=>{
        for(let i=0; i<dataPokemons.results.length; i++) {
          this.pokemonService.getPokemon(dataPokemons.results[i].url).subscribe((dataPokemon: any)=>{
  
            this.pokemonEvo= {
              name: dataPokemon.name,
              sprite: dataPokemon.sprites.front_default,
            }
  
            this.pokemonsEvoSet.push(this.pokemonEvo);
  
        
           console.log(this.pokemonsEvoSet)
      })
     }
    })

  }

  openDialog(pokemon: Pokemon): void {

    for(let i= 0; i< this.pokemonsEvoSet.length; i++) {
      if(this.pokemonsEvoSet[i].name== pokemon.nameEvolution_1) {

        pokemon.spriteEvolution_1= this.pokemonsEvoSet[i].sprite;
        break
        
      }
    }

    for(let i= 0; i< this.pokemonsEvoSet.length; i++) {
      if(this.pokemonsEvoSet[i].name== pokemon.nameEvolution_2) {

        pokemon.spriteEvolution_2= this.pokemonsEvoSet[i].sprite;
        break
        
      }
    }

    for(let i= 0; i< this.pokemonsEvoSet.length; i++) {
      if(this.pokemonsEvoSet[i].name== pokemon.nameEvolution_3) {

        pokemon.spriteEvolution_3= this.pokemonsEvoSet[i].sprite;
        break
        
      }
    }

    if (pokemon.types.length == 1) {
        this.type1= pokemon.types[0];
    }  else {
      this.type1= pokemon.types[1];
      this.type2= pokemon.types[0];
    }
    

    const dialogRef = this.dialog.open(PokeCardComponent, {
      width: '875px',
      height:'580px',
      data: {
        name: pokemon.name,
        sprite: pokemon.sprite,
        id: pokemon.id,
        height: pokemon.height/10,
        weight: pokemon.weight/10,
        type1: this.type1,
        type2: this.type2,
        imageObject: pokemon.imageObject,
        stats: pokemon.stats,
        nameEvolution_1: pokemon.nameEvolution_1,
        nameEvolution_2: pokemon.nameEvolution_2,
        nameEvolution_3: pokemon.nameEvolution_3,
        spriteEvolution_1: pokemon.spriteEvolution_1,
        spriteEvolution_2: pokemon.spriteEvolution_2,
        spriteEvolution_3: pokemon.spriteEvolution_3,
        lore: pokemon.lore,
        ratio_capture: pokemon.ratio_capture,
        double_damage_from: pokemon.double_damage_from,
        double_damage_to: pokemon.double_damage_to,
        half_damage_from: pokemon.half_damage_from,
        half_damage_to: pokemon.half_damage_to,
        no_damage_from: pokemon.no_damage_from,
        no_damage_to: pokemon.no_damage_to
      }
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  } 
}

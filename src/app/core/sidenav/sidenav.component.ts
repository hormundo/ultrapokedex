import {Component, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';
import { ListPokemonComponent } from 'src/app/list-pokemon/list-pokemon.component';
import { AppComponent } from 'src/app/app.component';
import { PokemonService } from 'src/app/pokemon.service';
import { Pokemon } from 'src/app/models/Pokemon';
import { PokemonEvo } from 'src/app/models/PokemonEvo';
import { throwMatDialogContentAlreadyAttachedError } from '@angular/material/dialog';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.less']
})

export class SidenavComponent {

  @ViewChild('sidenav', {static: false}) sidenav: MatSidenav;

  reason = '';
  
  constructor(private listPokemonComponent: ListPokemonComponent, private AppComponent: AppComponent, private pokemonService: PokemonService,
    private pokemon: Pokemon, private pokemonEvo: PokemonEvo){}

  close(reason: string) {
    this.sidenav.close();
  }
  pokemonsEvoSet= [];
  pokemons = [];
  next: string;
  generacion: number= 1
  setTypes=[];

  double_damage_from_set= [];
  double_damage_to_set= [];
  half_damage_from_set= [];
  half_damage_to_set= [];
  no_damage_from_set= [];
  no_damage_to_set= [];

  double_damage_from= [];
  double_damage_to= [];
  half_damage_from= [];
  half_damage_to= [];
  no_damage_from= [];
  no_damage_to= [];

  lore= "";

  nameEvolution_1: string;
  nameEvolution_2: string;
  nameEvolution_3: string;

  ngOnInit() {
    this.pokemons= [];
    this.pokemonsEvoSet= [];
    this.getPokemonsGeneracion(this.generacion);
    this.close(this.reason);
   
  }

  selectGeneracion(generacion: number) {
    this.generacion= generacion;
    this.ngOnInit();
  }

  getPokemonsGeneracion(generacion: number) {
  
    this.pokemons=[]
    
      this.pokemonService.getPokemonsGeneracion(generacion).subscribe((datageneration: any)=>{

        for(let i=0; i<datageneration.pokemon_species.length; i++) {

            this.pokemonService.getPokemon(datageneration.pokemon_species[i].url).subscribe((dataPokemonspecie: any)=>{
              
              this.pokemonService.getPokemonSpecie(dataPokemonspecie.varieties[0].pokemon.url).subscribe((dataPokemon: any)=>{
                for (let i=0; i<dataPokemon.types.length; i++) {

                  this.pokemonService.getPokemonDamages(dataPokemon.types[i].type.url).subscribe((dataPokemonDamages: any)=>{

                    this.double_damage_from_set= dataPokemonDamages.damage_relations.double_damage_from;
                    this.double_damage_to_set= dataPokemonDamages.damage_relations.double_damage_to;
                    this.half_damage_from_set= dataPokemonDamages.damage_relations.half_damage_from;
                    this.half_damage_to_set= dataPokemonDamages.damage_relations.half_damage_to;
                    this.no_damage_from_set= dataPokemonDamages.damage_relations.no_damage_from;
                    this.no_damage_to_set= dataPokemonDamages.damage_relations.no_damage_to;

                    for (let i=0; i<this.double_damage_from_set.length; i++) {
                      this.double_damage_from.push(this.double_damage_from_set[i].name)
                    }

                    for (let i=0; i<this.double_damage_to_set.length; i++) {
                      this.double_damage_to.push(this.double_damage_to_set[i].name)
                    }

                    for (let i=0; i<this.half_damage_from_set.length; i++) {
                      this.half_damage_from.push(this.half_damage_from_set[i].name)
                    }

                    for (let i=0; i<this.half_damage_to_set.length; i++) {
                      this.half_damage_to.push(this.half_damage_to_set[i].name)
                    }

                    for (let i=0; i<this.no_damage_from_set.length; i++) {
                      this.no_damage_from.push(this.no_damage_from_set[i].name)
                    }

                    for (let i=0; i<this.no_damage_to_set.length; i++) {
                      this.no_damage_from.push(this.no_damage_to_set[i].name)
                    }
                  
                })
              }
                this.pokemonService.getPokemonSpecieEvolutionChain(dataPokemonspecie.evolution_chain.url).subscribe((dataPokemonEvolutionChain: any)=>{

                    this.nameEvolution_1= "";
                    this.nameEvolution_2= "";
                    this.nameEvolution_3= "";

                    console.log("Evaluando a :"+ dataPokemonspecie.varieties[0].pokemon.name)

                    if(dataPokemonEvolutionChain.chain.evolves_to.length== 0) {
                      console.log("Este pokemon no tiene evolución")
                      console.log(dataPokemonEvolutionChain.chain.species.name)

                    } else {

                      this.nameEvolution_1= dataPokemonEvolutionChain.chain.species.name;

                      console.log(this.nameEvolution_1)

                      if(dataPokemonEvolutionChain.chain.evolves_to.length== 1) {
                        this.nameEvolution_2= dataPokemonEvolutionChain.chain.evolves_to[0].species.name

                        console.log(this.nameEvolution_2)
                        
                        if(dataPokemonEvolutionChain.chain.evolves_to[0].evolves_to.length== 1) {
                          this.nameEvolution_3= dataPokemonEvolutionChain.chain.evolves_to[0].evolves_to[0].species.name
                          console.log(this.nameEvolution_3)

                        } 
                      }
                    }

                    if(dataPokemon.sprites.front_default!= null) {
                      for(i=0; i<dataPokemon.types.length; i++) {
                        this.setTypes.push(dataPokemon.types[i].type.name)
                      }
    
                    let sprites=[];
    
                    let spritesArray=[dataPokemon.sprites.front_default, dataPokemon.sprites.back_default, dataPokemon.sprites.front_female, dataPokemon.sprites.back_female, 
                      dataPokemon.sprites.front_shiny, dataPokemon.sprites.back_shiny, dataPokemon.sprites.front_shiny_female, dataPokemon.sprites.back_shiny_female]
    
                    let spritesNamesArray=["front male", "back male", "front female", "back female", "front male shiny", "back male shiny", "front female shiny", "back female shiny"]
    
                      for (let i= 0; i< spritesArray.length; i++) {
                        if (spritesArray[i]!= null) {
                
                          let spriteImage= {
                            image: spritesArray[i],
                            thumbImage: spritesArray[i],
                            title: spritesNamesArray[i]
                          }
                          sprites.push(spriteImage)
                        }
                      }
    
                      let stats=[];
    
                      for (let i= 0; i< dataPokemon.stats.length; i++) {
    
                        let stat= {
                          nameStat: dataPokemon.stats[i].stat.name,
                          baseStat: dataPokemon.stats[i].base_stat,
                          baseStatMod: (dataPokemon.stats[i].base_stat*100)/255
                        }
                        stats.push(stat)
                      }

                      for(let i=0; i<dataPokemonspecie.flavor_text_entries.length; i++) {
                        if (dataPokemonspecie.flavor_text_entries[i].language.name=="es") {
                          this.lore+= dataPokemonspecie.flavor_text_entries[i].flavor_text+"\n";
                        }
                      }

                      dataPokemonspecie.capture_rate;
    
                      this.pokemon= {
                        name: dataPokemon.name,
                        generation: this.generacion,
                        sprite: dataPokemon.sprites.front_default,
                        id: dataPokemon.id,
                        height: dataPokemon.height,
                        weight: dataPokemon.weight,
                        types: this.setTypes,
                        imageObject: sprites,
                        stats: stats,
                        nameEvolution_1: this.nameEvolution_1,
                        nameEvolution_2: this.nameEvolution_2,
                        nameEvolution_3: this.nameEvolution_3,
                        spriteEvolution_1: "",
                        spriteEvolution_2: "",
                        spriteEvolution_3: "",
                        lore: this.lore,
                        ratio_capture: dataPokemonspecie.capture_rate,
                        double_damage_from: this.double_damage_from,
                        double_damage_to: this.double_damage_to,
                        half_damage_from: this.half_damage_from,
                        half_damage_to: this.half_damage_to,
                        no_damage_from: this.no_damage_from,
                        no_damage_to: this.no_damage_to
                      }
    
                    this.pokemons.push(this.pokemon);
                    this.setTypes=[];
                    this.lore="";

                    this.double_damage_from_set= [];
                    this.double_damage_to_set= [];
                    this.half_damage_from_set= [];
                    this.half_damage_to_set= [];
                    this.no_damage_from_set= [];
                    this.no_damage_to_set= [];

                    this.double_damage_from= [];
                    this.double_damage_to= [];
                    this.half_damage_from= [];
                    this.half_damage_to= [];
                    this.no_damage_from= [];
                    this.no_damage_to= [];
                    }
          
                  this.pokemons.sort(function(a,b){
                    return a.id > b.id?1:a.id < b.id?-1:0
                    })
                  console.log(this.pokemons);
                  
              })   
            })    
        })
      }
    })
  } 
}

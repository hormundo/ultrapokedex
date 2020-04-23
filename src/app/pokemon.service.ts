import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private baseUrl: string= 'https://pokeapi.co/api/v2/';

  constructor(private http: HttpClient) { }

  getAllPokemons() {
    return this.http.get(this.baseUrl+"pokemon/?offset=0&limit=964")
  }

  getPokemonsGeneracion(generacion: number) {
    return this.http.get(this.baseUrl+"generation/"+generacion)
  }

  getPokemonSpecie(url: string) {
    return this.http.get(url)
  }

  getPokemonSpecieEvolutionChain(url: string) {
    return this.http.get(url)
  }

  getPokemon(urlPokemon: string) {
    return this.http.get(urlPokemon)
  }

  getPokemonDamages(urlPokemon: string) {
    return this.http.get(urlPokemon)
  }

}

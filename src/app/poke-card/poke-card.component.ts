import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Pokemon } from '../models/Pokemon';

@Component({
  selector: 'app-poke-card',
  templateUrl: './poke-card.component.html',
  styleUrls: ['./poke-card.component.less']
})

export class PokeCardComponent {
  
  constructor(
    public dialogRef: MatDialogRef<PokeCardComponent>,
    @Inject(MAT_DIALOG_DATA) public pokemon: Pokemon) { 
    }

  onNoClick(): void {
    this.dialogRef.close();
  }
 
}

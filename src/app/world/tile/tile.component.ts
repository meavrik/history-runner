import { Component, OnInit, Input } from '@angular/core';
import { Person } from 'app/life/person';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.css']
})
export class TileComponent implements OnInit {
  @Input() row: number;
  @Input() col: number;

  fertility: number;
  owner: Person;
  constructor() { }

  ngOnInit() {
  }

  onClick() {
    console.log('row = ' + this.row + ' | col = ' + this.col);

  }
}

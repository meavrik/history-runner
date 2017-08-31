import { Component, OnInit, Input } from '@angular/core';
import { Tribe } from '../../tribe/tribe';

@Component({
  selector: 'app-tribe-view',
  templateUrl: './tribe-view.component.html',
  styleUrls: ['./tribe-view.component.css']
})
export class TribeViewComponent implements OnInit {
  @Input() tribe:Tribe;

  
  constructor() { }

  ngOnInit() {
  }

}

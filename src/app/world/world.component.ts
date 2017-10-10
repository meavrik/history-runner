import { Component, OnInit } from '@angular/core';
import { PopulationService } from '../services/population.service';
import { Chromosome } from 'app/life/chromosome';
import { Person } from '../life/person';
import { Genome } from '../life/genome';
import { TimeService } from '../services/time.service';
import { UtilsService } from '../services/utils.service';
import { TreeNode } from "primeng/components/common/treenode";

@Component({
  selector: 'app-world',
  templateUrl: './world.component.html',
  styleUrls: ['./world.component.css']
})
export class WorldComponent implements OnInit {
  population: Person[] = [];
  message: any;

  tilesRows: any;
  tilesCols: any;

  constructor(public popuplationService: PopulationService, private time: TimeService) {
    this.popuplationService.message.subscribe(message => {
      this.message = message
    })

    this.popuplationService.population.subscribe(population => {
      this.population = population;
    })


    this.tilesRows = [];
    this.tilesCols = [];

    for (var j = 0; j < 10; j++) {
      this.tilesRows.push(j)
    }

    for (var i = 0; i < 30; i++) {
      this.tilesCols.push(i)

    }


  }

  ngOnInit() {

  }

  onHide() {
    this.time.pause = false;
  }

  onShow() {
    this.time.pause = true;
  }

}

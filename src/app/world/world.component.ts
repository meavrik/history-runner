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
  //currentPerson: Person;
  data: TreeNode[];
  message: any;

  constructor(public popuplationService: PopulationService, private time: TimeService) {

  }

  ngOnInit() {

    this.data = [{
      label: 'Root',
      children: [],
      expanded: true
    }];

    this.popuplationService.message.subscribe(message => {
      this.message = message
    })

    this.popuplationService.population.subscribe(population => {
      this.population = population;
      //console.log('pop change!!! '+this.population.length);

      //this.currentPerson = population[population.length - 1];
      //this.currentPerson.genome.chromosomes

      /*  this.data = this.population.map(person => {
         return { label: person.fullName, children: person.childrens?person.childrens.map(a => { return { label: a.fullName, children: [] } }):[], expanded: true }
       }) */

      /* this.data[0].children = this.population.map(person => {
        return { label: person.fullName, children: this.getChildrens(person), expanded: false }
      }) */
    })
  }

  /* getChildrens(person: Person): TreeNode[] {
    return person.childrens.map(person => { return { label: person.fullName, expanded: false, children: this.getChildrens(person) } })
  } */

  onHide() {
    this.time.pause = false;
  }

  onShow() {
    this.time.pause = true;
  }

}

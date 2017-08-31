import { Component, OnInit, Input } from '@angular/core';
import { Person } from 'app/life/person';

@Component({
  selector: 'app-person-id',
  templateUrl: './person-id.component.html',
  styleUrls: ['./person-id.component.css']
})
export class PersonIdComponent implements OnInit {

  @Input() person: Person;


  works = [{ label: 'food', value: 'food' },
  { label: 'build', value: 'build' },
  { label: 'science', value: 'science' },
  { label: 'defence', value: 'defence' },
  ];

  constructor() { }

  ngOnInit() {
    
  }

  onWorkChange() {

  }

}

import {Component, Input, OnInit} from '@angular/core';
import {Omdb} from "../../../entities/omdb";

@Component({
  selector: 'app-film-detail',
  templateUrl: './film-detail.component.html',
  styleUrls: ['./film-detail.component.css']
})
export class FilmDetailComponent implements OnInit {

  @Input()
  film: Omdb
  hodnotenia: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

}

import {AfterViewInit, Component, EventEmitter, OnInit, ViewChild} from '@angular/core';
import {FilmsServerService} from "../../../services/films-server.service";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {DataSource} from "@angular/cdk/collections";
import {Film} from "../../../entities/film";
import {Observable, of} from "rxjs";
import {map, mergeAll, switchMap, tap} from "rxjs/operators";
import {MatSort, Sort} from "@angular/material/sort";
import {OmdbService} from "../../../services/omdb.service";
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Omdb} from "../../../entities/omdb";

@Component({
  selector: 'app-films-list',
  templateUrl: './films-list.component.html',
  styleUrls: ['./films-list.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class FilmsListComponent implements OnInit, AfterViewInit {
  dataSource: FilmsDataSource
  filter$ = new EventEmitter<string>()
  columnsToDisplay = ['id', 'nazov', 'slovenskyNazov', 'rok', 'afi1998', 'afi2007']
  expandedElement: Omdb;

  @ViewChild(MatPaginator) paginator: MatPaginator
  @ViewChild(MatSort) sort: MatSort

  constructor(private filmsServerService: FilmsServerService, private omdbService: OmdbService) {
  }

  ngOnInit(): void {
    if (!this.filmsServerService.token) {
      this.columnsToDisplay = ["id", "nazov", "rok"]
    }
    this.dataSource = new FilmsDataSource(this.filmsServerService)
  }

  ngAfterViewInit(): void {
    this.dataSource.setObservables(this.paginator, this.filter$, this.sort)
  }

  applyFilter(value: string) {
    this.filter$.next(value)
  }

  getDetail(film: any) {
    if (this.expandedElement && this.expandedElement.Title === film.nazov) {
      this.expandedElement = null;
    } else {
      this.omdbService.getFilms(film.nazov).subscribe(value => {
        console.log(value)
        this.expandedElement = value
      });
    }
  }
}

class FilmsDataSource implements DataSource<Film> {

  futureObservables = new EventEmitter<Observable<any>>()
  private paginator: MatPaginator;
  private pageSize: number;
  private indexFrom: number;
  private filter: string;
  private orderBy: string;
  private descending: boolean;

  constructor(private filmsServerService: FilmsServerService) {
  }

  setObservables(paginator: MatPaginator, filter$: Observable<string>, sort: MatSort) {
    this.paginator = paginator
    this.pageSize = paginator.pageSize
    this.indexFrom = paginator.pageSize * paginator.pageIndex
    this.futureObservables.next(of(null))
    this.futureObservables.next(this.paginator.page.pipe(
      tap((event: PageEvent) => {
        this.pageSize = event.pageSize
        this.indexFrom = event.pageSize * event.pageIndex
      })
    ))
    this.futureObservables.next(filter$.pipe(tap(filter => {
      this.paginator.firstPage()
      this.filter = filter
    })))
    this.futureObservables.next(sort.sortChange.pipe(
      tap((sortEvent: Sort) => {
        this.paginator.firstPage()
        if (sortEvent.direction === '') {
          this.orderBy = undefined
          this.descending = undefined
          return
        }
        this.descending = sortEvent.direction === 'desc'
        switch (sortEvent.active) {
          case 'afi1998': {
            this.orderBy = 'poradieVRebricku.AFI 1998'
            break
          }
          case 'afi2007': {
            this.orderBy = 'poradieVRebricku.AFI 2007'
            break
          }
          default: {
            this.orderBy = sortEvent.active
          }
        }
      })
    ))
  }

  connect(): Observable<Film[]> {
    return this.futureObservables.pipe(
      mergeAll(),
      switchMap(value => this.filmsServerService.getFilms(
        this.indexFrom, this.indexFrom + this.pageSize, this.filter, this.orderBy, this.descending
      ).pipe(map(response => {
        this.paginator.length = response.totalCount
        return response.items
      })))
    )
  }

  disconnect(): void {
  }

}

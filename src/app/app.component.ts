import { Component, OnInit } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';
import { Todo } from './models/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'observables2';

  public http$!: Observable<Todo[]>;
  public doneTask$!: Observable<Todo[]>;
  public undoneTask$!: Observable<Todo[]>;




  public ngOnInit(): void {
    
    this.http$ = new Observable((observer) => {
      fetch('https://jsonplaceholder.typicode.com/todos')
        .then((response) => {
          // console.log(response); 
          // console.log(response.json());
          return response.json();
        })
        .then((body) => {
          // console.log(body);
          observer.next(body);
          observer.complete();
        })
        .catch((err) => {
          // console.log(err);
          observer.error(err);
        });
    });
    

    this.http$ = this.http$.pipe(
      shareReplay()
    );


    this.doneTask$ =this.http$.pipe(
      map((todo) => todo.filter((todo) => todo.completed === true))
    );

    this.undoneTask$ =this.http$.pipe(
      map((todo) => todo.filter((todo) => todo.completed === false))
    );

  }


}

import { Component, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isCollapsed = true;
  carousel: string;

  constructor(
    private router: Router
  ) { 
    this.getDataRoute().subscribe(data => {
      this.carousel = data;
    });
  }

  ngOnInit(): void {
  }


  getDataRoute() {
    return this.router.events.pipe(
      filter(evento =>  evento instanceof ActivationEnd),
      filter((evento: ActivationEnd) => evento.snapshot.firstChild === null),
      map( (evento: ActivationEnd) => evento.snapshot.routeConfig.path)
    );
  }

}

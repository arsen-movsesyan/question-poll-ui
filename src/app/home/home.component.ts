import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  thisYear: string;
  constructor() { }

  ngOnInit(): void {
    const d = new Date();
    this.thisYear = d.getFullYear().toString();
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  public title:string;
  public subtitle:string;
  public email:string;
  public web:string;

  constructor(){
    this.title="Elton Chavez";
    this.subtitle="Desarrollador";
    this.email="elton.m.chavez@gmail.com";
    this.web="eltonchavezweb.com";
  }

  ngOnInit(): void {
  }

}

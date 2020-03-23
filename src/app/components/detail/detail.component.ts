import { Component, OnInit } from '@angular/core';
import { Global } from '../../services/global';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  providers: [ProjectService]
})
export class DetailComponent implements OnInit {
  public url: String;
  public project: Project;

  constructor( private _projectService:ProjectService, private _router: Router, private _route:ActivatedRoute){
    this.url = Global.url;
  }

  ngOnInit(): void{
    this._route.params.subscribe(params =>{
      let id = params.id;
      this.getProject(id);
    });
  }

  getProject(id){
    this._projectService.getProject(id).subscribe(
      response => {
        this.project = response.project;
      },
      error =>{
        console.log(<any>error);
      }
    )
  }

  deleteProject(id){
    this._projectService.deleteProject(id).subscribe(
      response =>{
        $('#myModal').on('hide.bs.modal', function () {
          alert("dadassdasd");
        })
        $('#myModal').on('hidden.bs.modal', function () {
          alert("2132313213123");
        })
        this._router.navigate(['/proyectos']);
      },
      error =>{
        console.log(<any>error);
      }
    )
  }

  openModal(){
    $('#myModal').on('shown.bs.modal', function () {
      $('#myInput').trigger('focus')
    })
  }
  


}

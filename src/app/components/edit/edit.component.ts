import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { Global } from '../../services/global';
import { ProjectService } from '../../services/project.service';
import { UploadService } from '../../services/upload.service';
import { Router, Params, ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-edit',
  templateUrl: '../create/create.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [ProjectService,UploadService]
})
export class EditComponent implements OnInit {
  public project:Project;
  public title:String;
  public save_project;
  public status:String;
  public filesToUpload:Array<File>;
  public url:String;

  constructor( private _projectService:ProjectService, private _uploadService:UploadService, private _router:Router, private _route:ActivatedRoute){
    this.title="Editar Proyecto";
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

  onSubmit(form){
    //Guardar los datos
    this._projectService.updateProject(this.project).subscribe(
      response =>{
        if(response.project){
          //Subir la imagen si es que la hay
          if(this.filesToUpload){
            this._uploadService.makeFileRequest(Global.url+"upload-image/"+response.project._id,[],this.filesToUpload,'image')
            .then((result:any)=>{
                this.save_project = result.project;
              });
          }  
        }
        this.status = 'updated';
      },
      error =>{
        console.log(<any>error);
        this.status = 'no-updated';
      }
    );
  }

  fileChangeEvent(fileInput:any){
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }
}

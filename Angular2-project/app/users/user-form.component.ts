import {Component, OnInit} from 'angular2/core';
import {ControlGroup,FormBuilder,Validators} from 'angular2/common'
import { BasicValidators } from '../shared/basicValidators';
import { CanDeactivate, Router, RouteParams } from 'angular2/router';
import { UsersComponent } from './users.component';
import { UserService } from './user.service';
import { User } from './user';


@Component({
    templateUrl:'app/user-form.component.html',
    providers:[UserService]
})

export class UserFormComponent implements OnInit, CanDeactivate{
    form:ControlGroup;
    title:string;
    user=new User();

    ngOnInit() {
        var id=this._routeParams.get("id");

        this.title=id?"Edit User":"New User";

        if(!id)
            return;
        
        this._userService.getUser(id)
                         .subscribe(
                             user=>this.user=user,
                             response=>{
                                 if(response.status==404){
                                    this._router.navigate(['NotFound'])
                                 }
                             });
    }
    

    routerCanDeactivate(next, previous) {
        if(this.form.dirty)
            return  confirm("Are you sure navigate away?");
        return true;
    }
    

    constructor(fb:FormBuilder,private _router:Router,private _userService:UserService,private _routeParams:RouteParams){




        this.form=fb.group({
            name:['',Validators.required],
            email:['',BasicValidators.email],
            phone:[],
            address:fb.group({
                street:[],
                suite:[],
                city:[],
                zipcode:[]
            })
        })
    }

    save(){

        var result;

        if(this.user.id)
            result= this._userService.updateUser(this.user);
        else
            result=this._userService.addUser(this.user);

        result.subscribe(
            x=>{
                this._router.navigate(['Users'])
            });





        
                
            
        
    }
}
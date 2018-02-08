import {Http} from 'angular2/http'
import { Injectable } from 'angular2/core';
import 'rxjs/add/operator/map'


@Injectable()

export class UserService{
    private _url="https://jsonplaceholder.typicode.com/users";

    constructor(private _http:Http){
        
    }
    getUsers(){
        return this._http.get(this._url)
                    .map(res=>res.json());
    }

    addUser(user){
        return this._http.post(this._url,JSON.stringify(user))
                    .map(res=>res.json());
    }

    getUser(userId){
        return this._http.get(this.getUsetUrl(userId))
                .map(res=>res.json());
    }

    updateUser(user){
        return this._http.put(this.getUsetUrl(user.id),JSON.stringify(user))
                    .map(res=>res.json());
    }

    deleteUser(userId){
        this._http.delete(this.getUsetUrl(userId))
                    .map(res=>res.json());
    }

    private getUsetUrl(userId){
        return this._url+"/"+userId
    }
}
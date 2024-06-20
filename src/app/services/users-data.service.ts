import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class UsersDataService {
  urlBase: string = "https://github-actions-service-smc757oxwq-uc.a.run.app/api/v1";
  private dataArray: any[];
  private fetinStages: any[];
  dataJson = {};
  private pass = '';

  constructor(private http: HttpClient) {
    this.dataArray = [];
    this.fetinStages = [];
  }

  // Requisições para API
  tryLogin(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.urlBase + '/auth/login', {
      "email": email,
      "password": password
    })
  }

  tryCreate(jsonData:any, bearer:string):Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${bearer}`
    });
    console.log('jsonData: ', jsonData);
    return this.http.post<any>(this.urlBase + '/adm/teams/register', jsonData, {headers:headers});
  }

  handleAdvisor(bearer:string){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${bearer}`
    });
    return this.http.get<any>(
      this.urlBase + '/advisor',
      { 
        headers: headers 
      }
    )
  }

  handleStudent(bearer: string){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${bearer}`
    });
    return this.http.get<any>(
      this.urlBase + '/member',
      { 
        headers: headers 
      }
    )
  }

  handleGet(bearer: String, endPoint: String){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${bearer}`
    });
    return this.http.get<any>(
      this.urlBase + endPoint,
      { 
        headers: headers 
      }
    )
  }

  handleDelete(bearer: String, endPoint: string){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${bearer}`
    });
    return this.http.delete<any>(
      this.urlBase + endPoint,
      { 
        headers: headers 
      });
  }

  handlePost(bearer: String, endPoint:String, json:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${bearer}`
    });
    return this.http.post<any>(
      this.urlBase + endPoint,json,
      { 
        headers: headers 
      });
  }

  handlePut(bearer:String, endPoint:String, json:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${bearer}`
    });
    return this.http.put<any>(
      this.urlBase + endPoint, json,
      { 
        headers: headers 
      });
  }

  // Configurações de array
  setTeams(data: any[]){
    this.dataArray = data;
  }

  getTeams(){
    return this.dataArray;
  }

  setTeamsDetails(data: any){
    this.dataJson = data;
  }

  getTeamsDetails(){
    return this.dataJson;
  }

  setFetinStages(data:any){
    this.fetinStages = data;
  }

  getFetinStages(){
    return this.fetinStages;
  }

  // Métodos utilizados para mudança de senha
  setPass(pass: string){
    this.pass = pass;
  }

  getPass(){
    return this.pass;
  }
}

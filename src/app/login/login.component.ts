import {Component, OnInit} from '@angular/core';
import {StaffMember} from "../staffmember/StaffMember";
import {AppService} from "../app.service";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  //credentials = {document: '', password: ''};
  staffMember: StaffMember = {
    id: null,
    document:'',
    email:'',
    password:'',
    name:'',
    lastName:'',

    isHumanResourcesManager:false, //TODO: separate classes for HRM and staff member
    available:null,

    skills:[],
    knowledges:[],
  }

  constructor(private app: AppService, private http: HttpClient, private router: Router, private route: ActivatedRoute){}

  ngOnInit(){
    sessionStorage.setItem('token', '')
  }

  login(){
    let url = "http://localhost:8080/login";
    this.http.post<Observable<boolean>>(url, {
      document: this.staffMember.document,
      password: this.staffMember.password
    }).subscribe(isValid => {
      if(isValid){
        sessionStorage.setItem('token', btoa(this.staffMember.document + ':' + this.staffMember.password));
        this.router.navigate(['']);
      } else{
        alert("Failed");
      }
    })
  }

  /*login(){
    this.app.authenticate(this.staffMember, () => {
      this.router.navigateByUrl('/');
    });
    return false;
  }*/
  /*staffMemberService: StaffMemberService;

  @Input()
  staffMember: StaffMember;

  public document: String = '';
  public password: String = '';

  constructor() { }

  ngOnInit() {
  }

  login(): void{
    this.staffMember.document = this.document;
    this.staffMember.password = this.password;
    this.staffMemberService.loginStaffMember(this.staffMember);
  }*/

}

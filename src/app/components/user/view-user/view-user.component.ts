import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrl: './view-user.component.css'
})
export class ViewUserComponent implements OnInit{

public userList : User[]=[];

constructor(private router: Router, private userService : UserService){}



  ngOnInit(): void {
    
    this.userService.getUsers().subscribe((data) =>{
      this.userList = data;
      
    });
  }

}

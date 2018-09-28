import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, UrlSegment} from '@angular/router';

@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.css']
})
export class GroupDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    console.log(this.route.snapshot.url[2].path);
  }

}

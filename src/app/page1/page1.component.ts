import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.css']
})
export class Page1Component implements OnInit {
  current_id:string;
  constructor(private _activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    this.current_id = this._activatedRoute.snapshot.params["id"];
    console.log(this._activatedRoute.snapshot.data);
    console.log(this.current_id);
  }

}

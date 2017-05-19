import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-page2',
  templateUrl: './page2.component.html',
  styleUrls: ['./page2.component.css']
})
export class Page2Component implements OnInit {

  constructor(private _router:Router) { }

  ngOnInit() {
  }
  topage1(){
    //this._router.navigateByUrl("/page1")
    this._router.navigate(['/page1']);
  }
}

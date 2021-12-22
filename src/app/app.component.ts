import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public files = ['aaa.pdf', 'bbb.pdf', 'ccc.doc', 'ddd.docx'];

  public ngOnInit(): void {
  }

}

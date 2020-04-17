import { Component, OnInit, Input } from '@angular/core';

export interface ISearchResult {
  title: string;
  uri: string;
}

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  @Input() result: ISearchResult;

  static get tagname() {
    return 'result';
  }

  constructor() { }

  ngOnInit(): void {
  }
}

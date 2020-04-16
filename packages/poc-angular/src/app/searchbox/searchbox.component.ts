import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-searchbox',
  templateUrl: './searchbox.component.html',
  styleUrls: ['./searchbox.component.scss']
})
export class SearchboxComponent implements OnInit {
  public static get tagname() {
    return 'searchbox';
  }

  words = ['abc'];

  constructor() { }

  addWord() {
    this.words = [...this.words, (Math.random() * 255).toString(16)];
  }

  ngOnInit(): void {
  }
}

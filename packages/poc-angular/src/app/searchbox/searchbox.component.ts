import {Component, OnInit} from '@angular/core';
import {CoveoService} from '../coveo.service';

export interface SearchboxSuggestion {
  uri: string;
  title: string;
}

@Component({
  templateUrl: './searchbox.component.html',
  styleUrls: ['./searchbox.component.scss'],
})
export class SearchboxComponent implements OnInit {
  public static get tagname() {
    return 'searchbox';
  }

  suggestions: SearchboxSuggestion[] = [];
  focused = false;

  constructor(private coveo: CoveoService) {}

  private subscribeToSuggestionsChange() {
    this.coveo.subscribe(state => {
      this.suggestions = state.results.list.map(result => ({
        uri: result.clickUri,
        title: result.title,
      }));
    });
  }

  private search(expression: string) {
    this.coveo.search(expression);
  }

  onFocus() {
    this.focused = true;
  }

  onBlur() {
    this.focused = false;
  }

  onTyped(e: Event) {
    this.search((e.currentTarget as HTMLInputElement).value);
  }

  ngOnInit(): void {
    this.subscribeToSuggestionsChange();
  }
}

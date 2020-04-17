import {Component, OnInit} from '@angular/core';
import {CoveoService} from '../coveo.service';
import {QueryStateModelService} from '../query-state-model.service';

export interface SearchboxSuggestion {
  title: string;
  uri: string;
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

  private lastExpression: string;
  private lastFocusTime: number;

  constructor(private queryStateModel: QueryStateModelService, private coveo: CoveoService) {}

  private subscribeToSuggestionsChange() {
    this.coveo.subscribe(state => {
      if (state.query.expression !== this.lastExpression) {
        return;
      }
      this.suggestions = state.results.list.map(result => ({
        uri: result.clickUri,
        title: result.title,
      }));
    });
  }

  private fetchSuggestions(expression: string) {
    this.lastExpression = expression;
    this.coveo.search(expression);
  }

  onFocus() {
    this.focused = true;
    this.lastFocusTime = Date.now();
  }

  onBlur() {
    const blurTime = Date.now();
    setTimeout(() => {
      if (this.lastFocusTime > blurTime) {
        return;
      }
      this.focused = false;
    }, 100);
  }

  onTyped(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      this.queryStateModel.expression = (e.currentTarget as HTMLInputElement).value;
      e.stopPropagation();
    }
    this.fetchSuggestions((e.currentTarget as HTMLInputElement).value);
  }

  ngOnInit(): void {
    this.subscribeToSuggestionsChange();
  }
}

import { Component, OnInit, Output, ChangeDetectorRef } from '@angular/core';
import { ISearchResult } from './result.component';
import { CoveoService } from '../coveo.service';
import { QueryStateModelService } from '../query-state-model.service';

@Component({
  selector: 'app-resultlist',
  templateUrl: './resultlist.component.html',
  styleUrls: ['./resultlist.component.scss']
})
export class ResultListComponent implements OnInit {
  results: ISearchResult[] = [];

  static get tagname() {
    return 'resultlist';
  }

  private get queryStateExpression() {
    return this.queryStateModel.expression;
  }

  constructor(private cdr: ChangeDetectorRef, private coveo: CoveoService, private queryStateModel: QueryStateModelService) {}

  public search() {
    if (this.queryStateExpression) {
      this.coveo.search(this.queryStateExpression);
    }
  }

  private subscribeToSuggestionsChange() {
    this.coveo.subscribe(state => {
      if (state.query.expression !== this.queryStateExpression) {
        return;
      }
      this.results = state.results.list.map(result => ({
        title: result.title,
        uri: result.clickUri,
      }));
      this.cdr.detectChanges();
    });
  }

  ngOnInit(): void {
    this.subscribeToSuggestionsChange();
    this.search();
  }
}

import {Component, OnInit, Input} from '@angular/core';
import {SearchboxSuggestion} from './searchbox.component';

@Component({
  selector: 'app-searchbox-suggestions',
  templateUrl: './searchboxsuggestions.component.html',
  styleUrls: ['./searchboxsuggestions.component.scss'],
})
export class SearchboxSuggestionsComponent implements OnInit {
  @Input() suggestions: SearchboxSuggestion[];

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  ngOnInit() {}
}

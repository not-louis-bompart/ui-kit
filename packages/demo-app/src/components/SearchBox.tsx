import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {engine} from '../Engine';
import {SearchBox as HeadlessSearchBox, SearchBoxState} from '@coveo/headless';

export default class SearchBox extends React.Component {
  state!: SearchBoxState;
  private headlessSearchBox!: HeadlessSearchBox;

  componentWillMount() {
    this.headlessSearchBox = new HeadlessSearchBox(engine);
    this.headlessSearchBox.subscribe(() => this.updateState());
  }

  private updateState() {
    this.setState(this.headlessSearchBox.state);
  }

  render() {
    return (
      <Autocomplete
        inputValue={this.state.value}
        onInputChange={(_, newInputValue) => {
          this.headlessSearchBox.updateText(newInputValue);
        }}
        onChange={() => {
          this.headlessSearchBox.submit();
        }}
        onFocus={() => {
          this.headlessSearchBox.showSuggestions();
        }}
        id="controllable-states-demo"
        options={this.state.suggestions.map(suggestion => suggestion.value)}
        freeSolo
        style={{width: 300}}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Search"
            variant="outlined"
            size="small"
          />
        )}
      />
    );
  }
}

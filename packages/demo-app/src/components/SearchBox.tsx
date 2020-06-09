import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default class SearchBox extends React.Component {
  state = {value: ''};

  render() {
    return (
      <Autocomplete
        inputValue={this.state.value}
        onInputChange={(_, newInputValue) => {
          this.setState({value: newInputValue});
        }}
        id="controllable-states-demo"
        options={['suggestion 1', 'suggestion 2', 'suggestion 3']}
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

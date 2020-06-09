import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';

const options = ['Suggestion', 'Another suggestion'];

export default class SearchBox extends React.Component {
  state = {
    value: null,
    inputValue: '',
  };

  render() {
    return (
      <Autocomplete
        value={this.state.value}
        freeSolo
        onChange={(_, newValue: string | null) => {
          this.setState({value: newValue});
        }}
        inputValue={this.state.inputValue}
        onInputChange={(_, newInputValue) => {
          this.setState({inputValue: newInputValue});
        }}
        id="controllable-states-demo"
        options={options}
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

import React from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

export default class GradeWeight extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: '',
        };
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e) {
        const onlyNums = e.target.value.replace(/[^0-9]/g, '');
        if (onlyNums.length >= 0 && onlyNums <= 100) {
            this.setState({ value: onlyNums });
        }
    }
    render() {
        return (
            <div>
                <TextField
                    id='weight-input'
                    name="weight"
                    placeholder="Weight"
                    inputProps={{style: { textAlign: 'center'}}}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">%</InputAdornment>
                    }}
                    onChange={this.handleChange}
                    value={this.state.value}
                />
            </div>
        );
    }
}
import React from 'react';
import Formsy from 'formsy-react';
import Radium from 'radium';
import Select from 'react-select';
import _ from 'lodash';

let Input = React.createClass({
    mixins: [Formsy.Mixin],
    styles() {
        return {
            container: {
              textAlign: 'center',
              margin: '10px 0',
            },
            label: {
              textAlign: 'right',
              width: '30%',
              display: 'inline-block',
              paddingRight: '5px',
            },
            input: {
              width: '60%',
              display: 'inline-block',
            },
        };
    },
    changeValue(event) {
        if (this.props.type === 'checkbox') {
            this.setValue(event.currentTarget.checked);
        } else if (this.props.type === 'file') {
            this.setValue(event.currentTarget.files[0]);
        } else {
            this.setValue(event.currentTarget.value);
        }
    },
    reset() {
        this.resetValue();
        this.input.value = '';
    },
    render() {
        const className = `form-group${this.props.className || ' '
          }${this.showRequired() ? 'required' : this.showError() ? 'error' : ''}`;

         // An error message is returned ONLY if the component is invalid
         // or the server has returned an error message

         return (
           <div className={className} style={this.styles().container}>
             <label style={this.styles().label} htmlFor={this.props.name}>
               {this.props.title}
             </label>
             <input
               ref={(input) => { this.input = input; }}
               style={this.styles().input}
               type={this.props.type || 'text'}
               name={this.props.name}
               onChange={this.changeValue}
               checked={this.props.type === 'checkbox' && this.getValue() ? 'checked' : null}
             />
           </div>
        );
    },
});
Input = Radium(Input);

let SelectInput = React.createClass({
    mixins: [Formsy.Mixin],

    styles() {
        return {
            container: {
              textAlign: 'center',
              margin: '10px 0',
            },
            label: {
              width: '30%',
              display: 'inline-block',
              paddingRight: '5px',
              textAlign: 'right',
            },
            input: {
              textAlign: 'initial',
              width: '60%',
              display: 'inline-block',
            },
        };
    },

    changeValue(options) {
      this.setValue(_.map(options, option => option.value));
    },

    render() {
        const className = `form-group${this.props.className || ' '
          }${this.showRequired() ? 'required' : this.showError() ? 'error' : ''}`;

        const otherProps = _.omit(this.props, ['title', 'className', 'required']);
        otherProps.className = 'mybiblestudy';
        otherProps.onChange = this.changeValue;
        otherProps.value = this.getValue();

        let select = <Select {...otherProps} />;
        if (this.props.loadOptions) {
            select = <Select.Async {...otherProps} />;
        }

        return (
          <div style={this.styles().container} className={className}>
            <label style={this.styles().label} htmlFor={this.props.name}>{this.props.title}</label>
            <Radium.Style scopeSelector=".Select.mybiblestudy" rules={this.styles().input} />
            {select}
          </div>
        );
    },

});
SelectInput = Radium(SelectInput);

let TextInput = React.createClass({
    mixins: [Formsy.Mixin],

    styles() {
        return {
            container: {
              textAlign: 'center',
              margin: '10px 0',
            },
            label: {
              width: '30%',
              display: 'inline-block',
              paddingRight: '5px',
              textAlign: 'right',
            },
            input: {
              width: '60%',
              display: 'inline-block',
            },
        };
    },

    changeValue(event) {
      this.setValue(event.currentTarget.value);
    },

    reset() {
        this.resetValue();
        this.input.value = '';
    },

    render() {
      const className = `form-group${this.props.className || ' '
        }${this.showRequired() ? 'required' : this.showError() ? 'error' : ''}`;

      return (
        <div style={this.styles().container} className={className}>
          <label style={this.styles().label} htmlFor={this.props.name}>
            {this.props.title}
          </label>
          <textarea
            ref={(input) => { this.input = input; }}
            style={this.styles().input}
            name={this.props.name}
            onChange={this.changeValue}
            value={this.getValue()}
          />
        </div>
      );
    },
});
TextInput = Radium(TextInput);

const EmailInput = props => (
  <Input
    type="email"
    validations="isEmail"
    validationError="This is not a valid email"
    {...props}
  />
);

const PasswordInput = props => <Input type="password" {...props} />;

const FileInput = props => <Input type="file" {...props} />;

export {
    Input,
    EmailInput,
    PasswordInput,
    SelectInput,
    TextInput,
    FileInput,
};

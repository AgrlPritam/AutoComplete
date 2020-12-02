import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Autocomplete extends Component {
    //For requiring a prop of Array type in AutoComplete component
  static propTypes = {
    countries: PropTypes.instanceOf(Array).isRequired
  };

  //Current state of the search component
  state = {
    activeOption: 0,
    filteredCountry: [],
    showOptions: false,
    userInput: ''
  };

  //Listening to event change in input text
  onChange = (e) => {
    const { countries } = this.props;
    const userInput = e.currentTarget.value;

    //Filtering the array w.r.t the available options
    const filteredCountry = countries.filter((country) =>
        country.toLowerCase().includes(userInput.toLowerCase())
    );

    //Setting the state for dynamic loading of contents
    this.setState({
      activeOption: 0,
      filteredCountry,
      showOptions: true,
      userInput: e.currentTarget.value
    });
  };

  //selecting country from options when one is hovered upon
  onClick = (e) => {
    this.setState({
      activeOption: 0,
      filteredCountry: [],
      showOptions: false,
      userInput: e.currentTarget.innerText
    });
  };

  //Navigating through options
  onKeyDown = (e) => {
    const { activeOption, filteredCountry } = this.state;

    //checking if enter is pressed
    if (e.keyCode === 13) {
      this.setState({
        activeOption: 0,
        showOptions: false,
        userInput: filteredCountry[activeOption]
      });
    } else if (e.keyCode === 38) {      //checking if up arrow is pressed and options are available
      if (activeOption === 0) {
        return;
      }
      this.setState({ activeOption: activeOption - 1 });
    } else if (e.keyCode === 40) {      //checking if down arrow is pressed and options are available
      if (activeOption === filteredCountry.length - 1) {
        console.log(activeOption);
        return;
      }
      this.setState({ activeOption: activeOption + 1 });
    }
  };

  render() {
      //Accessing the functions and state from parent class
    const {
      onChange,
      onClick,
      onKeyDown,
      state: { activeOption, filteredCountry, showOptions, userInput }
    } = this;

    let optionList;
    if (showOptions && userInput) {
      if (filteredCountry.length) {
        optionList = (
          <ul className="options">
            {filteredCountry.map((country, index) => {
              let className;
              if (index === activeOption) {
                className = 'option-active';
              }
              return (
                <li className={className} key={country} onClick={onClick}>
                  {country}
                </li>
              );
            })}
          </ul>
        );
      } else {
        optionList = (
          <div className="no-options">
            <em>No Country Found!</em>
          </div>
        );
      }
    }
    return (
      <React.Fragment>
        <div className="search">
          <input
            type="text"
            placeholder = "Enter Country starting with 'I'"
            className="search-box"
            onChange={onChange}
            onKeyDown={onKeyDown}
            value={userInput}
          />
          <input type="submit" value="" className="search-btn" />
        </div>
        {optionList}
      </React.Fragment>
    );
  }
}

export default Autocomplete;
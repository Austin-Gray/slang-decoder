import React, { Component } from 'react';
import './App.css';
import Dictionary from './Dictionary.js';
import Slang from './Slang.js';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      dictionary: '',
      slang: '',
    }
    this.handleChange   = this.handleChange.bind(this);
    this.checkForSubmit = this.checkForSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  checkForSubmit(e) {
    if (e.key === 'Enter') this.handleSubmit();
  }

  handleSubmit() {
    axios({
      url: `https://wordsapiv1.p.mashape.com/words/${this.state.search}/definitions`,
      method: 'get',
      headers: {"X-Mashape-Key": process.env.REACT_APP_KEY}
    })
      .then(
        response => this.setState({dictionary: response.data.definitions[0].definition}),
      )
      .catch(
        error => this.setState({dictionary: 'Your search does not have a dictionary definition'})
      );
    axios({
      url: `https://mashape-community-urban-dictionary.p.mashape.com/define?term=${this.state.search}`,
      method: 'get',
      headers: {"X-Mashape-Key": process.env.REACT_APP_KEY}
    })
      .then(
        response => this.setState({slang: response.data.list[0].definition}),
      )
      .catch(
        error => this.setState({dictionary: 'Your search does not have a slang definition'})
      );
    
  }

  render() {
    return (
      <div className='App'>
        <header className='App-header'>
          <h1 className='App-title text-light mt-3'>Slango</h1>
        </header>
        <div className='search-section ml-2 mr-2'>
          <div className='form-group ml-5 mr-5'>
            <input name='search' className='form-control-text form-control-lg' type='text' onKeyDown={this.checkForSubmit} onChange={this.handleChange}/>
          </div>
          <div className='row m-5'>
            <div className='col-6'>
              <Dictionary result={this.state.dictionary}/>
            </div>
            <div className='col-6'>
              <Slang result={this.state.slang}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

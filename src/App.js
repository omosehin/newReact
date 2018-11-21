import React, { Component } from 'react';
import Person from './Person/Person';

import './App.css';



class App extends Component {
  state = {
    Persons: [
      { id: 'abc', name: 'Ade', age: 14 },
      { id: 'def', name: 'Seyi', age: 23 },
      { id: 'jkl', name: 'Tunde', age: 10 }
    ],
    otherState: 'some other changes',
    showPersons: false
  }


  nameChangeHandler = (event, id) => {
    const personIndex = this.state.Persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
      ...this.state.Persons[personIndex]
    };

    person.name = event.target.value;
    const Persons = [...this.state.Persons];
    Persons[personIndex] = person;

    this.setState({
      Persons: Persons
    })
  }

  deletePersonHandler = (personIndex) => {
    const Persons = [...this.state.Persons];
    Persons.splice(personIndex, 1);
    this.setState({ Persons: Persons })
  }

  togglePersonHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({ showPersons: !doesShow });
  }
  render() {
    const styleButton = {
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer',

    };

    let persons = null;

    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.Persons.map((person, index) => {
            return <Person
              click={() => this.deletePersonHandler(index)}
              name={person.name}
              age={person.age}
              key={person.id}
              changed={(event) => this.nameChangeHandler(event, person.id)}
            />
          }
          )

          }

        </div>
      );
      styleButton.backgroundColor = 'red';

    };

    const classes = [];
    if (this.state.Persons.length <= 2) {
      classes.push('red');
    }

    if (this.state.Persons.length <= 1) {
      classes.push('bold');
    }


    return (

      <div className="App">
        <h1>HI</h1>
        <p className={classes.join(' ')}> Hello ,I am learning react</p>
        <button
          style={styleButton}
          onClick={this.togglePersonHandler}>Switch Name</button>
        {persons}
      </div>

    );
  }
}

export default App;

// import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <p>
//             Edit <code>src/App.js</code> and save to reload.
//           </p>
//           <a
//             className="App-link"
//             href="https://reactjs.org"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Learn React
//           </a>
//         </header>
//       </div>
//     );
//   }
// }

// export default App;

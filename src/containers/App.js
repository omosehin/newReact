import React, { PureComponent } from "react";
import Persons from "../components/Persons/Persons";
import Cockpit from "../components/Cockpit/Cockpit";
import Aux from "../hoc/Aux";
import withClass from "../hoc/withClass";
import classes from "./App.css";

class App extends PureComponent {
  constructor(props) {
    super(props);
    console.log("[App.js] Inside Constructor", props);
    this.state = {
      persons: [
        { id: "abc", name: "Ade", age: 14 },
        { id: "def", name: "Seyi", age: 23 },
        { id: "jkl", name: "Tunde", age: 10 }
        //id can be anything unique
      ],
      otherState: "some other changes",
      showPersons: false,
      toggleClicked: 0
    };
  }

  componentWillMount() {
    console.log("[App.js] Inside componentWillMount()");
  }
  componentDidMount() {
    console.log("[App.js] Inside componentDidMount()");
  }

  componentWillUpdate(nextProps, nextState) {
    console.log(
      "[UPDATE App.js] Inside componentWillUpdate",
      nextProps,
      nextState
    );
  }

  nameChangeHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      //p is upto you to name
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    };

    person.name = event.target.value;
    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({ persons: persons });
  };
  //This is the method definition with name
  //and arg personIndex which sould be the number of the person.
  deletePersonHandler = personIndex => {
    //const persons= this.state.persons.slice() this create a copy
    //of the array so that it does not mutate the array.spread operator is an alternative
    //he defines constant persons from the state of the component
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1); //splice remove one array,personIndex refer to individual element in the array
    this.setState({ persons: persons }); //we update the person when one array has been removed
  };

  togglePersonHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState((prevState, props) => {
      return {
        showPersons: !doesShow,
        toggleClicked: prevState.toggleClicked + 1
      };
    });
    //showPersons is equal to what doesPerson is not
    //If doesShow is true it will set showPerson to false
    //if doesShow is false it will  set showPerson to true
    //The ternary method for toggle is not good because
    //it can become confusing with many Jsk i:e nested
  };
  render() {
    console.log("[App.js] Inside render()");

    let persons = null;

    //you can make persons as any name of your choice

    if (this.state.showPersons) {
      persons = (
        <Persons
          persons={this.state.persons}
          clicked={this.deletePersonHandler}
          changed={this.nameChangeHandler}
        />
      );
    }

    return (
      <Aux>
        <button
          onClick={() => {
            this.setState({ showPersons: true });
          }}
        >
          show Persons
        </button>
        <Cockpit
          appTitle={this.props.title}
          showPersons={this.state.showPersons}
          persons={this.state.persons}
          clicked={this.togglePersonHandler}
        />
        {persons}
      </Aux>
      //this one refer to the person with null up there.
    );
  }
}

export default withClass(App, classes.App);

// https://stackoverflow.com/questions/48855882/deleting-component-from-array-of-components

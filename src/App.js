import './App.css';
import Autocomplete from "./AutoComplete";

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h2>
        AutoComplete Functionality
        </h2>
      </header>
      <Autocomplete
        countries={[
          "Iceland",
          "India",
          "Indonesia",
          "Iran",
          "Iraq",
          "Ireland",
          "Israel",
          "Italy"
        ]}
      />
    </div>
  );
}

export default App;

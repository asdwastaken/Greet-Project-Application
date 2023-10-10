import './app.css';
import Home from './components/Home/Home';
import Navigation from './components/Navigation/Navigation';

function App() {
  return (
    <div className="App">
      <Navigation />

      <main>
        <Home />
      </main>
    </div>
  );
}

export default App;

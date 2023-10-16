import './app.css';
import Navigation from './components/Navigation/Navigation';
import RoutesComp from './components/RoutesComp';
import { ContextProvider } from './context/context';

function App() {


  return (
    <ContextProvider>
      <div className="App">
        <header>
          <Navigation />
        </header>

        <main>
          <RoutesComp />
        </main>
      </div>
    </ContextProvider>
  );
}

export default App;

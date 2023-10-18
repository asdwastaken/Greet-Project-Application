import './app.css';
import Footer from './components/Footer/Footer';
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
        <Footer />
        </main>
      </div>
    </ContextProvider>
  );
}

export default App;

import './App.css';
import WidgetBuilder from './components/WidgetBuilder';
import AdvancedWidgetBuilder from './components/AdvancedWidgetBuilder'; // new import

function App() {
     return (
          <div>
               <h1>Basic Widget Builder</h1>
               <WidgetBuilder />
               <br />
               <h1>Advanced Widget Builder</h1>
               <AdvancedWidgetBuilder /> 
          </div>
     );
}

export default App;

import './App.css';
import WidgetBuilder from './screens/WidgetBuilder';
import AdvancedWidgetBuilder from './screens/AdvancedWidgetBuilder'; // new import
import DisplaySavedComponent from './screens/DisplaySavedComponent';

function App() {
     return (
          <div>
               <br />
               <button onClick={() => localStorage.clear()}>Clear Local Storage</button>

               {/* <h1>Basic Widget Builder</h1>
               <WidgetBuilder /> */}
               <br />
               <h1>Advanced Widget Builder</h1>
               <AdvancedWidgetBuilder /> 
               <br />
               <DisplaySavedComponent />
          </div>
     );
}

export default App;

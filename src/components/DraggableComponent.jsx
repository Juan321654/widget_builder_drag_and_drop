import Draggable from "react-draggable";
import { buttonNames } from "../helpers/buttonNamesDictionary";

function ButtonOn() {
     const handleClick = () => console.log("On Clicked");
     return <button onClick={handleClick}>On</button>
}

function ButtonOff() {
     return <button>Off</button>
}

function Card() {
     return <div style={{ border: '1px solid red', padding: '5px' }}>Card</div>

}

function DefaultComponent() {
     return <div>Default Component</div>
}

function DraggableComponent({ widgetData = {}, updatePosition = () => { }, deleteComponent = () => { }, disabled = false }) {
     let componentToRender = <DefaultComponent />;
     if (widgetData.type === buttonNames.btnOn) componentToRender = <ButtonOn />;
     if (widgetData.type === buttonNames.btnOff) componentToRender = <ButtonOff />;
     if (widgetData.type === buttonNames.card) componentToRender = <Card />;

     const handleRightClick = (e) => {
          e.preventDefault(); // Prevent the default context menu from showing up
          deleteComponent(widgetData.id);
     };

     return (
          <Draggable position={widgetData.position} onDrag={(e, data) => updatePosition(widgetData.id, { x: data.x, y: data.y })} disabled={disabled}>
               <div style={{ position: 'absolute' }} onContextMenu={handleRightClick}>
                    {componentToRender}
               </div>
          </Draggable>
     );
}

export default DraggableComponent;
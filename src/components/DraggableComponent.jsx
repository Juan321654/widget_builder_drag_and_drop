import Draggable from "react-draggable";
import { buttonNames } from "../helpers/buttonNamesDictionary";

function DraggableComponent({ widgetData = {}, updatePosition = () => { }, deleteComponent = () => { }, disabled = false }) {
     let componentToRender = null;
     if (widgetData.type === buttonNames.btnOn) componentToRender = <button>On</button>;
     if (widgetData.type === buttonNames.btnOff) componentToRender = <button>Off</button>;
     if (widgetData.type === buttonNames.card) componentToRender = <div style={{ border: '1px solid red', padding: '5px' }}>Card</div>;

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
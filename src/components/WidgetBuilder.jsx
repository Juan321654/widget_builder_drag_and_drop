import React, { useState, useEffect } from 'react';
import Draggable from 'react-draggable';

const WIDTH = 400;
const HEIGHT = 300;

const DraggableButton = ({ id, position, updatePosition }) => {
     const handleDrag = (e, data) => {
          updatePosition(id, { x: data.x, y: data.y });
     };

     return (
          <Draggable
               position={position}
               onDrag={handleDrag}
          >
               <button>Button {id}</button>
          </Draggable>
     );
};

const WidgetBuilder = () => {
     const [buttons, setButtons] = useState([
          { id: 1, position: { x: 10, y: 10 } },
          { id: 2, position: { x: 100, y: 10 } },
     ]);

     useEffect(() => {
          loadWidgetState();
     }, []);

     const updatePosition = (id, newPosition) => {
          // if (newPosition.x < 0) newPosition.x = 0;
          // if (newPosition.y < 0) newPosition.y = 0;
          // if (newPosition.x > WIDTH || newPosition.y > HEIGHT) return;

          setButtons((prevButtons) => {
               return prevButtons.map((b) => b.id === id ? { ...b, position: newPosition } : b)
          });
     };

     const saveWidgetState = () => {
          localStorage.setItem('widgetState', JSON.stringify(buttons));
     };

     const loadWidgetState = () => {
          const savedState = JSON.parse(localStorage.getItem('widgetState'));
          if (savedState) setButtons(savedState);
     };

     return (
          <div>
               <h3>Widget Builder</h3>
               <button onClick={saveWidgetState}>Save</button>
               <button onClick={loadWidgetState}>Load</button>
               <div style={{ width: WIDTH, height: HEIGHT, border: '1px solid black', position: 'relative' }}>
                    {buttons.map((btn) =>
                         <DraggableButton key={btn.id} id={btn.id} position={btn.position} updatePosition={updatePosition} />
                    )}
               </div>
          </div>
     );
};

export default WidgetBuilder;

import React, { useState, useEffect } from 'react';
import Draggable from 'react-draggable';

const buttonNames = {
     btnOn: "btnOn",
     btnOff: "btnOff",
     card: "card"
}

const AdvancedWidgetBuilder = () => {
     const [components, setComponents] = useState([]);

     useEffect(() => {
          loadWidgetState();
     }, []);

     const addComponent = (type) => {
          const newId = components.length + 1;
          const newComponent = { id: newId, type, position: { x: 0, y: 0 } };
          setComponents((prevComponents) => [...prevComponents, newComponent]);
     };

     const updatePosition = (id, newPosition) => {
          setComponents((prevComponents) =>
               prevComponents.map((comp) =>
                    comp.id === id ? { ...comp, position: newPosition } : comp
               )
          );
     };

     const deleteComponent = (id) => {
          setComponents((prevComponents) =>
               prevComponents.filter((comp) => comp.id !== id)
          );
     };

     const saveWidgetState = () => {
          localStorage.setItem('widgetState', JSON.stringify(components));
     };

     const loadWidgetState = () => {
          const savedState = JSON.parse(localStorage.getItem('widgetState'));
          if (savedState) {
               setComponents(savedState);
          }
     };

     return (
          <div style={{ display: 'flex', gap: '1rem' }}>
               <div>
                    <h3>Components</h3>
                    <button onClick={() => addComponent(buttonNames.btnOn)}>On</button>
                    <button onClick={() => addComponent(buttonNames.btnOff)}>Off</button>
                    <button onClick={() => addComponent(buttonNames.card)}>Card</button>
               </div>

               <div>
                    <button onClick={saveWidgetState}>Save</button>
                    <button onClick={loadWidgetState}>Load</button>
               </div>

               <div style={{ width: 400, height: 300, border: '1px solid black', position: 'relative' }}>
                    {
                         components.map((comp) => {
                              return (
                                   <DraggableComponent key={comp.id} comp={comp} updatePosition={updatePosition} deleteComponent={deleteComponent}></DraggableComponent>
                              );
                         })
                    }
               </div>
          </div>
     );
};

function DraggableComponent({ comp = {}, updatePosition = () => { }, deleteComponent = () => { } }) {
     let componentToRender = null;
     if (comp.type === buttonNames.btnOn) componentToRender = <button>On</button>;
     if (comp.type === buttonNames.btnOff) componentToRender = <button>Off</button>;
     if (comp.type === buttonNames.card) componentToRender = <div style={{ border: '1px solid red', padding: '5px' }}>Card</div>;

     const handleRightClick = (e) => {
          e.preventDefault(); // Prevent the default context menu from showing up
          deleteComponent(comp.id);
     };

     return (
          <Draggable position={comp.position} onDrag={(e, data) => updatePosition(comp.id, { x: data.x, y: data.y })}>
               <div style={{ position: 'absolute' }} onContextMenu={handleRightClick}>
                    {componentToRender}
               </div>
          </Draggable>
     );
}

export default AdvancedWidgetBuilder;

import React, { useState, useEffect } from 'react';
import Draggable from 'react-draggable';

const DraggableButton = ({ id, position, updatePosition, text = "" }) => {
     const handleDrag = (e, data) => {
          updatePosition(id, { x: data.x, y: data.y });
     };

     return (
          <Draggable
               position={position}
               onDrag={handleDrag}
          >
               <button>{text} {id}</button>
          </Draggable>
     );
};

const DraggableCard = ({ id, position, updatePosition }) => {
     const handleDrag = (e, data) => {
          updatePosition(id, { x: data.x, y: data.y });
     };

     return (
          <Draggable
               position={position}
               onDrag={handleDrag}
          >
               <div style={{ border: '1px solid blue', padding: '10px' }}>
                    Card {id}
               </div>
          </Draggable>
     );
};

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
          <div style={{ display: 'flex' }}>
               <div style={{ marginRight: '20px' }}>
                    <h3>Components</h3>
                    <button onClick={() => addComponent('button')}>Add Button</button>
                    <button onClick={() => addComponent('btnOn')}>On</button>
                    <button onClick={() => addComponent('card')}>Add Card</button>
                    <button onClick={saveWidgetState}>Save</button>
                    <button onClick={loadWidgetState}>Load</button>
               </div>

               <div style={{ width: 400, height: 300, border: '1px solid black', position: 'relative' }}>
                    {
                         components.map((comp) => {
                              if (comp.type === 'button') return <DraggableButton key={comp.id} id={comp.id} position={comp.position} updatePosition={updatePosition} />
                              if (comp.type === 'card') return <DraggableCard key={comp.id} id={comp.id} position={comp.position} updatePosition={updatePosition} />
                              if (comp.type === 'btnOn') return <DraggableButton key={comp.id} id={comp.id} position={comp.position} updatePosition={updatePosition} text="On" />
                         })
                    }
               </div>
          </div>
     );
};

export default AdvancedWidgetBuilder;

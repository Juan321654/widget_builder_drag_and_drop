import React, { useState, useEffect } from 'react';
import { buttonNames } from '../helpers/buttonNamesDictionary';
import DraggableComponent from '../components/DraggableComponent';

const AdvancedWidgetBuilder = () => {
     const [components, setComponents] = useState([]);

     useEffect(() => {
          loadWidgetState();
     }, []);

     const addComponent = (type) => {
          const newId = components.length + 1;
          const newComponent = { id: newId, type, position: { x: -100, y: 100 } };
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

               <div style={{ backgroundColor: 'lightgray'}}>
                    <button onClick={saveWidgetState}>Save</button>
                    <button onClick={loadWidgetState}>Load</button>
               </div>

               <div style={{ width: 400, height: 300, border: '1px solid black', position: 'relative' }}>
                    {
                         components.map((comp) => {
                              return (
                                   <DraggableComponent key={comp.id} widgetData={comp} updatePosition={updatePosition} deleteComponent={deleteComponent}></DraggableComponent>
                              );
                         })
                    }
               </div>
          </div>
     );
};


export default AdvancedWidgetBuilder;

import React from 'react';
import DraggableComponent from '../components/DraggableComponent';

function DisplaySavedComponent() {

     const widgetStateData = JSON.parse(localStorage.getItem('widgetState'));

     return (
          <div style={{ width: 400, height: 300, border: '1px solid black', position: 'relative' }}>
               {
                    widgetStateData.map((comp) => {
                         return <DraggableComponent key={comp.id} widgetData={comp} disabled />
                    })
               }
          </div>
     )
}

export default DisplaySavedComponent
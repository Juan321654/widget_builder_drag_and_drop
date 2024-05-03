import React, { useState, useEffect } from 'react';
import Draggable from 'react-draggable';

const DraggableButton = ({ id, text, position, updateText, updatePosition }) => {
    const handleDrag = (e, data) => {
        updatePosition(id, { x: data.x, y: data.y });
    };

    const handleTextChange = (e) => {
        updateText(id, e.target.value);
    };

    return (
        <Draggable
            position={position}
            onDrag={handleDrag}
        >
            <div style={{ position: 'absolute', top: position.y, left: position.x }}>
                <input type="text" value={text} onChange={handleTextChange} />
            </div>
        </Draggable>
    );
};

const DraggableCard = ({ id, text, position, updateText, updatePosition }) => {
    const handleDrag = (e, data) => {
        updatePosition(id, { x: data.x, y: data.y });
    };

    const handleTextChange = (e) => {
        updateText(id, e.target.value);
    };

    return (
        <Draggable
            position={position}
            onDrag={handleDrag}
        >
            <div style={{ border: '1px solid blue', padding: '10px', position: 'absolute', top: position.y, left: position.x }}>
                <input type="text" value={text} onChange={handleTextChange} />
            </div>
        </Draggable>
    );
};

const EditableTextWidgetBuilder = () => {
    const [components, setComponents] = useState([]);

    useEffect(() => {
        loadWidgetState();
    }, []);

    const addComponent = (type) => {
        const newId = components.length + 1;
        const newComponent = { id: newId, type, text: `Component ${newId}`, position: { x: 0, y: 0 } };
        setComponents((prevComponents) => [...prevComponents, newComponent]);
    };

    const updateText = (id, newText) => {
        setComponents((prevComponents) =>
            prevComponents.map((comp) =>
                comp.id === id ? { ...comp, text: newText } : comp
            )
        );
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
                <button onClick={() => addComponent('card')}>Add Card</button>
                <button onClick={saveWidgetState}>Save</button>
                <button onClick={loadWidgetState}>Load</button>
            </div>

            <div style={{ width: 400, height: 300, border: '1px solid black', position: 'relative' }}>
                {components.map((comp) =>
                    comp.type === 'button' ? (
                        <DraggableButton key={comp.id} id={comp.id} text={comp.text} position={comp.position} updateText={updateText} updatePosition={updatePosition} />
                    ) : (
                        <DraggableCard key={comp.id} id={comp.id} text={comp.text} position={comp.position} updateText={updateText} updatePosition={updatePosition} />
                    )
                )}
            </div>
        </div>
    );
};

export default EditableTextWidgetBuilder;

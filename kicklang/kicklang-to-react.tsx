import React, { useState } from 'react'

// kicklang-to-react.tsx
function compileElement(element) {
    switch (element.type) {
        case 'button':
            return (
                <button
                    id={element.id}
                    onClick={element.events.onClick}
                >
                    {element.label}
                </button>
            );
        case 'text':
            return (
                <input
                    type="text"
                    id={element.id}
                    placeholder={element.label}
                    value={element.value}
                    onChange={element.events.onChange}
                />
            );
        case 'checkbox':
            return (
                <input
                    type="checkbox"
                    id={element.id}
                    checked={element.checked}
                    onChange={element.events.onChange}
                />
            );
        case 'radio-group':
            return (
                <div>
                    {element.label}
                    {element.options.map((option) => (
                        <label key={option.value}>
                            <input
                                type="radio"
                                value={option.value}
                                checked={element.selectedValue === option.value}
                                onChange={element.events.onChange}
                            />
                            {option.label}
                        </label>
                    ))}
                </div>
            );
        case 'select':
            return (
                <select
                    id={element.id}
                    value={element.selectedValue}
                    onChange={element.events.onChange}
                >
                    {element.options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            );
        case 'slider':
            return (
                <div>
                    <label htmlFor={element.id}>{element.label}</label>
                    <input
                        type="range"
                        id={element.id}
                        min={element.min}
                        max={element.max}
                        value={element.value}
                        onChange={element.events.onChange}
                    />
                </div>
            );
        default:
            return null;
    }
}

function compileContainer(container) {
    const elements = container.elements.map(compileElement);
    return (
        <form
            id={container.id}
            onSubmit={container.events.onSubmit}
        >
            {elements}
        </form>
    );
}

function compileUI(ui) {
    const containers = ui.containers.map(compileContainer);
    return (
        <div>
            {containers}
        </div>
    );
}

// Beispiel KickLang-Definition
const kickLangUI = {
    containers: [
        {
            type: "Form",
            id: "main-form",
            elements: [
                { type: "textfield", id: "name-input", label: "Name", value: "", events: { onChange: "updateName" } },
                { type: "button", id: "submit-btn", label: "Submit", events: { onClick: "submitForm" } }
            ],
            events: { onSubmit: "processForm" }
        }
    ]
};

// Beispiel React-Komponente
const MainUI = () => {
//    const [name, setName] = useState('');

    const updateName = (event) => {
//        setName(event.target.value);
    };

    const submitForm = (event) => {
        event.preventDefault();
        console.log('Form submitted with name:', name);
    };

    const processForm = (name) => {
        console.log('Form processed with name:', name);
    };

    const compiledUI = compileUI(kickLangUI);

    console.log(kickLangUI)
    console.log(compiledUI)

    return compiledUI;
};

MainUI()

export default MainUI;
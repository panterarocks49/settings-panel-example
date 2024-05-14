
function reactButton() {
    // Declare a new state variable, which we'll call "count"
    const [count, setCount] = React.useState(0);

    return (
        React.createElement(
            "button",
            {className: "bp3-button",
             onClick: () => setCount(count + 1)},
            "my button " + count
        )
    );
}

// actions that are predefined save there state automatically (except button) underneath the id provided for the action
// custom actions can save state with extensionAPI.settings.set / get / getAll
const panelConfig = {
    tabTitle: "Test Ext 1",
    settings: [
        {id:          "button-setting",
         className:   "ext-settings-panel-button-setting",
         name:        "Button test",
         description: "tests the button",
         action:      {type:    "button",
                       onClick: (evt) => { console.log("Button clicked!"); },
                       content: "Button"}},
        {id:          "switch-setting",
         name:        "Switch Test",
         description: React.createElement("a", {href: "https:roamresearch.com"}, "Show off react components in the description"),
         action:      {type:     "switch",
                       onChange: (evt) => { console.log("Switch!", evt); }}},
        {id:     "input-setting",
         name:   "Input test",
         action: {type:        "input",
                  placeholder: "placeholder",
                  onChange:    (evt) => { console.log("Input Changed!", evt); }}},
        {id:     "select-setting",
         name:   "Select test",
         action: {type:     "select",
                  items:    ["one", "two", "three"],
                  onChange: (evt) => { console.log("Select Changed!", evt); }}},
        {id:     "reactComponent-setting",
         name:   "reactComponent test",
         action: {type:     "reactComponent",
                  component: reactButton}}
    ]
};

function onload({extensionAPI, ...rest}) {
    console.log(extensionAPI, rest);

    extensionAPI.settings.panel.create(panelConfig);

    console.log("Loaded Settings Panel Example");
    // secondary onunload function, called before the other one
    return () => console.log("Secondary onunload");
}

function onunload() {
    console.log("Unloaded Settings Panel Example");
}

export default {
    onload: onload,
    onunload: onunload
};

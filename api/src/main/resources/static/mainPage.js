const Id = ({
    NAME: "name",
    SURNAME: "surname",
    PROFESSION: "profession",
    EDUCATION: "education",
    INPUT_LANGUAGE: "inputLanguage",
    LEVEL_LANGUAGE: "levelLanguage",
    LANGUAGE: "language",
    LANGUAGES: "languages",
    ADD_LANGUAGE: "addLanguage",
    BUTTON_REMOVE: "removeButton",
    DOMAINS: "domains",
    DOMAIN: "domain",
    INPUT_DOMAIN: "domainInput",
    ADD_DOMAIN: "addDomain"
});
const Element = ({
    DIV: "div",
    BR: "br",
    INPUT: "input",
    BUTTON: "button",
    SELECT: "select",
    OPTION: "option",
    LABEL: "label",
    TITLE: "title"
});
const Label = ({
    LANGUAGE: "Language",
    LEVEL_LANGUAGE: "Level of language",
    TYPE: "Type ",
    REMOVE: "Remove",
    DOMAIN: "Domain",
})
const LEVEL_LANGUAGES = ["A1", "A2", "B1", "B2", "C1", "C2"];
const Event = ({CLICK: "click"});
const DO_NOT_FILL_OUT = "You do not fill out fields: ";

const Page_Element = [
    document.getElementById(Id.NAME),
    document.getElementById(Id.SURNAME),
    document.getElementById(Id.PROFESSION),
    document.getElementById(Id.EDUCATION),
    document.getElementById(Id.INPUT_LANGUAGE + "1"),
    document.getElementById(Id.ADD_LANGUAGE),
    document.getElementById(Id.DOMAIN),
    document.getElementById(Id.ADD_DOMAIN)
]

function limitTyping(inputElement) {
    inputElement.addEventListener('keydown', function (e) {
        if (e.key.match(/^[а-яА-я0-9]+$/)) return e.preventDefault();
        else return null;
    });
    inputElement.addEventListener('paste', function () {
        inputElement.value = inputElement.value.replace(/[a-zA-Z]/, "");
    });
}

function isEmptyInput(inputElement) {
    if (!inputElement.value) {
        inputElement.focus();
        return inputElement.getAttribute(Element.TITLE);
    } else return null;
}

function onSubmit() {
    let text = [];
    for (let i = 0; i < Page_Element.length; i++) {
        if (isEmptyInput(Page_Element[i])) text.push(isEmptyInput(Page_Element[i]));
    }
    if (text.length > 1) {
        for (let i = 0; i < text.length; i++) {
            text[i] = " " + text[i];
        }
    }
    if (text.length !== 0) {
        alert(DO_NOT_FILL_OUT + text);
        return false;
    }
}

Page_Element[5].onclick = function addLanguage() {
    let count = document.getElementById(Id.LANGUAGES).childElementCount + 1;
    let newDiv = document.createElement(Element.DIV);
    newDiv.appendChild(document.createElement(Element.BR));
    newDiv.appendChild(setInput(Id.INPUT_LANGUAGE + count, 15,
        Label.TYPE + Label.LANGUAGE.toLowerCase(), Label.LANGUAGE));
    newDiv.appendChild(setLabel(Id.INPUT_LANGUAGE + count, Label.LANGUAGE));
    newDiv.appendChild(setSelect(Id.LEVEL_LANGUAGE + count, Label.LEVEL_LANGUAGE,
        LEVEL_LANGUAGES));
    newDiv.appendChild(setLabel(Id.LEVEL_LANGUAGE + count, Label.LEVEL_LANGUAGE));
    newDiv.id = Id.LANGUAGE + count;
    newDiv.appendChild(setRemoveButton(Id.BUTTON_REMOVE + count, Id.LANGUAGES,
        Id.LANGUAGE + count, Label.REMOVE));
    document.getElementById(Id.LANGUAGES).appendChild(newDiv);
}
Page_Element[7].onclick = function addDomain() {
    let count = document.getElementById(Id.DOMAINS).childElementCount + 1;
    let newDiv = document.createElement(Element.DIV);
    newDiv.appendChild(document.createElement(Element.BR));
    newDiv.appendChild(setInput(Id.INPUT_DOMAIN + count, 15,
        Label.TYPE + Label.DOMAIN.toLowerCase(), Label.DOMAIN));
    newDiv.appendChild(setRemoveButton(Id.BUTTON_REMOVE + count, Id.DOMAINS,
        Id.DOMAIN + count, Label.REMOVE));
    newDiv.id = Id.DOMAIN + count;
    document.getElementById(Id.DOMAINS).appendChild(newDiv);
}

Page_Element.forEach(element => limitTyping(element));

function setInput(id, maxLength, placeholder, textNode) {
    let input = document.createElement(Element.INPUT);
    input.id = id;
    input.name = id;
    input.type = "text";
    input.maxLength = maxLength;
    input.placeholder = placeholder;
    input.appendChild(document.createTextNode(textNode));
    return input;
}

function setLabel(id, text) {
    let label = document.createElement(Element.LABEL);
    label.id = id;
    label.appendChild(document.createTextNode(text));
    return label;
}

function setSelect(id, textNode, options) {
    let select = document.createElement(Element.SELECT);
    options.forEach(option => {
        let optionElement = document.createElement(Element.OPTION);
        optionElement.value = option;
        optionElement.text = option;
        select.add(optionElement);
    })
    select.id = id;
    select.name = id;
    select.appendChild(document.createTextNode(textNode));
    return select;
}

function setRemoveButton(id, idParentDiv, idChildDiv, textNode) {
    let button = document.createElement(Element.BUTTON);
    button.id = id;
    button.type = Element.BUTTON;
    button.addEventListener(Event.CLICK, () => document.getElementById(idParentDiv).removeChild(document
        .getElementById(idChildDiv)));
    button.appendChild(document.createTextNode(textNode));
    return button;
}


const body = document.querySelector("#body");
let container = document.querySelector("#container");
const size = document.querySelector("#size");

const sizeButton = document.querySelector("#size-btn");
sizeButton.addEventListener("click", setUpSketchBoard);

const clearButton = document.querySelector("#clear-btn");
clearButton.addEventListener("click", clearBoard)

let num = 2

const invisibleButton = document.querySelector("#erase-btn");
invisibleButton.addEventListener("click", () => {
    num += 1
    console.log(num)
});

// Removes the previous grid and creates a new one
function clearBoard() {
    removePreviousContainer()

    if (size.value == "") {
        createNewGrid(16)
    } else {
        createNewGrid(size.value)
    }
}

// Creates the new grid if number is legal otherwise sends an alert
function setUpSketchBoard() {
    let number = parseInt(size.value)
    if (number < 101 && number > 0 && Number.isInteger(number)) {
        removePreviousContainer();
        createNewGrid(number);
    } else {
        alert("The number must be between 1 and 100 (inclusive)")
    }
}

// Removes the previous grid
function removePreviousContainer() {
    container.remove();
    container = document.createElement("div");
    container.setAttribute("id", "container");
    body.appendChild(container)
}

// Creates a new grid depending on whatever size the player wants
function createNewGrid(size) {
    for(let x = 0; x < size; x++) {
        let subContainer = document.createElement("div");
        subContainer.classList.add("sub-container");
        container.appendChild(subContainer)

        for(let y = 0; y < size; y++) {
            let square = document.createElement("div");
            square.classList.add("square");

            square.addEventListener("mouseover", () => {
                if (num % 2 == 0) {
                    square.setAttribute("style", `background-color: ${changeColor()};`);
                } else {
                    square.setAttribute("style", `background-color: white;`);
                }
            });

            subContainer.appendChild(square)
        }
    }
}

// Generates a random hex value for the color
function changeColor() {
    const options = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "a", "b", "c", "d", "e", "f"]
    let color = "#";

    for(let i = 0; i < 6; i++) {
        color += options[Math.floor(Math.random() * 16)]
    }

    return color
}

// Sets the site to automacitally be 16x16
createNewGrid(16)
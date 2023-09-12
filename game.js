const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {} 

function startGame() {
    state = {}
    showTextNode(1)
}

function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    textElement.innerText = textNode.text
    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }

    textNode.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('btn')
            button.addEventListener('click', () => selectOption(option))
            optionButtonsElement.appendChild(button)
        }
    })
}

function showOption(option) {
    return option.requiredState == null || option.requiredState(state)
}

function selectOption() {
    const nextTextNodeId = option.nextText
    if (nextTextNodeId <= 0) {
        return startGame()
    }
    state - Object.assign(state, option.setState)
    showTextNode(nextTextNodeId)
}

const textNodes = [
    {
        id: 1,
        text: 'You see a reptile store...',
        options: [
            {
                text: 'Walk in.',
                setState: { entrance: true},
                nextText: 2
            },
            {
                text: 'Walk away :(',
                nextText: -1
            }
        ]
    },
    {
        id: 2,
        text: 'You look into the building that is split into three sections.',
        options: [
            {
                text: 'Go to beginner section.',
                requiredState: (currentState) => currentState.entrance,
                setState: {entrance: false, beginner: true},
                nextText: 3
            },
            {
            text: 'Go to intermediate section.',
            requiredState: (currentState) => currentState.entrance,
            setState: {entrance: false, intermediate: true},
            nextText: 10
        },
        {
        text: 'Look around',
        nextText: 3
    },
    {
        id: 3,
        text: 'You see three different reptiles in beginner section.',
        options: [
            {
                text: 'Leopard Gecko',
                nextText: 4
            },
            {
                text: 'Crested Gecko',
                nextText: 5
            },
            {
                text: 'Sandfish Skink',
                nextText: 6
            },
            {
                id: 4,
                text: "You've chosen to learn about the leopard gecko. What will you learn?"
            },
        ]
    },
        ]
    }
]

startGame()
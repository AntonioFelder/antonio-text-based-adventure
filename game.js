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

function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}

const textNodes = [
  {
    id: 1,
    text: "You see a reptile store...",
    options: [
      {
        text: "Walk in.",
        setState: { entrance: true },
        nextText: 2
      },
      {
        text: "Walk in! >:(",
        setState: { entrance: true },
        nextText: 2
      }
    ]
  },
  {
    id: 2,
    text: "You look into the store. It's split into three sections",
    options: [
      {
        text: "Go to beginner section.",
        nextText: 3
      },
      {
        text: "Go to intermediate section.",
        nextText: 20
      },
      {
        text: "Go to expert section.",
        nextText: 21
      }
    ]
  },
  {
    id: 3,
    text: "There are three reptiles in the beginner section.",
    options: [
      {
        text: "Let's go Leopard Gecko.",
        nextText: 4
      },
      {
        text: "I'll pick Crested Gecko.",
        nextText: 22
      },
      {
        text: "What's a Sandfish Skink?",
        nextText: 23
      },
      {
        text: "Back",
        nextText: 2
      }
    ]
  },
  {
    id: 4,
    text: "Scientific Name: Eublepharis macularius, Standard Name: Leopard Gecko, Lifespan: 10-20 years, Length: 8-10 in. Snout to Vent, Diet: Insects",
    options: [
      {
        text: "What do I need to take care of them?",
        nextText: 5
      },
      {
        text: "Back",
        nextText: 3
      }
    ]
  },
  {
    id: 5,
    text: "There's a lot that goes into taking care of a reptile; any pet for that matter, but there are a few things you need to make sure you get right.",
    options: [
      {
        text: "What are they?",
        nextText: 6
      },
      {
        text: "Back",
        nextText: 4
      }
    ]
  },
  {
    id: 6,
    text: "We'll get started with UVB. Firstly, what is UVB? Ultraviolet B light aka UVB, has a wavelength between 280 - 320 nm, visible to reptiles. Now that we know what UVB is...",
    options: [
      {
        text: "Why is UVB important?",
        nextText: 7
      },
      {
        text: "Back",
        nextText: 5
      }
    ]
  },
  {
    id: 7,
    text: "Reptiles synthesize vitamin D3 through their skin when exposed to UVB light. Since most reptiles are unable to utilize dietary vitamin D3, a lack of UVB can ultimately result in metabolic bone disease.",
    options: [
      {
        text: "So what do I need for a Leopard Gecko?",
        nextText: 8
      },
      {
        text: "Back",
        nextText: 6
      }
    ]
  },
  {
    id: 8,
    text: "Leopard Geckos don't need UVB lighting since they're crepuscular, but it is beneficial. A low percentage linear tube uvb is perfect. The UVB light should only around cover 50% of the enclosure. Also, make sure there are places for the Leopard Gecko to retreat from the light. It's also mandatory that lights go off at night. 12 hours on, 12 hours off.",
    options: [
      {
        text: "Anything else?",
        nextText: 9
      },
      {
        text: "Back",
        nextText: 7
      }
    ]
  },
  {
    id: 9,
    text: "Yes, one more thing. Your Leopard Gecko's insects will need to be dusted with calcium and multivitamin powder. Most of those supplements however have added calcium carbonate, which is a supplement for D3, which comes from UVB lighting. There's no reason to provide your Leopard Gecko with added D3 from their supplement or they can overdose on D3",
    options: [
      {
        text: "Grab Linear Tube",
        setState: {uvb: true},
        nextText: 10
      },
      {
        text: "Onto Enclosure & Substrate",
        nextText: 10
      },
      {
        text: "Back",
        nextText: 8
      }
    ]
  },
  {
    id: 10,
    text: "For every reptile you need somewhere to keep it; for Leopard Geckos, it's not too complicated or expensive. For an adult a 20 gallon equivalent or 30x12x12 BARE minimum, it's always better to go bigger; preferably a front opening 36x18x18 enclosure.",
    options: [
      {
        text: "Why a Front Opening?",
        nextText: 11
      }
    ]
  },
  {
    id: 11,
    text: "Front opening enclosures are better for many reasons. The most important however, being your reptile's mental health. If you're Leopard Gecko and something grabs you from above, you'd probably think it was a bird coming to eat you. It's the same for a top opening tank. Being picked up can be stressful, and stress can lead to death.",
    options: [
      {
        text: "Congratulations. Play Again." ,
        nextText: -1
      }
    ]
  }
]

startGame()
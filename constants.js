// Constants for different games

export const shape_paths = {
    "triangle": "M  0.0,-100.0 86.603,50.0 -86.603,50.0 z",
    "square": "M -100.0,100.0 100.0,100.0 100.0,-100.0 -100.0,-100.0 z",
    "pentagon": "M  0.0,-100.0 95.106,-30.902 58.779,80.902 -58.779,80.902 -95.106,-30.902 z",
    "hexagon": "M  0.0,-100.0 86.603,-50.0 86.603,50.0 0.0,100.0 -86.603,50.0 -86.603,-50.0 z"
}

export const all_items = [
    {"color": "green", "shape": "triangle"},
    {"color": "green", "shape": "square"},
    {"color": "green", "shape": "pentagon"},
    {"color": "red", "shape": "triangle"},
    {"color": "red", "shape": "square"},
    {"color": "red", "shape": "pentagon"},
    {"color": "blue", "shape": "triangle"},
    {"color": "blue", "shape": "square"},
    {"color": "blue", "shape": "pentagon"},
]


export const tasks = [
    {
        "_id": 0,
        "start": [
            {'color': 'blue', 'shape': 'pentagon'},
            {'color': 'red', 'shape': 'square'},
            {'color': 'red', 'shape': 'square'},
            {'color': 'red', 'shape': 'square'},
            {'color': 'green', 'shape': 'triangle'},
            {'color': 'green', 'shape': 'triangle'}
        ],
        "validGoals": [
            {'color': 'green', 'shape': 'square'},
            {'color': 'green', 'shape': 'pentagon'},
            {'color': 'red', 'shape': 'triangle'},
            {'color': 'red', 'shape': 'pentagon'},
            {'color': 'blue', 'shape': 'triangle'},
            {'color': 'blue', 'shape': 'square'},
        ]
    },
    {
        "_id": 1,
        "start": [
            {'color': 'red', 'shape': 'square'},
            {'color': 'red', 'shape': 'square'},
            {'color': 'red', 'shape': 'square'},
            {'color': 'blue', 'shape': 'triangle'},
            {'color': 'green', 'shape': 'pentagon'},
            {'color': 'green', 'shape': 'pentagon'}
        ],
        "validGoals": [
            {'color': 'green', 'shape': 'triangle'},
            {'color': 'green', 'shape': 'square'},
            {'color': 'red', 'shape': 'triangle'},
            {'color': 'red', 'shape': 'pentagon'},
            {'color': 'blue', 'shape': 'square'},
            {'color': 'blue', 'shape': 'pentagon'}
        ]
    },
    {
        "_id": 2,
        "start": [
            {'color': 'red', 'shape': 'triangle'},
            {'color': 'red', 'shape': 'triangle'},
            {'color': 'green', 'shape': 'triangle'},
            {'color': 'blue', 'shape': 'pentagon'},
            {'color': 'blue', 'shape': 'pentagon'},
            {'color': 'blue', 'shape': 'pentagon'}
        ],
        "validGoals": [
            {'color': 'green', 'shape': 'square'},
            {'color': 'green', 'shape': 'pentagon'},
            {'color': 'red', 'shape': 'square'},
            {'color': 'red', 'shape': 'pentagon'},
            {'color': 'blue', 'shape': 'triangle'},
            {'color': 'blue', 'shape': 'square'}
        ]
    }
]

export const practiceTask = {
    "_id": -1,
    "start": [
        {
            "color": "red",
            "shape": "square"
        },
        {
            "color": "red",
            "shape": "square"
        },
        {
            "color": "green",
            "shape": "pentagon"
        },
        {
            "color": "green",
            "shape": "pentagon"
        }
    ],
    "validGoals": [
        {"color": "green", "shape": "triangle"},
        {"color": "green", "shape": "square"},
        {"color": "red", "shape": "triangle"},
        {"color": "red", "shape": "pentagon"},
        {"color": "blue", "shape": "triangle"},
        {"color": "blue", "shape": "square"},
        {"color": "blue", "shape": "pentagon"}
    ]
}

export const taskFns = {
        "-1": {
        "_id": -1,
        recipeFn(x1, x2) {
            if (x1["shape"] == "square") {
                return {
                    "shape": "triangle",
                    "color": "green"
                }
            } else {
                return {
                    "shape": "square",
                    "color": "blue"
                }
            }
        }
    },
    "0": {
        "_id": 0,
        recipeFn(x1, x2) {
            const recipes = {'red': {'red': {'color': 'green', 'shape': 'pentagon'}, 'green': {'color': 'blue', 'shape': 'pentagon'}, 'blue': {'color': 'red', 'shape': 'square'}}, 'green': {'red': {'color': 'blue', 'shape': 'square'}, 'green': {'color': 'green', 'shape': 'triangle'}, 'blue': {'color': 'red', 'shape': 'triangle'}}, 'blue': {'red': {'color': 'blue', 'shape': 'triangle'}, 'green': {'color': 'green', 'shape': 'square'}, 'blue': {'color': 'red', 'shape': 'pentagon'}}}
            return recipes[x1["color"]][x2["color"]]
        }
    },
    "1": {
        "_id": 1,
        recipeFn(x1, x2) {
            const recipes = {'red': {'red': {'color': 'red', 'shape': 'triangle'}, 'green': {'color': 'blue', 'shape': 'square'}, 'blue': {'color': 'green', 'shape': 'pentagon'}}, 'green': {'red': {'color': 'green', 'shape': 'triangle'}, 'green': {'color': 'blue', 'shape': 'triangle'}, 'blue': {'color': 'green', 'shape': 'square'}}, 'blue': {'red': {'color': 'blue', 'shape': 'pentagon'}, 'green': {'color': 'red', 'shape': 'pentagon'}, 'blue': {'color': 'red', 'shape': 'square'}}}
            return recipes[x1["color"]][x2["color"]]
        }
    },
    "2": {
        "_id": 2,
        recipeFn(x1, x2) {
            const recipes = {'red': {'red': {'color': 'blue', 'shape': 'pentagon'}, 'green': {'color': 'red', 'shape': 'pentagon'}, 'blue': {'color': 'blue', 'shape': 'triangle'}}, 'green': {'red': {'color': 'red', 'shape': 'triangle'}, 'green': {'color': 'blue', 'shape': 'square'}, 'blue': {'color': 'green', 'shape': 'pentagon'}}, 'blue': {'red': {'color': 'red', 'shape': 'square'}, 'green': {'color': 'green', 'shape': 'triangle'}, 'blue': {'color': 'green', 'shape': 'square'}}}
            return recipes[x1["color"]][x2["color"]]
        }
    }
}

export const practiceInstructions = "Welcome to the practice round!\nAdd two items to the crafting bench and click \"Craft\" to try crafting them. You can craft two different items or two of the same item.\nEach item has a value associated with it. Items that take more steps to craft tend to be worth more.\nYour goal is to maximize the value you get from selling your resources. The round will end when you have sold all your resources.\nYou can keep notes on the scratchpad to your right to help you.\nHave fun!"

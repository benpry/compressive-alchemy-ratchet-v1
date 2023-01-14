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
            {
                "n": 5,
                "shape": "triangle",
                "color": "green"
            },
            {
                "n": 5,
                "shape": "square",
                "color": "red"
            }
        ],
        "validGoals": [
            {"shape": "triangle", "color": "blue"},
            {"shape": "triangle", "color": "red"},
            {"shape": "square", "color": "green"},
            {"shape": "square", "color": "blue"}
        ]
    },
    {
        "_id": 1,
        "start": [
            {
                "n": 3,
                "shape": "triangle",
                "color": "green"
            },
            {
                "n": 3,
                "shape": "pentagon",
                "color": "blue"
            },
            {
                "n": 3,
                "shape": "square",
                "color": "red"
            },
            {
                "n": 3,
                "shape": "pentagon",
                "color": "green"
            }
        ],
        "validGoals": [
            {"shape": "triangle", "color": "blue"},
            {"shape": "triangle", "color": "red"},
            {"shape": "square", "color": "green"},
            {"shape": "square", "color": "blue"}
        ]
    },
    {
        "_id": 2,
        "start": [
            {
                "n": 3,
                "shape": "triangle",
                "color": "blue"
            },
            {
                "n": 2,
                "shape": "square",
                "color": "blue"
            },
            {
                "n": 4,
                "shape": "pentagon",
                "color": "red"
            },
        ],
        "validGoals": [
            {"shape": "triangle", "color": "green"},
            {"shape": "triangle", "color": "red"},
            {"shape": "square", "color": "green"},
            {"shape": "square", "color": "red"}
        ]
    },
]

export const practiceTask = {
    "_id": -1,
    "start": [
        {
            "n": 2,
            "shape": "square",
            "color": "red"
        },
        {
            "n": 2,
            "shape": "pentagon",
            "color": "green"
        }
    ],
    "validGoals": [
        {"shape": "triangle", "color": "green"},
        {"shape": "triangle", "color": "red"},
        {"shape": "triangle", "color": "blue"},
        {"shape": "square", "color": "green"},
        {"shape": "square", "color": "blue"}
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
        },
        valueFn(x) {
            const shapeValue = (x["shape"] == "triangle") ? 10 :
                  (x["shape"] == "square") ? 2 : 4
            const colorValue = (x["color"] == "blue") ? 50 :
                  (x["color"] == "red") ? 6 : 35
            return shapeValue + colorValue;
        }
    },
    "0": {
        "_id": 0,
        recipeFn(x1, x2) {
            shape_to_number = {
                "triangle": 1,
                "square": 2,
                "pentagon": 3
            }
            number_to_shape = {
                1: "triangle",
                2: "square",
                3: "pentagon"
            }
            color_to_number = {
                "red": 1,
                "green": 2,
                "blue": 3
            }
            number_to_color = {
                1: "red",
                2: "green",
                3: "blue"
            }

            new_shape = number_to_shape[(shape_to_number[x1["shape"]] + shape_to_number[x2["shape"]]) % 3 + 1]
            new_color = number_to_color[(color_to_number[x1["color"]] + color_to_number[x2["color"]]) % 3 + 1]

            return {
                "shape": new_shape,
                "color": new_color
            }

        },
        valueFn(x) {
            shape_to_number = {
                "triangle": 1,
                "square": 2,
                "pentagon": 3
            }
            color_to_number = {
                "red": 1,
                "green": 2,
                "blue": 3
            }
            return shape_to_number[x["shape"]] ** 2 * 10 + color_to_number[x["color"]] ** 2 * 3
        }
    },
    "1": {
        "_id": 1,
        recipeFn(x1, x2) {
            return {
                "shape": "square",
                "color": "blue"
            }

        },
        valueFn(x) {
            if (x["color"] == "blue" && x["shape"] == "square") {
                return -100
            } else if (x["color"] == "blue" && x["shape"] == "pentagon") {
                return 100
            } else {
                return 10
            }
        }
    },
    "2": {
        "_id": 2,
        recipeFn(x1, x2) {
            shape_to_number = {
                "triangle": 0,
                "square": 1,
                "pentagon": 2
            }
            number_to_shape = {
                0: "triangle",
                1: "square",
                2: "pentagon"
            }
            color_to_number = {
                "red": 0,
                "green": 1,
                "blue": 2
            }
            number_to_color = {
                0: "red",
                1: "green",
                2: "blue"
            }
            new_shape = number_to_shape[Math.max(shape_to_number[x1["shape"]], shape_to_number[x2["shape"]])]
            new_color = number_to_color[(color_to_number[x1["color"]] + color_to_number[x2["color"]]) % 3]

            return {
                "shape": new_shape,
                "color": new_color
            }
        },
        valueFn(x) {
            color_values = {
                "red": 30,
                "green": 5,
                "blue": 1
            }
            shape_values = {
                "triangle": 10,
                "square": 5,
                "pentagon": 2
            }

            return color_values[x["color"]] + shape_values[x["shape"]]
        }
    }
}

export const practiceInstructions = "Welcome to the practice round!\nAdd two items to the crafting bench and click \"Craft\" to try crafting them. You can craft two different items or two of the same item.\nEach item has a value associated with it. Items that take more steps to craft tend to be worth more.\nYour goal is to maximize the value you get from selling your resources. The round will end when you have sold all your resources.\nYou can keep notes on the scratchpad to your right to help you.\nHave fun!"

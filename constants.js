// Constants for different games

export const shape_paths = {
    "blob": "M43.4,-59.3C58.7,-48.7,75.2,-39.2,77,-26.7C78.8,-14.1,65.8,1.5,57.7,16.3C49.5,31.1,46.1,44.9,37.3,53.4C28.5,61.9,14.2,64.9,-2.5,68.4C-19.2,71.8,-38.4,75.5,-53.6,69.1C-68.7,62.7,-79.8,46.1,-83.1,28.7C-86.4,11.3,-81.9,-6.9,-72.9,-20.3C-63.9,-33.6,-50.3,-42.1,-37.4,-53.5C-24.5,-64.9,-12.2,-79.3,0.9,-80.5C14.1,-81.8,28.1,-69.9,43.4,-59.3Z",
    "triangle": "M  0.0,-100.0 86.603,50.0 -86.603,50.0 z",
    "square": "M -95.0,95.0 95.0,95.0 95.0,-95.0 -95.0,-95.0 z",
    "pentagon": "M  0.0,-100.0 95.106,-30.902 58.779,80.902 -58.779,80.902 -95.106,-30.902 z",
    "hexagon": "M  0.0,-100.0 86.603,-50.0 86.603,50.0 0.0,100.0 -86.603,50.0 -86.603,-50.0 z"
}

export const allItems = [
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
    "goal": {"color": "blue", "shape": "triangle"}
}

export const taskIds = [0, 1, 2, 3]

export const taskFns = {
    "-1": {
        "_id": -1,
        recipeFn(x1, x2) {
            if (x1["color"] == "red" && x1["shape"] == "square" && x2["color"] == "green" && x2["shape"] == "pentagon") {
                return {
                    "shape": "triangle",
                    "color": "green"
                }
            } else if (x1["color"] == "green" && x1["shape"] == "pentagon" && x2["color"] == "red" && x2["shape"] == "square") {
                return {
                    "shape": "square",
                    "color": "blue"
                }
            } else if (x1["color"] == "green" && x1["shape"] == "triangle" && x2["color"] == "blue" && x2["shape"] == "square" ||
                       x1["color"] == "blue" && x1["shape"] == "square" && x2["color"] == "green" && x2["shape"] == "triangle") {
                return {
                    "shape": "triangle",
                    "color": "blue"
                }
            } else {
                return {
                    "shape": "pentagon",
                    "color": "blue"
                }
            }
        }
    },
    "0": {
        "_id": 0,
        recipeFn(x1, x2) {
            const recipes = {'red': {'red': {'color': 'blue', 'shape': 'pentagon'}, 'green': {'color': 'blue', 'shape': 'square'}, 'blue': {'color': 'green', 'shape': 'triangle'}}, 'green': {'red': {'color': 'green', 'shape': 'pentagon'}, 'green': {'color': 'blue', 'shape': 'triangle'}, 'blue': {'color': 'red', 'shape': 'square'}}, 'blue': {'red': {'color': 'red', 'shape': 'triangle'}, 'green': {'color': 'red', 'shape': 'pentagon'}, 'blue': {'color': 'green', 'shape': 'square'}}}
            return recipes[x1["color"]][x2["color"]];
        }
    },
    "1": {
        "_id": 1,
        recipeFn(x1, x2) {
            const recipes = {'red': {'red': {'color': 'green', 'shape': 'pentagon'}, 'green': {'color': 'blue', 'shape': 'pentagon'}, 'blue': {'color': 'green', 'shape': 'triangle'}}, 'green': {'red': {'color': 'blue', 'shape': 'triangle'}, 'green': {'color': 'red', 'shape': 'triangle'}, 'blue': {'color': 'blue', 'shape': 'square'}}, 'blue': {'red': {'color': 'red', 'shape': 'square'}, 'green': {'color': 'red', 'shape': 'pentagon'}, 'blue': {'color': 'green', 'shape': 'square'}}}
            return recipes[x1["color"]][x2["color"]];
        }
    },
    "2": {
        "_id": 2,
        recipeFn(x1, x2) {
            const recipes = {'triangle': {'triangle': {'color': 'red', 'shape': 'pentagon'}, 'square': {'color': 'green', 'shape': 'square'}, 'pentagon': {'color': 'blue', 'shape': 'square'}}, 'square': {'triangle': {'color': 'blue', 'shape': 'pentagon'}, 'square': {'color': 'red', 'shape': 'triangle'}, 'pentagon': {'color': 'green', 'shape': 'pentagon'}}, 'pentagon': {'triangle': {'color': 'red', 'shape': 'square'}, 'square': {'color': 'blue', 'shape': 'triangle'}, 'pentagon': {'color': 'green', 'shape': 'triangle'}}}
            return recipes[x1["shape"]][x2["shape"]];
        }
    },
    "3": {
        "_id": 3,
        recipeFn(x1, x2) {
            const recipes = {'triangle': {'triangle': {'color': 'blue', 'shape': 'pentagon'}, 'square': {'color': 'red', 'shape': 'triangle'}, 'pentagon': {'color': 'green', 'shape': 'square'}}, 'square': {'triangle': {'color': 'green', 'shape': 'pentagon'}, 'square': {'color': 'red', 'shape': 'pentagon'}, 'pentagon': {'color': 'green', 'shape': 'triangle'}}, 'pentagon': {'triangle': {'color': 'blue', 'shape': 'square'}, 'square': {'color': 'blue', 'shape': 'triangle'}, 'pentagon': {'color': 'red', 'shape': 'square'}}}
            return recipes[x1["shape"]][x2["shape"]];
        }
    }
}

export const practiceMessage = [
    "red square + green pentagon -> green triangle",
    "green pentagon + red square -> blue square"
]

const handler = require('../index')

test("Fake Test", () => {
    const example = ["From=USA", "To=Rakib"];
    let json = {};
    for(let i = 0; i < example.length; i++) {
        const kvPair = example[i].split("=");
        json[kvPair[0]] = kvPair[1];
    }
    console.log(json);
});
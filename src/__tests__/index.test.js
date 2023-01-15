const handler = require('../index')

test("Fake Test", () => {
    const callback = function(error, msg) {
        expect(msg).toEqual("Message Received");
    }
    handler.handler(null, "Fake Body", callback);
});
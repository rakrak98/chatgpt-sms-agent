const indexFunctions = require('../index')

test("parseB64StrToObj", () => {
    const testInput = "VG9Db3VudHJ5PVVTJlRvU3RhdGU9Q1QmU21zTWVzc2FnZVNpZD1TTTEyMzQ1Njc4OTAmTnVtTWVkaWE9MCZUb0NpdHk9SEFSV0lOVE9OJkZyb21aaXA9MDAwMDAmU21zU2lkPVNNMTIzNDU2Nzg5MDk4NzY1NDMyMSZGcm9tU3RhdGU9UEEmU21zU3RhdHVzPXJlY2VpdmVkJkZyb21DaXR5PVNPTUUrQ0lUWSZCb2R5PVdvdyZGcm9tQ291bnRyeT1VUyZUbz0lMTIzNDU2Nzg5MCZNZXNzYWdpbmdTZXJ2aWNlU2lkPU1HZmRzYWtmZmRzYWZkYXNmJlRvWmlwPTA2NzkxJk51bVNlZ21lbnRzPTEmTWVzc2FnZVNpZD1TTWZmc2h1Zjg5MmZyc2FsZmRzYWYmQWNjb3VudFNpZD1BQ2ZkanNha2xmZHNqYWxrZmhkamFzbDk5MzMmRnJvbT0lMkIxOTgwNzgwODg5OSZBcGlWZXJzaW9uPTIwMTAtMDQtMDE=";
    const correctJson = require('./testInput.json');
    const output = indexFunctions.parseB64StrToObj(testInput);
    for(let k in correctJson) {
        expect(correctJson[k]).toBe(output[k]);
    }
    for(let k in output) {
        expect(output[k]).toBe(correctJson[k]);
    }
});
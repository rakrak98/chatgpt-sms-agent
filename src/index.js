const { Configuration, OpenAIApi } = require("openai")
const MessagingResponse = require('twilio').twiml.MessagingResponse;

var parseB64StrToObj = function (bodyString) {
    const inBoundMsg = Buffer.from(bodyString, "base64").toString("utf8");
    const arrOfKVPairs = inBoundMsg.split("&");
    const obj = {};
    for(let i = 0; i < arrOfKVPairs.length; i++) {
        const splitVal = arrOfKVPairs[i].split("=");
        obj[splitVal[0]] = splitVal[1];
    }
    return obj;
}

function generatePrompt(humanInput) {
    return "Human: Hello, who are you?\n" +
            "AI: I am an AI. How can I help you today?\n" +
            "Human: " + humanInput;
}
/*
context and event come in as object type
context.body is type string
*/
exports.handler = async function(context, event, callback) {
    const bodyObject = parseB64StrToObj(context.body);
    const prettyPhoneNumber = bodyObject["From"].replace("%2B", "+");
    const receivedTextBody = bodyObject["Body"];
    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY
    });
    const openai = new OpenAIApi(configuration);
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: generatePrompt(receivedTextBody),
        temperature: 0.7,
        max_tokens: 3000,
        frequency_penalty: 0.7
    });
    if (!response) throw new Error("Open API response is null of defined. Actual response val: " + response);
    console.log("response", response);
    console.log("response.data", response.data);
    console.log("response.data.choices", response.data.choices);
    console.log(response.data.choices[0].text);
    console.log(response.data.choices[0].text.replace(/\n/g, ' '));
    const responseMsg = response.data.choices[0].text.replace(/\n/g, ' ');
    const twilio_client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_ACCOUNT_AUTH_TOKEN);
    await twilio_client.messages
        .create({
            body: responseMsg,
            from: process.env.PERSONAL_TWILIO_PHONE_NUM,
            to: prettyPhoneNumber
        }).then(message => console.log("Callback of twilio msg", message));
}
exports.parseB64StrToObj = parseB64StrToObj;
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
        prompt: receivedTextBody,
        temperature: 0.7,
        max_tokens: 3000,
        frequency_penalty: 0.7
    });
    console.log("Open AI Response", response);
    const twiml = new MessagingResponse();
    twiml.message(response.data.choices[0].text);
    const twilio_client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_ACCOUNT_AUTH_TOKEN);
    await twilio_client.messages
        .create({
            body: twiml,
            from: process.env.PERSONAL_TWILIO_PHONE_NUM,
            to: prettyPhoneNumber
        }).then(message => console.log("Callback of twilio msg", message));
}
exports.parseB64StrToObj = parseB64StrToObj;
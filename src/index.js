const { Configuration, OpenAIApi } = require("openai")
const MessagingResponse = require('twilio').twiml.MessagingResponse;

exports.handler = async function(context, event, callback) {
    const twiml = new MessagingResponse();
    const inBoundMsg = event;
    // const configuration = new Configuration({
    //     apiKey: process.env.OPENAI_API_KEY
    // });
    // const response = await openai.createCompletion({
    //     model: "text-davinci-003",
    //     prompt: inBoundMsg,
    //     temperature: 0.7,
    //     max_tokens: 3000,
    //     frequency_penalty: 0.7
    // });
    // twiml.message(response.data.choices[0].text);
    console.log("Message Received in the logs!");
    console.log(context);
    console.log(event);
    callback(null, "Message Received");
}
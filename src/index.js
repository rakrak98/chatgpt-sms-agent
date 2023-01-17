const { Configuration, OpenAIApi } = require("openai")
const MessagingResponse = require('twilio').twiml.MessagingResponse;

exports.handler = async function(context, event, callback) {
    const twiml = new MessagingResponse();
    console.log("Type of event", typeof(event));
    console.log("Type of context", typeof(context.body));
    console.log("Context:", context);
    const inBoundMsg = Buffer.from(context.body, "base64");
    const msgBody = inBoundMsg.Body;
    const fromPhoneNumber = inBoundMsg.From;
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
    console.log("Message Received in the logs!: ", msgBody);
    console.log("From: ", fromPhoneNumber);
    console.log("Context: ", context);
    console.log("Event:", event);
    console.log("Types");
    console.log("Type of event", typeof(event));
    console.log("Type of context", typeof(context));
}
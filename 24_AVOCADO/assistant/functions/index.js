// Copyright 2018, Google, Inc.
// Licensed under the Apache License, Version 2.0 (the 'License');
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS IS' BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

// Import the Dialogflow module from the Actions on Google client library.
const {dialogflow} = require('actions-on-google');

// Import the firebase-functions package for deployment.
const functions = require('firebase-functions');

// Instantiate the Dialogflow client.
const app = dialogflow({debug: true});

// Handle the Dialogflow intent named 'favorite color'.
// The intent collects a parameter named 'color'.
app.intent('trouble', (conv) => {
    // const luckyNumber = color.length;
    const audioSound = 'https://actions.google.com/sounds/v1/emergency/ambulance_siren_distant.ogg';
    // const Nexmo = require('nexmo');

    // const nexmo = new Nexmo({
    // apiKey: '251a6c95',
    // apiSecret: 'cDbN1WVSXL6ouQh3',
    // applicationId: '980d7b5d-1257-445e-b274-59e5b3e7a9be',
    // privateKey: 'https://drive.google.com/file/d/1ysAWgEKN4R8b7rhmYdYRYx3GuvTb9Jj0/view?usp=sharing',
    // });

    // const ncco = [
    //     {
    //       action: 'talk',
    //       voiceName: 'Joey',
    //       text:
    //         'This is a text-to-speech test message.',
    //     },
    //   ];
    //   nexmo.calls.create(
    //     {
    //       to: [{ type: 'phone', number: '919934175942' }],
    //       from: { type: 'phone', number: '919123168942' },
    //       ncco,
    //     },
    //     (err, result) => {
    //       console.log(err || result);
    //     },
    //   );
//     const accountSid = 'ACb84284979ae495651b3463af3c05e2a9';
// const authToken = '3b6450a2a1346defcab3b0c659e7560c';
// const client = require('twilio')(accountSid, authToken);

// client.calls
//       .create({
//          url: 'http://demo.twilio.com/docs/voice.xml',
//          to: '+919123168942',
//          from: '+19282574007'
//        })
//       .then(call => console.log(call.sid));
    conv.ask(`<speak>On duty` +
        `<audio src="${audioSound}"></audio> </speak>`);
    
    // Respond with the user's lucky number and end the conversation.
    conv.close('All police in alert . Feel safe');
});

// Set the DialogflowApp object to handle the HTTPS POST request.
exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);

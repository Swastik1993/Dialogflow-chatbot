const fetch = require('node-fetch');

// You can find your project ID in your Dialogflow agent settings
const projectId = 'sample-bot-2d1a9'; //https://dialogflow.com/docs/agents#settings
const sessionId = '123456';
const languageCode = 'en-US';

const dialogflow = require('dialogflow');

const config = {
  credentials: {
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDrEuYZWeRK8rKt\n55CScuyQEQEJJ+InG2CcUMfAglnMPo0SeA1rxwGcg8IFwjYzvxLJyd2NFxkTUr9z\nuFx5O/yNZFaK91Qd+isiFdErI8tzqk/STLc2DVzxJnM0YD8JUXGLP5ZRStig/5RA\nLKVP3EutvCnindi/eOUxlB/CRoFi0i2yY7gsh7asqIuXNel6hXJf2cQRAEJxA8xJ\n7PiD6FsDhtjO7rei0Z+e52q9LBMnGOTdJpNjTWm7ezuPA3vwF/o5DmvNyyPh0Rdn\nE6sTd+fUrE407AC5J455DZpnWkHHxeQQBikW7qCoHb6/8tPwN0APK6Mdz2HwZgUD\noQi+otgNAgMBAAECggEAHDi8nzaHjeftQ6uVU7+wXutrsGm1YPSMeLfKA3aiyT6J\nOTpoghP2QZAf7wkN8NBztP4jNxkazZMVoRL1JyjofSEasrxWwPKT0xfDcOZvOoer\n5ZeIN1kLW3g+RH95kejRNOKBbWkK8Ok+JyY1Ao10GHuKm8ZPi008VuNtnKlSR0ax\neu5AEWzMcokD4ctmlRycshdBf7R+62ac0q3fA2xFWkFsADoZXTzdRS1iKY1sIybV\nFTdKdot2Ey3DNWJIW/fuPPxY/9SdbODAPezd7xD6la8QBgUsou8F2AYEpHlMwqJF\nZlHqyxKcboEpNYHJ6GoSr+5ZjupVvokRgiIcOB2RAQKBgQD/K7QydSK9CzNA6NHz\n5jh8y48PC61LiUCi9bbPyC66bAduA8ZtN2ow4y1EMseJgE45baD/4SXHLwnJwwOh\nqbeCoQGLP/h5XxgkOaWHvY+juyeRM5NUDGRRH5vAqqnlevxiVyWHFCxFPY5OU1aD\nRyV/JilRINTidsTcRBTf8qJREQKBgQDr1nmLMXHMfcAMP8naO05VBQBGsIh/9DTn\nLAnamkzt0TFiq7k5IasHEcxkhoB25EE58gwoulDfHIWKKYbjkoDupib44sG0vmOq\nunlV1b9Yk4sPWnVZxHXoIkRG+tYQKnWw0PobBAPWXojw7FFeg7e4g/sdG2+9RE7G\nQKqJjd0XPQKBgDuLOkBv/ww4Gdyyt5N/jHzqj1aGdgjjXVbpmaBA6U6NOOqeLOZ9\ngOUpjf2VD+TxMM/L2j77jfI98r3HKQjHbtAnvBF/ev7vhtWlMhBL1sHxQVlrvJxn\nS912T8UUzhKDsXNNPK+ZsH7zz0pNviliJ8jU4d1RmPvDlUqFBI4Bs4jRAoGBAN+n\nMvbc+iXKr4EuUTfjfELGjl97dMebiTweGG42XHRAKgx//BUBJ9d5epNuto+JoY3Z\nTMym/KDJxJ6lCSXyPtGTwmvPZ5IH6C71zrGnFmJi8cKqr5Vk6cguDwAdSzpjed8o\nH7fVE+qNFmMcSYJPecDDcTZGWa5tBCOhGdl/LselAoGBAPix9PEBFpshY8ZX+rEd\n42SpUOrhMRDctjN+WMqqjpt/DPOSCMSODGGn471H+LZp0Nk1URgPk33CFM3GU67x\ngxW+j6wGxO2Ixf9ldpqcIrDnq8gDdXrcTyteD6afpAmlB2vn4F56v+OrEuJ+KyR2\n4a4hRDyvOuFLzVnsFvPDvuNP\n-----END PRIVATE KEY-----\n",
    "client_email": "dialogflow-vrkpmf@sample-bot-2d1a9.iam.gserviceaccount.com",
  }
};

const sessionClient = new dialogflow.SessionsClient(config);

const sessionPath = sessionClient.sessionPath(projectId, sessionId);

// Remember the Page Access Token you got from Facebook earlier?
// Don't forget to add it to your `variables.env` file.
const { FACEBOOK_ACCESS_TOKEN } = process.env;

const sendTextMessage = (userId, text) => {
  return fetch(
    `https://graph.facebook.com/v3.2/me/messages?access_token=${FACEBOOK_ACCESS_TOKEN}`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        messaging_type: 'RESPONSE',
        recipient: {
          id: userId,
        },
        message: {
          text,
        },
      }),
    }
  );
}

module.exports = (event) => {
  const userId = event.sender.id;
  const message = "hello";//event.message.text;

  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: message,
        languageCode: languageCode,
      },
    },
  };

  sessionClient
    .detectIntent(request)
    .then(responses => {
      console.log("text: ", result.fulfillmentText);
      const result = responses[0].queryResult;
      return sendTextMessage(userId, result.fulfillmentText);
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
}


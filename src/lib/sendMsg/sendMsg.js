import twilio from "twilio";

const accountSid = 'AC0fb88b441e141cdd0d14027a9e995693';
const authToken = 'de0928169864ccec594493e925a9c182';
const client = twilio(accountSid, authToken);

export const createMessage =async (msg) => {
  const message = await client.messages.create({
    body: msg,
    from: "whatsapp:+14155238886",
    to: "whatsapp:+919347368822",
  });

  console.log(message.body);
}


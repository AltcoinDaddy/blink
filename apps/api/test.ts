import axios from 'axios';

async function runTest() {
  try {
    console.log("Sending 'roast' test...");
    const res = await axios.post('http://localhost:4000/chat', {
      mode: 'roast',
      message: 'Hey, I am building an AI app, please give me money. I need $1M.',
      targetEmail: 'ceo@example.com'
    });
    console.log("Response:", JSON.stringify(res.data, null, 2));
    
    console.log("\nSending 'podcast' test with URL...");
    const res2 = await axios.post('http://localhost:4000/chat', {
      mode: 'podcast',
      message: 'Please write an email to the host of https://news.ycombinator.com/',
      targetEmail: 'host@example.com'
    });
    console.log("Response 2:", JSON.stringify(res2.data, null, 2));
  } catch (e: any) {
    console.error("Test failed", e.message);
  }
}

runTest();

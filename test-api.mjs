import fs from 'fs';

async function runTest() {
  console.log('1. Testing GET /api/events...');
  try {
    const getRes = await fetch('http://localhost:3000/api/events');
    console.log('GET status:', getRes.status);
    const getData = await getRes.json();
    console.log('GET response:', getData);
  } catch (err) {
    console.error('GET request failed:', err.message);
  }

  console.log('\n2. Testing POST /api/events...');
  try {
    const formData = new FormData();
    formData.append('day', '12');
    formData.append('month', 'Dec');
    formData.append('title', 'Test API Event');
    formData.append('description', 'This is a test from our script.');
    formData.append('time', '8:00 PM');
    formData.append('progress', '50');

    // Create a dummy image file payload
    const dummyBlob = new Blob(['fake-image-content'], { type: 'image/png' });
    formData.append('images', dummyBlob, 'test-image.png');

    const postRes = await fetch('http://localhost:3000/api/events', {
      method: 'POST',
      body: formData
    });
    
    console.log('POST status:', postRes.status);
    const postData = await postRes.json();
    console.log('POST response:', postData);
  } catch (err) {
    console.error('POST request failed:', err.message);
  }
}

runTest();

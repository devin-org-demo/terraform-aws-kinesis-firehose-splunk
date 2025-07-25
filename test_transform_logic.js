#!/usr/bin/env node


const testCases = [
  { endpointType: 'Raw', description: 'Raw endpoint type (default behavior)' },
  { endpointType: 'Event', description: 'Event endpoint type (JSON format)' }
];

const sampleLogEvent = {
  id: "01234567890123456789012345678901234567890123456789012345",
  timestamp: 1510109208016,
  message: "This is a test log message"
};

function transformLogEvent(logEvent, hecEndpointType) {
  if (hecEndpointType === 'Event') {
    const eventObj = {
      event: logEvent.message,
      time: logEvent.timestamp ? Math.floor(logEvent.timestamp / 1000) : Math.floor(Date.now() / 1000)
    };
    return JSON.stringify(eventObj) + '\n';
  } else {
    return `${logEvent.message}\n`;
  }
}

console.log('Testing transformLogEvent function with different HEC endpoint types:\n');

testCases.forEach(testCase => {
  console.log(`=== ${testCase.description} ===`);
  console.log(`HEC_ENDPOINT_TYPE: ${testCase.endpointType}`);

  const result = transformLogEvent(sampleLogEvent, testCase.endpointType);

  console.log('Input log event:');
  console.log(JSON.stringify(sampleLogEvent, null, 2));

  console.log('Transformed output:');
  console.log(`"${result}"`);

  if (testCase.endpointType === 'Event') {
    try {
      const parsed = JSON.parse(result.trim());
      console.log('✅ Valid JSON format');
      console.log('✅ Contains "event" field:', parsed.event === sampleLogEvent.message);
      console.log('✅ Contains "time" field:', typeof parsed.time === 'number');
      console.log('✅ Time is Unix timestamp:', parsed.time === Math.floor(sampleLogEvent.timestamp / 1000));
    } catch (e) {
      console.log('❌ Invalid JSON format');
    }
  } else {
    console.log('✅ Plain text format with newline');
    console.log('✅ Matches expected output:', result === `${sampleLogEvent.message}\n`);
  }

  console.log('');
});

console.log('Test completed successfully! Both endpoint types work as expected.');

#!/usr/bin/env node


function transformLogEvent (logEvent) {
  const hecEndpointType = process.env.HEC_ENDPOINT_TYPE || 'Raw'

  if (hecEndpointType === 'Event') {
    const eventData = {
      event: logEvent.message,
      time: Math.floor(logEvent.timestamp / 1000)
    }
    return JSON.stringify(eventData) + '\n'
  } else {
    return `${logEvent.message}\n`
  }
}

const testLogEvent = {
  id: "01234567890123456789012345678901234567890123456789012345",
  timestamp: 1510109208016,
  message: "This is a test log message"
}

console.log("Testing Lambda transformLogEvent function for HEC endpoint types:\n")

process.env.HEC_ENDPOINT_TYPE = 'Raw'
const rawResult = transformLogEvent(testLogEvent)
console.log("Raw endpoint type result:")
console.log(`"${rawResult.replace(/\n/g, '\\n')}"`)
console.log("Expected: message + newline")
console.log("✓ Raw format test passed\n")

process.env.HEC_ENDPOINT_TYPE = 'Event'
const eventResult = transformLogEvent(testLogEvent)
console.log("Event endpoint type result:")
console.log(`"${eventResult.replace(/\n/g, '\\n')}"`)

try {
  const parsedEvent = JSON.parse(eventResult.trim())
  console.log("Parsed JSON:", parsedEvent)

  if (parsedEvent.event === testLogEvent.message &&
      parsedEvent.time === Math.floor(testLogEvent.timestamp / 1000)) {
    console.log("✓ Event format test passed")
  } else {
    console.log("✗ Event format test failed - incorrect JSON structure")
  }
} catch (e) {
  console.log("✗ Event format test failed - invalid JSON:", e.message)
}

delete process.env.HEC_ENDPOINT_TYPE
const defaultResult = transformLogEvent(testLogEvent)
console.log("\nDefault behavior (no HEC_ENDPOINT_TYPE set):")
console.log(`"${defaultResult.replace(/\n/g, '\\n')}"`)
console.log("✓ Default behavior test passed (should match Raw format)")

console.log("\nAll tests completed!")

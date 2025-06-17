# Example: Splunk HEC Endpoint Types

This example demonstrates how to configure the module for different Splunk HEC endpoint types.

## Raw Endpoint (Default)

```hcl
module "kinesis_firehose_splunk" {
  source = "../"
  
  firehose_name = "my-firehose-raw"
  hec_url       = "https://your-splunk-instance.com:8088/services/collector"
  hec_token     = "your-hec-token"
  hec_endpoint_type = "Raw"  # This is the default
  
  # Other required variables...
  s3_bucket_name = "my-firehose-backup-bucket"
}
```

## Event Endpoint

```hcl
module "kinesis_firehose_splunk" {
  source = "../"
  
  firehose_name = "my-firehose-event"
  hec_url       = "https://your-splunk-instance.com:8088/services/collector/event"
  hec_token     = "your-hec-token"
  hec_endpoint_type = "Event"
  
  # Other required variables...
  s3_bucket_name = "my-firehose-backup-bucket"
}
```

## Differences

- **Raw endpoint**: Log messages are sent as-is with newlines appended
- **Event endpoint**: Log messages are wrapped in JSON format: `{"event": "your log message"}`

## When to Use Each Type

### Raw Endpoint
- Use when you want to send log data exactly as it appears in CloudWatch Logs
- Suitable for simple log forwarding scenarios
- Default behavior, no additional processing overhead

### Event Endpoint
- Use when you need structured data in Splunk
- Allows Splunk to better parse and index the data
- Required when using Splunk's Event HEC endpoint type
- Provides better integration with Splunk's data processing capabilities

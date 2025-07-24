# HEC Endpoint Types Example

This example demonstrates how to configure the Kinesis Firehose Splunk module with different HEC endpoint types.

## Overview

The module supports two HEC endpoint types:

- **Raw**: Sends log messages as plain text (default behavior)
- **Event**: Wraps log messages in JSON format with event and timestamp fields

## Raw Endpoint Type

When `hec_endpoint_type = "Raw"`, log messages are sent to Splunk as plain text:

```
2024-07-24 22:16:47 INFO This is a log message
```

## Event Endpoint Type

When `hec_endpoint_type = "Event"`, log messages are wrapped in JSON format:

```json
{"event": "2024-07-24 22:16:47 INFO This is a log message", "time": 1721857007}
```

The `time` field contains the Unix timestamp from the CloudWatch log event, or the current time if no timestamp is available.

## Usage

1. Replace the placeholder values in `main.tf`:
   - `hec_url`: Your Splunk HEC endpoint URL
   - `s3_bucket_name`: Your S3 bucket for backup storage
   - `hec_token`: Your Splunk HEC token

2. Deploy the configuration:

```bash
terraform init
terraform plan
terraform apply
```

## Configuration Details

### Raw Endpoint Configuration

- Uses `/services/collector/raw` endpoint
- Sends plain text log messages
- Maintains backward compatibility with existing setups

### Event Endpoint Configuration

- Uses `/services/collector/event` endpoint
- Sends JSON-formatted log events
- Includes automatic timestamp conversion from milliseconds to seconds
- Provides structured data format for better Splunk parsing

## Lambda Environment Variables

The module automatically sets the `HEC_ENDPOINT_TYPE` environment variable in the Lambda function based on the `hec_endpoint_type` variable, allowing the transformer to format data appropriately.

terraform {
  required_version = ">= 1.0.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = ">= 5.0.0, < 6.0.0"
    }
  }
}

module "kinesis_firehose_raw" {
  source = "../../"

  cloudwatch_log_regions       = ["us-east-1"]
  name_cloudwatch_logs_to_ship = "/test/raw-logs"
  hec_url                      = "https://your-splunk-instance.com:8088/services/collector/raw"
  s3_bucket_name               = "your-kinesis-firehose-backup-bucket-raw"
  hec_endpoint_type            = "Raw"

  hec_token = "your-hec-token-here"

  tags = {
    Environment = "example"
    Purpose     = "raw-endpoint-demo"
  }
}

module "kinesis_firehose_event" {
  source = "../../"

  cloudwatch_log_regions       = ["us-east-1"]
  name_cloudwatch_logs_to_ship = "/test/event-logs"
  hec_url                      = "https://your-splunk-instance.com:8088/services/collector/event"
  s3_bucket_name               = "your-kinesis-firehose-backup-bucket-event"
  hec_endpoint_type            = "Event"

  hec_token = "your-hec-token-here"

  tags = {
    Environment = "example"
    Purpose     = "event-endpoint-demo"
  }
}

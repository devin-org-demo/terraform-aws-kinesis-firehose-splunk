output "raw_firehose_arn" {
  description = "ARN of the Kinesis Firehose for Raw endpoint"
  value       = module.kinesis_firehose_raw.kinesis_firehose_delivery_stream_arn
}

output "event_firehose_arn" {
  description = "ARN of the Kinesis Firehose for Event endpoint"
  value       = module.kinesis_firehose_event.kinesis_firehose_delivery_stream_arn
}

output "raw_lambda_function_name" {
  description = "Name of the Lambda function for Raw endpoint"
  value       = module.kinesis_firehose_raw.lambda_function_name
}

output "event_lambda_function_name" {
  description = "Name of the Lambda function for Event endpoint"
  value       = module.kinesis_firehose_event.lambda_function_name
}

resource "aws_lambda_function" "sms_processing_function" {
  function_name = "SMSProcessingFunction"
  role          = aws_iam_role.sms_processing_function_role
  handler       = "index.js"
}
resource "aws_iam_role" "sms_processing_function_role" {
  name               = "SMSProcessingFunctionRole"
  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF
}
# data "aws_iam_policy_document" "sms_processing_function_policy_document" {

# }
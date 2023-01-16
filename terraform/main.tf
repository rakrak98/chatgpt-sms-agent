resource "aws_lambda_function" "sms_processing_function" {
  function_name    = "SMSProcessingFunction"
  role             = aws_iam_role.sms_processing_function_role.arn
  handler          = "src/index.handler"
  runtime          = "nodejs18.x"
  filename         = "function.zip"
  source_code_hash = filebase64sha256("function.zip")
}
resource "aws_lambda_function_url" "test_latest" {
  function_name      = aws_lambda_function.sms_processing_function.function_name
  authorization_type = "NONE"
}
resource "aws_iam_role" "sms_processing_function_role" {
  name                = "SMSProcessingFunctionRole"
  managed_policy_arns = ["arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"]
  assume_role_policy  = <<EOF
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
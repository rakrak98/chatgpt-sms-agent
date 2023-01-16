terraform {
    backend "s3" {
        bucket = var.bucket_name
        key = var.tf_state_key
        region = "us-east-1"
    }
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }

  required_version = ">= 1.2.0"
}

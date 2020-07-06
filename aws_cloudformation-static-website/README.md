# Deploy a static website with AWS CloudFormation <!-- omit in toc -->

- [Basic HTTP hosting](#basic-http-hosting)
- [Custom domain with AWS Route 53](#custom-domain-with-aws-route-53)
- [Custom domain with an external registrar](#custom-domain-with-an-external-registrar)
- [HTTPS with AWS](#https-with-aws)
- [HTTPS with an external registrar](#https-with-an-external-registrar)
- [CloudFront cache invalidation](#cloudfront-cache-invalidation)
- [Misc](#misc)
  - [Deletion policy](#deletion-policy)
- [Troubleshooting](#troubleshooting)
  - [YAML](#yaml)
  - [CloudFormation](#cloudformation)

## Basic HTTP hosting

```sh
aws cloudformation deploy --stack-name bw-hosting-basic-s3 --template-file template-basic-s3.yaml --profile alun
aws cloudformation describe-stack-resource --stack-name bw-hosting-basic-s3 --logical-resource-id S3Hosting --profile alun
aws s3 sync website s3://bw-basic-hosting --profile alun
firefox http://bw-basic-hosting.s3-website.eu-west-3.amazonaws.com/

aws s3 rm --recursive s3://bw-basic-s3 --profile alun
aws cloudformation delete-stack --stack-name bw-hosting-basic-s3 --profile alun
```

Notes:

- `AccessControl: PublicRead` seems not required

Resources:

- [AWS::S3::Bucket](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-s3-bucket.html)

References:

- [S3 Template Snippets](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/quickref-s3.html)
- [S3 website endpoint and hosted zone ID](https://docs.aws.amazon.com/general/latest/gr/s3.html#s3_website_region_endpoints)

## Custom domain with AWS Route 53

```sh
aws cloudformation deploy --stack-name bw-hosting-domain-aws --template-file template-domain-aws.yaml --profile alun
aws s3 sync website s3://bw-domain-aws.al-un.fr --profile alun

aws s3 rm --recursive s3://bw-domain-aws.al-un.fr --profile alun
aws cloudformation delete-stack --stack-name bw-hosting-domain-aws --profile alun
```

Notes:

- Bucket name must match domain name
- Bucket policy still required

- [AWS::Route53::RecordSet](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-route53-recordset.html)
- [Amazon S3 Template Snippets](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/quickref-s3.html#scenario-s3-bucket-website)

## Custom domain with an external registrar

## HTTPS with AWS

## HTTPS with an external registrar

## CloudFront cache invalidation

## Misc

### Deletion policy

https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-attribute-deletionpolicy.html

## Troubleshooting

### YAML

- Watch out indentation
- Copy paste can be error prone in VS Code

### CloudFormation

- _You have attempted to create more buckets than allowed_

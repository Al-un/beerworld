```sh
aws cloudformation deploy --stack-name bw-hosting-basic-s3 --template-file template-basic-s3.yaml --profile alun
aws s3 sync website s3://bw-basic-s3 --profile alun

aws s3 rm --recursive s3://bw-basic-s3 --profile alun
aws cloudformation delete-stack --stack-name bw-hosting-basic-s3 --profile alun
```

Resources:

- [AWS::S3::Bucket](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-s3-bucket.html)

References:

- [Amazon S3 Template Snippets](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/quickref-s3.html)

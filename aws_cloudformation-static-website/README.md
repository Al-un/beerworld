# Deploy a static website with AWS CloudFormation <!-- omit in toc -->

- [CloudFormation, the theory](#cloudformation-the-theory)
  - [Template overview](#template-overview)
  - [Functions](#functions)
  - [Resources documentation](#resources-documentation)
  - [CLI](#cli)
- [Basic HTTP hosting](#basic-http-hosting)
  - [Step by step template definition](#step-by-step-template-definition)
  - [Deployment](#deployment)
  - [Stack deletion](#stack-deletion)
- [Custom URL/domain](#custom-urldomain)
  - [With AWS Route53](#with-aws-route53)
  - [With CloudFlare](#with-cloudflare)
- [HTTPS with AWS](#https-with-aws)
- [HTTPS with an external registrar](#https-with-an-external-registrar)
- [CloudFront cache invalidation](#cloudfront-cache-invalidation)
- [Misc](#misc)
  - [Deletion policy](#deletion-policy)
- [Troubleshooting](#troubleshooting)
  - [YAML](#yaml)
  - [CloudFormation](#cloudformation)

Hosting a static website involves a various set of AWS resources depending on our requirements. While all the actions defined here can be done via the web console or, with some faith and hardship, through the CLI, we are going to take the CloudFormation route.

CloudFormation is basically the _Infrastructure as Code_ ([Wiki link](https://en.wikipedia.org/wiki/Infrastructure_as_code)) face of AWS.

> Not all of us uses AWS DNS servers. Some examples will, whenever I can, split between a full AWS environment, essentially by using Route 53, and an external DNS server, in my case, CloudFlare.

## CloudFormation, the theory

In short, CloudFormation relies on a template file, written in JSON or YAML. Such template declares all the AWS resources we will need, how they are configured and, subjected to some limitations, how they are related to each other.

CloudFormation can be managed through the CLI or the web console.

### Template overview

The overall structure of _template.yml_ is following the [CloudFormation template anatomy](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/template-anatomy.html):

```yaml
AWSTemplateFormatVersion: "version date"

Description: String

Parameters: # set of parameters

Mappings: # set of mappings

Conditions: # set of conditions definition

Resources: # set of resources
```

The various examples below help illustrating the purpose of each section. For a more formal approach, some useful links:

**AWS documentation**:

- [AWS CloudFormation API reference](https://docs.aws.amazon.com/AWSCloudFormation/latest/APIReference/Welcome.html)
- [AWS CloudFormation Template Anatomy](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/template-anatomy.html)
- [`Parameters`](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/parameters-section-structure.html)
- [`Conditions`](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/conditions-section-structure.html)
- [`Mappings`](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/mappings-section-structure.html)
- [`Resources`](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/resources-section-structure.html)

Other notes:

- [AWS CloudFormation `AWSTemplateFormatVersion` latest version is `2010-09-09`](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/format-version-structure.html)
- [`DependsOn` attribute of Resources](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-attribute-dependson.html)

### Functions

Some functions will be used to ease the template definitions. Those functions will be explained when encountered in the templates below.

- [`!FindInMap` / `Fn::FindInMap` to search a value in `Mappings`](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/intrinsic-function-reference-findinmap.html)
- [`!Join` / `Fn::Join` for concatenating values](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/intrinsic-function-reference-join.html)
- [`!Ref` / `Fn::Ref` for getting resource value or parameter value](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/intrinsic-function-reference-ref.html)
- [`!Sub` / `Fn::Sub` for variable substitution](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/intrinsic-function-reference-sub.html)

### Resources documentation

As I spend quite a lot of times to find back "what are the properties of this resources", here is a list of all resources CloudFormation documentation:

- [`AWS::S3::Bucket`](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-s3-bucket.html)
- [`AWS::S3::BucketPolicy`](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-s3-policy.html)
  - [Policies and Permissions in Amazon S3](https://docs.aws.amazon.com/AmazonS3/latest/dev/access-policy-language-overview.html)
- [`AWS::CloudFront::CloudFrontOriginAccessIdentity`](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cloudfront-cloudfrontoriginaccessidentity.html)
- [`AWS::CloudFront::Distribution`](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cloudfront-distribution.html)
  - [AWS Pricing: AWS CloudFront](https://aws.amazon.com/cloudfront/pricing/)
- [`AWS::Route53::RecordSetGroup`](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-route53-recordsetgroup.html)
- [`AWS::Route53::RecordSet`](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-route53-recordset.html)
  - [`AWS::Route53::RecordSet` `AliasTarget`](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-route53-aliastarget-1.html)
    - `Z2FDTNDATAQYW2` is the _HostedZoneId_ for CloudFront resources ([link](https://docs.aws.amazon.com/Route53/latest/APIReference/API_AliasTarget.html))
- [`AWS::IAM::Role`](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-role.html)
- [`AWS::Lambda::Function`](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-lambda-function.html)
  - https://serverlesscode.com/post/cloudformation-deploy-lambda-resources/
- [`AWS::Lambda::Permission`](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-lambda-permission.html)
  - [Solve Circular dependency in AWS S3 <> Lambda permission](https://aws.amazon.com/premiumsupport/knowledge-center/unable-validate-circular-dependency-cloudformation/)
  - https://www.lars-berning.de/avoiding-circular-dependency-problems-in-aws-cloudformation/

### CLI

The most useful command is `aws cloudformation deploy --stack-name <stack name>`. Such command is convenient:

- it automatically creates a stack if the provided _stack name_ does not exist
- it automatically updates the stack matching the provided _stack name_.

For a more step-by-step control, stacks can be manually created (`aws cloudformation create-stack`) and deleted (`aws cloudformation delete-stack`). During the creation or updates, AWS generates **change-sets** which sequentially defines the list of actions to meet the template requirements.

Precautious fellows can check the change sets before having them executed:

- `aws cloudformation create-change-set --stack-name <stack name> --change-set-name <change set name> --template-body ...` create a change set in a given stack but does not execute it
- `aws cloudformation describe-change-set --stack-name <stack name> --change-set-name <change set name>` lists all the operations the change set will trigger if executed.
- `aws cloudformation execute-change-set --stack-name <stack name> --change-set-name <change set name>` finally execute the change set and the stack will be updated according to the new template definition

**AWS Documentation**:

- [`aws cloudformation`](https://docs.aws.amazon.com/cli/latest/reference/cloudformation/index.html#cli-aws-cloudformation)

## Basic HTTP hosting

Hosting a static web on AWS starts with a single S3 bucket. Such website is restricted to have a specific URL: _http://{bucket name}.s3-website.{region}.amazonaws.com_ which is more than enough for testing some simple websites.

The simplicity of a basic hosting is a good opportunity to do a soft introduction to CloudFormation template.

### Step by step template definition

All we need is a simple S3 bucket with a website configuration. The bucket content is fully public and such access can be controlled by a bucket policy. The CloudFormation template can be drafted as:

```yaml
AWSTemplateFormatVersion: 2010-09-09

Resources:
  S3Hosting:
    Type: AWS::S3::Bucket
    Properties:
      # TODO

  S3HostingBucketPolicy:
    Type: AWS::S3::BucketPolicy
    Properties:
      # TODO
```

`S3Hosting` and `S3HostingBucketPolicy` are the _logical ID_ of the S3 bucket and the bucket policy resources. Logical ID are arbitrary and let's try to have them as explicit as possible.

Filling the properties boils down to googling the properties list and pick up the relevant ones. The [Resources documentation](#resources-documentation) section is a list of such documentation links.

If we want to name our bucket `bw-basic-hosting`, our template can be defined as

```yaml
AWSTemplateFormatVersion: 2010-09-09

Resources:
  S3Hosting:
    Type: AWS::S3::Bucket
    Properties:
      # That's our bucket name
      BucketName: bw-basic-hosting
      # We declare this bucket a website hosting, similar to the
      # website configuration in the properties tab in the web console
      WebsiteConfiguration:
        ErrorDocument: 404.html
        IndexDocument: index.html

  S3HostingBucketPolicy:
    Type: AWS::S3::BucketPolicy
    Properties:
      # This policy is declared for the bucket above
      Bucket: bw-basic-hosting
      PolicyDocument:
        Id: MyPolicy
        Version: 2012-10-17
        Statement:
          # The Sid is an arbitrary value
          - Sid: PublicReadForGetBucketObjects
            # Public access so fetching an object is allowed for everything
            Effect: Allow
            Principal: "*"
            Action: s3:GetObject
            # This policy is limited to the bucket defined in this stack, hey,
            # it is not open-bar!
            Resource: arn:aws:s3:::bw-basic-hosting/*
```

Nice! But it is not very DRY: `bw-basic-hosting` is written three times. Let's the bucket name into a `BucketName` parameter with `bw-basic-hosting` as a default value. A parameter value can be overridden during the CloudFormation stack deployment.

```yaml
AWSTemplateFormatVersion: 2010-09-09

Parameters:
  BucketName:
    Type: String
    Default: bw-basic-hosting

Resources:
  # ...
```

The `BucketName` parameter is a variable that we have to interpolate in our template. `!Ref` function enters the scene. To compare with SCSS syntax, writing `!Ref someVarName` is similar to `#{$someVarName}` in SCSS grammar. Our bucket definition becomes:

```yaml
# ...

Resources:
  S3Hosting:
    Type: AWS::S3::Bucket
    Properties:
      BucketName: !Ref BucketName
      WebsiteConfiguration:
        ErrorDocument: 404.html
        IndexDocument: index.html
```

Each AWS resource will return a specific value when called upon a `!Ref` function. For example `!Ref {a bucket logical ID}` returns the bucket name. Other resources may have other values such as the ARN.

`!Ref` ensures that our bucket policy is applied to the correct bucket:

```yaml
# ...
S3HostingBucketPolicy:
  Type: AWS::S3::BucketPolicy
  Properties:
    Bucket: !Ref S3Hosting
    PolicyDocument:
      # How to call !Ref in "arn:aws:s3:::bw-basic-hosting/*"?
```

AWS documentation makes use of the `!Join` function:

```yaml
S3HostingBucketPolicy:
  Properties:
    # ...
    PolicyDocument:
      Id: MyPolicy
      Version: 2012-10-17
      Statement:
        - Sid: PublicReadForGetBucketObjects
          Effect: Allow
          Principal: "*"
          Action: "s3:GetObject"
          Resource: !Join
            - ""
            - - "arn:aws:s3:::"
              - !Ref S3Hosting
              - /*
```

Although I have not tried, I think `!Sub arn:aws:s3:::${S3Hosting}/*` is also valid.

The end result is the [`template-basic-s3.yaml`](template-basic-s3.yaml).

> Note: although the different tutorials and guide add `AccessControl: PublicRead` in the S3Hosting bucket definition, I did not need it so I removed it.

### Deployment

It is now time to deploy! Deploying is as simple as

```sh
# Feel free to change "bw-hosting-basic-s3" to whatever value
aws cloudformation deploy --stack-name bw-hosting-basic-s3 --template-file template-basic-s3.yaml
```

To deploy the same stack with a different bucket name, the bucket name parameter has to be overriden:

```sh
# I changed the stack name. If the stack name was bw-hosting-basic-s3, it would have updated the
# previous stack
aws cloudformation deploy --stack-name bw-hosting-basic-s3-other-name --template-file template-basic-s3.yaml --parameter-overrides BucketName=some-other-name
```

To check what name the bucket is currently having:

```sh
aws cloudformation describe-stack-resource --stack-name bw-hosting-basic-s3 --logical-resource-id S3Hosting
```

Time to upload some content!

```sh
# Use the CLI to send some content to a S3 bucket
aws s3 sync website s3://bw-basic-hosting --profile alun

# Open the URL with firefox
firefox http://bw-basic-hosting.s3-website.eu-west-3.amazonaws.com/

```

### Stack deletion

S3 buckets cannot be deleted if not empty. The stack deletion then requires two actions:

```sh
aws s3 rm --recursive s3://bw-basic-s3
aws cloudformation delete-stack --stack-name bw-hosting-basic-s3
```

## Custom URL/domain

All systems online! but online behind a not-very-user-friendly-URL.

### With AWS Route53

This section specificity is that the bucket name **must** match the target domain name: `example.com` must be hosted in a bucket with the same name. It also applies to subdomains: `subdomain.example.com` must be hosted in a bucket with exactly the same name.

This template can be built from the previous template:

- `BucketName` parameter is renamed `DomainName` to be more explicit
- Unlike AWS template snippets, I had to keep the S3 bucket policy
- Two more resources are added: the S3 bucket for redirection and Route 53 entries

The S3 redirection bucket, typically redirecting _www.example.com_ to _example.com_, is simply defined as follow:

```yaml
S3Redirection:
Type: AWS::S3::Bucket
Properties:
  AccessControl: BucketOwnerFullControl
  BucketName: !Sub www.${DomainName}
  WebsiteConfiguration:
    RedirectAllRequestsTo:
      HostName: !Ref S3Hosting
```

> Note: I am not sure if the `AccessControl` can be dropped or not as I just copied from AWS snippet

The Route 53 DNS entries handles both domain _example.com_ and _www.example.com_ by pointing them to the appropriate resources. The following code is simply copied from AWS snippet.

```yaml
DNSEntries:
  Type: AWS::Route53::RecordSetGroup
  Properties:
    HostedZoneName: !Ref RootDomainName
    RecordSets:
      - AliasTarget:
          HostedZoneId: !FindInMap [S3Regions, !Ref "AWS::Region", ZoneId]
          DNSName: !FindInMap [S3Regions, !Ref "AWS::Region", Endpoint]
        Name: !Ref DomainName
        Type: A
      - Name: !Sub www.${DomainName}
        ResourceRecords:
          - !GetAtt S3Redirection.DomainName
        Type: CNAME
        TTL: 900
```

The final template is [`template-domain-aws.yaml`](template-domain-aws.yaml).

Deployment and stack deletion commands are the same:

```sh
aws cloudformation deploy --stack-name bw-hosting-domain-aws --template-file template-domain-aws.yaml
aws s3 sync website s3://bw-domain-aws.al-un.fr

aws s3 rm --recursive s3://bw-domain-aws.al-un.fr
aws cloudformation delete-stack --stack-name bw-hosting-domain-aws
```

References:

- [Amazon S3 Template Snippets](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/quickref-s3.html#scenario-s3-bucket-website)
- [S3 website endpoint and hosted zone ID](https://docs.aws.amazon.com/general/latest/gr/s3.html#s3_website_region_endpoints)
-

### With CloudFlare

Similarly to the previous example, the bucket name **must** match the target domain name.

CloudFlare has to do Route 53's job: handle a CNAME entry (such as _example.com_ or _app.example.com_) pointing to the S3 bucket website endpoint (such as _example.com.s3-website.<AWS region>.amazonaws.com_ or _app.example.com.s3-website.<AWS region>.amazonaws.com_).

> When editing DNS entries, don't forget to strip out ending slashes and the protocol (no `http://`).

This can easily be done in the web interface by creating a DNS entry:

- type: _CNAME_
- name: your subdomain name or `@` for the root domain (such as `example.com`)
- target: the S3 bucket website endpoint
- TTL: automatic or any desired value

Such DNS entry creation can also be performed with the Cloudflare API. A token with DNS edition permission on the appropriate domain is required. To create the DNS record ([Cloudflare docs](https://api.cloudflare.com/#dns-records-for-a-zone-create-dns-record))

```sh
curl "https://api.cloudflare.com/client/v4/zones/<zone id>/dns_records" -X POST \
-H "Authorization: Bearer <token>" \
-H "Content-Type: application/json" \
--data @- <<'EOF'
{
  "type": "CNAME",
  "name": "bw-domain-cloudflare",
  "content": "bw-domain-cloudflare.al-un.fr.s3-website.eu-west-3.amazonaws.com",
  "ttl": 1
}
EOF
```

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

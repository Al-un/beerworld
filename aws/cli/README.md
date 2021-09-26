# AWS CLI <!-- omit in toc -->

- [Installation](#installation)
- [Multi-profile](#multi-profile)

## Installation

> If AWS CLI version 1 is installed, uninstall it first!

AWS CLI Version 2 installation is straightforward following [AWS documentation](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html):

```sh
# Install
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install

# Confirm
aws --version
```

## Multi-profile

AWS CLI allows toggling between multiple profiles by edition the default configuration and credentials files. Check [the documentation](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-profiles.html)

`~/.aws/config`:

```
[default]
region = eu-west-3
output = json

[alun]
region = eu-west-3
output = json

[work]
region = ap-northeast-1
output = json
```

`~/.aws/credentials`:

```
[default]
aws_access_key_id = aaaaaaaaaaaaaaaaaaaa
aws_secret_access_key = aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa

[alun]
aws_access_key_id = aaaaaaaaaaaaaaaaaaaa
aws_secret_access_key = aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa

[work]
aws_access_key_id = xxxxxxxxxxxxxxxxxxxx
aws_secret_access_key = xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

Then execute the commands with the `--profile` argument:

```sh
aws s3 ls --profile alun
aws s3 ls --profile work
```
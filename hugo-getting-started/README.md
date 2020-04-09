# Getting started with Hugo <!-- omit in toc -->

Learn building static website with the world's fastest static site generator: [https://gohugo.io/](https://gohugo.io/)

- [Install](#install)

## Install

From [Hugo installation guide](https://gohugo.io/getting-started/installing), using _brew_ or _Chocolatey_ is straightforward. I go for the binary version as it does not look too complicated:

- Download the appropriate binary from [Hugo releases](https://github.com/gohugoio/hugo/releases)
- Extract the archive and copy the `hugo` executable to some appropriate location. Hugo documentation recommends `/usr/local/bin/` or any folder in your `$PATH`.

```sh
# Put the downloaded binary in my Downloads folder
cd ~/Downloads

# See the release list here: https://github.com/gohugoio/hugo/releases
wget https://github.com/gohugoio/hugo/releases/download/v0.68.3/hugo_0.68.3_Linux-64bit.tar.gz

# Extract to some folder
mkdir hugo_0.68.3
tar -xvzf hugo_0.68.3_Linux-64bit.tar.gz -C hugo_0.68.3

# Copy to /usr/local/bin
sudo cp hugo_0.68.3/hugo /usr/local/bin/hugo
```

To upgrade Hugo, simply replace the `/usr/local/bin/hugo` with the newest binary.
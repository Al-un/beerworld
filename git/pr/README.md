# Useful git commands when handling PR <!-- omit in toc -->

Some notes regarding useful git commands when doing / receiving code review.

- [Summary](#summary)
  - [Update branches (as a reviewer)](#update-branches-as-a-reviewer)
    - [When branch can be fast-forwarded](#when-branch-can-be-fast-forwarded)
    - [When branch cannot be fast-forwarded](#when-branch-cannot-be-fast-forwarded)
  - [Display history](#display-history)
    - [`git log`](#git-log)
    - [`git merge-base`](#git-merge-base)
  - [Content comparison](#content-comparison)
    - [`git diff`](#git-diff)
    - [`git blame`](#git-blame)
  - [Others](#others)
    - [Fixing past commit with interactive rebase](#fixing-past-commit-with-interactive-rebase)
    - [Cherry pick last N commits to another branch](#cherry-pick-last-n-commits-to-another-branch)
    - [Branches management](#branches-management)
- [Miscellaneous](#miscellaneous)
  - [Update git on Ubuntu Focal](#update-git-on-ubuntu-focal)

## Summary

### Update branches (as a reviewer)

#### When branch can be fast-forwarded

```sh
# Fetch branches only
git fetch origin

# Fetch branches and prune remotely deleted branches
git fetch origin --prune

# Update master branch without checkout. This assumes that fast forward is possible
git fetch origin master:master # Cannot do it when "master" is the active branch
```

Sources:

- [Git doc: `git fetch`](https://www.git-scm.com/docs/git-fetch)
- [Stack Overflow: update git branches without using checkouts](https://stackoverflow.com/a/17722977/4906586)

#### When branch cannot be fast-forwarded

```sh
# When remote history is rewritten (git rebase)
git checkout feature/update-countries
git fetch origin feature/update-countries
git reset --hard origin/feature/update-countries
```

### Display history

#### `git log`

```sh
# Basic
git log

# Compact
git log --oneline

# Graph
git log --graph

# Multiple branches
git log --oneline --graph master feature/update-countries
```

Sources:

- [Git doc: `git log`](https://www.git-scm.com/docs/git-log)

#### `git merge-base`

```sh
# Find common ancestor
git merge-base master feature/update-countries
```

Sources:

- [Git doc: `git merge-base`](https://www.git-scm.com/docs/git-merge-base)

### Content comparison

#### `git diff`

```sh
# Compare HEAD with master branch
git diff master # same as git diff master HEAD

# Compare feature branch with master from common ancestor
git diff $(git merge-base master feature/update-countries) feature/update-countries

# Compare HEAD with master from common ancestor
git diff $(git merge-base master HEAD) HEAD
# Same as above but shortcut available from git 2.30.0
git diff --merge-base master

# Show names only
git diff --name-only master

# Show names+status only
git diff --name-status master

# Magic combo:
git diff --master-base --name-status master

# Show diff in commit range
git diff HEAD..HEAD~2

# Fun fact:
git diff HEAD~1..HEAD~2
# is the same as
git show HEAD~1
```

Sources:

- [Git doc: `git diff`](https://www.git-scm.com/docs/git-diff)

#### `git blame`

```sh
# Show last modifications per lines
git blame --color-lines countries.json
```

Sources:

- [Git doc: `git blame`](https://www.git-scm.com/docs/git-blame)

### Others

#### Fixing past commit with interactive rebase

```sh
# Find starting point
git log --oneline --max-count=<N>

# Start interactive rebase
git rebase --interactive <starting point>

# Define the commits we want to edit in the text editor

# Do changes when the rebase stops at requested commit

# Amend commit and continue rebase
git commit --amend
git rebase --continue
```

Sources:

- [Git doc: `git rebase Interactive mode`](https://www.git-scm.com/docs/git-rebase#_interactive_mode)

#### Cherry pick last N commits to another branch

```sh
git checkout <target branch>
git log --reverse --pretty=%h --max-count=N <source branch> | xargs git cherry-pick
```

Sources: 

- [Git doc: `git cherry-pick`](https://www.git-scm.com/docs/git-cherry-pick)

#### Branches management

```sh
# Display all branches, including remote references
git branch -a

# Display current branch name only
git branch --show-current

# Mass branch deletion
git branch --list <pattern> | xargs git branch -d
```

Sources:

- [Git doc: `git branch`](https://www.git-scm.com/docs/git-branch)

## Miscellaneous

### Update git on Ubuntu Focal

```sh
sudo add-apt-repository ppa:git-core/ppa
sudo apt update
sudo apt install git

git --version
```

Source: https://git-scm.com/download/linux

# Contributing

Contributing to the development of startupwichita.com can include filing or
commenting on issues, making application code changes or improving the site's
desgin / UX.

## Getting Started

We are using [GitHub](http://github.com) to manage this project. The link to the
repository is https://github.com/devict/startupwichita.com. You will need a
GitHub account to contribute to this project.

The first thing you will want to do is to fork the repository to your own
account. Do this by visiting the [main
repo](https://github.com/devict/startupwichita.com) and clicking the "Fork"
button near the top right of the page. This will create a copy of the repository
in your own GitHub account that you control.

Next you will want to clone down the repo from your account to your development
machine and can begin working on it there:

```
git clone https://github.com/your-account-name/startupwichita.com ~/path/to/your/local/project
```

Next you will want to add the parent DevICT repository as a remote in your local
git project. This allows you to pull down code changes that have been made there
as we progress.

```
git remote add devict https://github.com/devict/startupwichita.com
```

**Note:** There are also GUI interfaces that can be used for interacting with
GitHub for [Windows](http://windows.github.com/) and
[Mac](http://mac.github.com/).

## Filing Issues

An issue can be anything that needs to be fixed or added to the site. Whether
this is a bug that you encountered and need to report, or something you think
would be a good addition, you should file an issue for it.

Be as descriptive as possible in your issue. You should include enough
information for someone to look at it and start working on it without having to
ask additional questions. Screenshots are always great too.

**If you are reporting a bug, please include steps to recreate the bug. Again,
the more detail, the better.**

It is possible that someone will have questions about your issue, so please
check back into the page to see if there is additional information requested.

### How To File An Issue

From the [main repo link](https://github.com/devict/startupwichita.com) on the
right side of the page there is a [link for
issues](https://github.com/devict/startupwichita.com/issues).

Once on the issues page, clicking on [New
Issue](https://github.com/devict/startupwichita.com/issues/new) will present you
the issue form. Write a clear and descriptive titleand fill out the the body
with all the detail that you have about the bug or feature your issue deals
with.

You can also label your issue with either 'bug', 'enhancement', or 'question',
depending on what the issue is.

## Contributing Code

Let's say that you wanted to take Issue #8. You would first claim the issue by
commenting on the issue to let others know you are going to tackle the issue.

### Make a Branch

The next step is creating a branch in your local repository that will be used
only for tackling this one issue. No other code should go in this branch. To
make the branch you should run something equivalent to this:
```
git checkout master             # Switch to your master branch
git pull devict master          # Make sure it is up to date
git checkout -b issue-8-vagrant # Make a new branch and switch to it. Name your
                                # branch something that makes sense for you. You
                                # don't have to follow this convention
```

### Commit Your Changes

As you are working through the code you may make multiple frequent commits. This
is a good idea so you have several points to reference back to during
development. Before you are ready to contribute your change back to the main
repository it is a good idea to squash your commits into a single commit. That
commit should be well formed; please read this article about [what makes a good
commit
message](http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html)).

Squashing commits is easy once you've done it a few times but can be a little
awkward to explain. If you have never done this before please just ask someone
from DevICT to show you and we gladly will. If you feel comfortable with Git but
haven't squashed before, you can read [this article explaining how to
squash](http://git-scm.com/book/en/Git-Tools-Rewriting-History)

If you are working against an already filed issue you should start the commit
message with something in this pattern "Issue #8 Vagrant Setup". This will make
your commit automatically become associated with the issue.

### Run Tests and the Linter

While working through your code, **you should be running the test suite each
time you make a change**. You want to be sure that nothing you contribute breaks
other existing functionality. We are using
[karma](http://karma-runner.github.io/) for the front end test runner, and
[mocha](http://visionmedia.github.io/mocha/) for backend tests.

To run the tests, make sure you are in the `/var/www/startupwichita.com` on the
VM. To run the tests issue the command `grunt test`. Also run `grunt jshint`
to ensure no JavaScript errors exist in your code.

**We prefer that all new code have tests written to cover it**. If you need help
writing tests for your code, please find someone to assist you. You can also use
existing tests in the codebase to use as examples.

### Rebase

Once you are ready to submit your pull request we ask that you do a rebase
from the master repository to make sure the rest of your code is up to date. Do
this with the following command:

``` 
git pull --rebase devict master
```

### Push Your Branch to GitHub

To make your code available to the world you should push it up to GitHub. This
is as simple as 
```
git push origin issue-8-vagrant
```

`origin` should be a git remote pointing to **your fork of the repo on GitHub**.

### Issuing The Pull Request

Now you have pushed your code up to your own fork but it is not yet part of the
official DevICT repo. To make your contribution live you have to ask DevICT to
pull the changes from your newly published branch into the official repo.

GitHub makes this process easy. If you visit your fork in a web browser you
should see something towards the top that says

> You recently pushed branches:
> Branch: issue-8-vagrant (2 minutes ago): [Compare & Pull Request]

Click the *Compare & Pull Request* button which will take you to a new screen.
If you have followed the commit guidelines then the PR title and body might
already be prefilled.

When you are happy with your PR message you should click the *Send pull request*
button.

After you issue the Pull Request you will see the PR screen which will say
something like:

> yourusername wants to merge 1 commit into devict:master from yourusername:issue-8-vagrant

### Updating The Pull Request

The DevICT maintainers will review your PR and will likely provide feedback. If
you are asked to make additional changes you can should make those changes on
your local branch, squash back to a single commit, then publish the branch again
with 

```
git push --force origin issue-8-vagrant
```

Pushing with force will rewrite the history of this branch. The Pull Request
will be updated automatically.

### Deleting Your Branch

After your PR is accepted the PR screen on GitHub will provide you with an easy
button to click to delete your published branch. You can delete your local copy
of this branch with 

```
git checkout master
git pull devict master
git branch -d issue-8-vagrant
```

**NOTE** you should only do this once you are sure the branch has been pulled in
to the official DevICT repo.

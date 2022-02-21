[![npm version](https://badge.fury.io/js/%40sealink%2Fmodern-formik-fields.svg)](https://badge.fury.io/js/%40sealink%2Fmodern-formik-fields)
[![Coverage Status](https://coveralls.io/repos/github/sealink/modern-formik-fields/badge.svg?branch=master)](https://coveralls.io/github/sealink/modern-formik-fields?branch=master)
[![Build Status](https://github.com/sealink/modern-formik-fields/workflows/Build%20and%20Test/badge.svg?branch=master)](https://github.com/sealink/modern-formik-fields/actions)

### WHY

A set of components that can be passed to Formik to create useful custom fields.

### Deployment

Build / Deployment is handled via Github actions.
Package management is via NPM.

First create the release branch

```
git branch release/0.1.x
```

Second Update package.json and specify the version you are releasing

Next Tag and push to github

```
git tag v0.1.0
git push origin master --tags
```

Remember to merge changes back to the master branch

# dreepo

Repository Pattern implementation for Firebase Realtime Database

[![TypeScript](https://badgen.net/badge/-/typescript?icon=typescript&label)](https://www.typescriptlang.org/)
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)

## Overview

[Getting Started](#getting-started)  
[Installation](#installation)  
[Usage](#🚧-usage)  
[Built With](#built-with)  
[Contributing](docs/CONTRIBUTING.md)

## Getting Started

Inspired by [Fireorm][1], Dreepo exposes a Repository Pattern implementation for
[Firebase Realtime Database][2] instances.

Alongside an abstract database access layer, repositories also support:

- aggregation pipelines and queries using [mingo][3], a MongoDB query language
- [runtypes][4] model validation

## Installation

1. Create or edit an `.npmrc` file with the following information:

   ```utf-8
   @flex-development:registry=https://npm.pkg.github.com/
   //npm.pkg.github.com/:_authToken=${GH_PAT}
   ```

   where `GH_PAT` is your [GitHub personal access token][5] with
   [`read:packages`][6] scope permissions.

2. Add project to `dependencies`

   ```zsh
   yarn add @flex-development/dreepo # or npm i @flex-development/dreepo
   ```

## :construction: Usage

**TODO**: Update documentation.

## Built With

- [Axios][7] - Promise based HTTP client
- [Firebase Database REST API][2] - REST API for Firebase Realtime Database
- [Google APIs Node.js Client][8] - Node.js client library for using Google APIs
- [mingo][3] - MongoDB query language for in-memory objects
- [runtypes][4] - Runtime validation for static types

[1]: https://github.com/wovalle/fireorm
[2]: https://firebase.google.com/docs/reference/rest/database
[3]: https://github.com/kofrasa/mingo
[4]: https://github.com/pelotom/runtypes
[5]:
  https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token
[6]:
  https://docs.github.com/en/developers/apps/scopes-for-oauth-apps#available-scopes
[7]: https://github.com/axios/axios
[8]: https://github.com/googleapis/google-api-nodejs-client

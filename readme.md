# Enmacc

This is a solution for the Enmacc automation task

## Installation

you can use yarn to install it

```bash
yarn install
```

## Usage
To run and lunch the browser you can use
```bash
yarn cypress open
```
To run in the headless mood you can use:
```bash
yarn cypress run
```

To only run the web or api you can use this command
```bash
 yarn cypress run --spec cypress/e2e/{api or web}/
```

# AutoCompleteBigData

Welcome to the **AutoCompleteBigData** repository! This project focuses on building an efficient and scalable auto-complete library designed to handle large datasets.

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Example](#example)
- [License](#license)
- [Contact](#contact)

## Introduction

The AutoCompleteBigData library aims to deliver a high-performance auto-complete solution capable of handling massive datasets. It is designed to be easily used into applications that require text prediction or suggestion capabilities.

## Features

- **Scalability**: Efficiently handles large datasets.
- **Accuracy**: Provides accurate suggestions based on the input.
- **Performance**: Optimized for fast response times.
- **Customizable**: Easily configurable to fit various use cases.
- **Simple!**: Extremelly simple to use and understand, it's just Vanilla JavaScript.

## Installation

You dont need to install, just reff the JS and CSS file on your HTML Head:
   ``` html
    <!-- Autocomplete Imports -->
    <script src="https://saviocardososantos.github.io/AutoCompleteBigData/autocomplete-big-data.js"></script>
    <link rel="stylesheet" href="https://saviocardososantos.github.io/AutoCompleteBigData/autocomplete-big-data.css">
   ```

## Usage

To use the AutoCompleteBigData library in your project, follow these steps:

1. **Write a input tag inside a div with the class "autocomplete":**
   ```html
    <div class="autocomplete">
      <input id="myInput" type="text" name="myArtist" placeholder="Artist">
    </div>
   ```

2. **Write your getData(value) async function:**
   ```javascript
   async function getData(value) { 
     // filter in your database as you see fit
     // example
     var database = [
          {
              "id": 323232,
              "text": "John"
          },
          {
              "id": 43233,
              "text": "John Summit"
          },
          {
              "id": 543223,
              "text": "John Sullivan"
          }
      ];
   
      return database.filter(x => x.text.toLowerCase().startsWith(value.toLowerCase()));
   }
   ```
   Note: Your function must return a JSON in this format:
   ```json
      [
        {
            "id": 323232,
            "text": "Item 1"
        },
        {
            "id": 43233,
            "text": "Item 2"
        },
        {
            "id": 543223,
            "text": "Item 3"
        }
    ]
   ```

4. **Init the input:**
   ```javascript
   var settings = {
      searchFunc: getData, //mandatory property
      typingTimeout: 200 //non-mandatory property, default 300ms
   }
   initAutoComplete(document.getElementById("myInput"), settings);
   ```

5. **Start typing!**

## Example

See using examples in: https://saviocardososantos.github.io/AutoCompleteBigData/Using%20Examples

## License

This project is free to use!

## Contact

For any questions, issues, or suggestions, please contact me at:

- **Email**: cardososavio5@gmail.com

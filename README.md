# Lab 17

## Project: S3 and Lambda

## Authors: Kaeden O'Meara

## Problem Domain

AWS Lambda allows writing code that is triggered in the cloud, without thinking about maintaining servers. We’ll use it today to automatically run some processing on image files after they’re uploaded to an S3 Bucket.

## Process

- get image details from event

- get the images.json(if exists) use getObjectCommand

- access array (if exists)

- create array (if not exists)

- push image details into array

- stringify array

- put the modified array BACK in images.json use putObjectCommand

- create images.json if not exists

## Collaborators

- Reece Renninger
- Ike
- Demo Code/Review

## Tests

To run tests, after running `npm i`, run the command `npm test`

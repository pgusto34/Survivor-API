/*
 * Parker Gustafson
 * 5/18/22
 * Section AJ Tara and Benjamin
 *
 * Node server used to implement my "Survivor API". It has
 * one get path for retrieving season names, one get path for retrieving
 * season information, and one get path for retrieving a season's
 * description
 */
"use strict";

const express = require("express");
const app = express();

const fs = require("fs").promises;
const multer = require("multer");

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(multer().none());

/**
 * Sends a JSON list of Survivor Seasons
 * The request should be in the following format:
 * /season-list
 * Request Type: GET
 * Response Format: JSON
 * @return {JSON} a json object containing a list of the first
 * ten survivor seasons
 * Throws a 500 error if an internal server error occurs
 */
app.get("/season-list", async (req, res) => {
  try {
    let seasonData = await fs.readFile("season-list.txt", "utf8");
    seasonData = JSON.parse(seasonData);
    res.json(seasonData);
  } catch (err) {
    res.status(500).type("text");
    res.send("A Server Error Occurred: " + err);
  }
});

/**
 * Sends a JSON object containing information about the requested season
 * The request should be in the following format:
 * /season-list?season=<season-number>
 * @param {String} <season-number> - the requested season of the form "season-<number>"
 * number must be between 1-10 (inclusive)
 * Request Type: GET
 * Response Format: JSON
 * @return {JSON} a json object containing information of the requested season
 * Throws a 400 error if the query parameter "season-number" is not
 * provided by the user or the user provides an season-number that does
 * not exist in season-list.txt
 * Throws a 500 error if an internal server error occurs
 */
app.get("/season", async (req, res) => {
  try {
    let seasonNumber = req.query.season;
    let seasonData = await fs.readFile("survivor-seasons.json", "utf8");
    seasonData = JSON.parse(seasonData);
    if (seasonNumber && seasonData[seasonNumber]) {
      res.json(seasonData[seasonNumber]);
    } else {
      throw400Error(seasonNumber, res);
    }
  } catch (err) {
    res.status(500).type("text");
    res.send("A Server Error Occurred: " + err);
  }
});

/**
 * Sends a Plain text description of the requested season
 * The request should be in the following format:
 * /season-description?season=<season-number>
 * @param {String} <season-number> - the requested season of the form "season-<number>"
 * number must be between 1-10 (inclusive)
 * Request Type: GET
 * Response Format: Plain Text
 * @return {Plain Text} a plain text description of the given season
 * Throws a 400 error if the query parameter "season-number" is not
 * provided by the user or the user provides an season-number that does
 * not exist in season-list.txt
 * Throws a 500 error if an internal server error occurs
 */
app.get("/season-description", async (req, res) => {
  try {
    let seasonNumber = req.query.season;
    let seasonDescription =
      await fs.readFile("season-descriptions/" + seasonNumber + ".txt", "utf8");
    if (seasonNumber && seasonDescription) {
      res.type("text");
      res.send(seasonDescription);
    } else {
      throw400Error(seasonNumber, res);
    }
  } catch (err) {
    res.status(500).type("text");
    res.send("A Server Error Occurred: " + err);
  }
});

/**
 * Sends an appropriate 400 error given a
 * seasonNumber and Response object (res).
 * Will send the plain text "Please Enter a Season"
 * if seasonNumber is undefined, and will send
 * "Please Enter a Valid Season", otherwise.
 *
 * @param {String} seasonNumber - a "seasonNumber" of a survivor season
 * @param {Response} res - given response object to be sent
 */
function throw400Error(seasonNumber, res) {
  if (!seasonNumber) {
    res.status(400).type("text");
    res.send("Please Enter a Season");
  } else {
    res.status(400).type("text");
    res.send("Please Enter a Valid Season");
  }
}

app.use(express.static("public"));
const PORT = process.env.PORT || 8080;
app.listen(PORT);
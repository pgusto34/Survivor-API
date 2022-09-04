# Survivor API Documentation
The Survivor API provides information about the first ten season of survivor
including a list of seasons, facts for each season, and season descriptions

## Get a list of Survivor Seasons
**Request Format:** /season-list

**Request Type:** GET

**Returned Data Format**: JSON Object

**Description:** Return a list of the first ten survior seasons


**Example Request:** /season-list

**Example Response:**
```json
{
  "Season 1":"Survivor: Borneo",
  "Season 2":"Survivor: The Australian Outback",
  "Season 3":"Survivor: Africa",
  "Season 4":"Surivor: Marquesas",
  "Season 5":"Survivor: Thailand",
  "Season 6":"Survivor: The Amazon",
  "Season 7":"Survivor: Pearl Islands",
  "Season 8":"Survivor: All-Stars",
  "Season 9":"Survivor: Vanuatu - Islands of Fire", "Season 10":"Survivor: Palau"
}
```

**Error Handling:**
- Possible 500 Errors (all plain text):
  - If an internal server error occurs, returns an error with the message,
  "A Server Error Occurred: " with the error appended to the end of the message

## Get information of a Survivor Season
**Request Format:** /season?season=<season-number>

**Request Type:** GET

**Returned Data Format**: JSON

**Description:** Returns a JSON object containing information about the requested season

**Example Request:** /season?season=season-1

**Example Response:**
```json
{
  "season-1" : {
    "title" : "Survivor: Borneo",
    "country" : "Malaysia",
    "winner" : "Richard Hatch",
    "img" : "img/borneo.png"
  }
}
```

**Error Handling:**
- Possible 400 Errors (all plain text):
  - If the season-number parameter is missing, an error is returned with the message,
  "Please Enter a Season"
  - If the season-number parameter does not match a season in
  survivor-seasons.json, an error is returned with the message, "Please Enter a Valid Season"
- Possible 500 Errors (all plain text):
  - If an internal server error occurs, returns an error with the message,
  "A Server Error Occurred: " with the error appended to the end of the message

## Get a Description of a Survivor Season
**Request Format:** /season-description?season=<season-number>

**Request Type:** GET

**Returned Data Format**: Plain Text

**Description:** Returns a plain text containing a description of the requested season

**Example Request:** /season-description?season=season-1

**Example Response:**
```
Survivor: Borneo, originally known simply as Survivor or Survivor: Pulau Tiga,
is the first season of the American CBS competitive reality television series
Survivor. The show was filmed from March 13 through April 20, 2000, and premiered
on May 31, 2000. The season consisted participants tasked with being left in a
remote area in Borneo, Malaysia, with minimal tools and supplies. Hosted by
Jeff Probst, it consisted of 39 days with 16 participants being removed by a
majority vote. The series was set in the South China Sea on the remote Malaysian
island of Pulau Tiga in the state of Sabah, about six miles (10 km) off the north
coast of Borneo.[1]
The contestants were initially separated into two tribes, Tagi and Pagong,
which represented the names of the beaches they were on.[1] When 10 players
remained, the contestants merged into one tribe, Rattana. While Tagi and Pagong's
names and makeups were picked by the producers, Rattana was named by contestants
Sean Kenniff and Jenna Lewis, because of the rattan wood that was at their camp.
The series was won by Richard Hatch defeating Kelly Wiglesworth in a 4–3 jury vote.
The finale of the season had an average of 51.7 million viewers, the highest of
the franchise. Nielsen reported that 125 million people watched at least some part of
the finale. In 2006, Hatch was sentenced to 51 months in prison after failing to
declare his $1,000,000 winnings.
```

**Error Handling:**
- Possible 400 Errors (all plain text):
  - If the season-number parameter is missing, an error is returned with the message,
  "Please Enter a Season"
  - If the season-number parameter does not match a season in
  survivor-seasons.json, an error is returned with the message, "Please Enter a Valid Season"
- Possible 500 Errors (all plain text):
  - If an internal server error occurs, returns an error with the message,
  "A Server Error Occurred: " with the error appended to the end of the message
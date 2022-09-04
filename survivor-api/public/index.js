/*
 * Name: Parker Gustafson
 * Date: May 18, 2022
 * Section: CSE 154 AJ
 *
 * This JS file contains the behavior code used for
 * my survivor season generator page. This includes adding
 * functionality to a survivor dropdown menu and a select button
 * which will generate information about the selected season
 * using the "Imgflip API" when a user click on it.
 */

"use strict";

(function() {

  const GET_SEASONS_PATH = "/season-list";
  const GET_SEASON_INFO_PATH = "/season";
  const GET_SEASON_DES_PATH = "/season-description";

  window.addEventListener("load", init);

  /**
   * Adds functionality to the page's button, which
   * will generate information about a survivor season when the "submit-btn"
   * is clicked
   */
  function init() {
    getSeasonList();
    document.getElementById("submit-btn").addEventListener("click", (event) => {
      event.preventDefault();
      generateSeason();
    });
  }

  /**
   * Fetches a list of Survivor Seasons and adds them as options
   * in the dropdown menu
   */
  async function getSeasonList() {
    let url = GET_SEASONS_PATH;
    try {
      let res = await fetch(url);
      statusCheck(res);
      res = await res.json();
      let dropdown = document.getElementById("season-dropdown");
      for (let season in res) {
        let newSeason = document.createElement("option");
        newSeason.value = season.replace(" ", "-").toLowerCase();
        newSeason.text = res[season];
        dropdown.appendChild(newSeason);
      }
    } catch (err) {
      handleError();
    }
  }

  /**
   * Fetches information about a Survivor Season and appends it to the page
   */
  async function generateSeason() {
    let selectedSeason;
    for (let label of document.querySelectorAll("#season-dropdown option")) {
      if (label.selected) {
        selectedSeason = label.value;
      }
    }

    // Will not fetch is user did not select a season

    if (selectedSeason !== "none") {
      let url = GET_SEASON_INFO_PATH + "?season=" + selectedSeason;
      try {
        let res = await fetch(url);
        statusCheck(res);
        res = await res.json();
        let description = await getDescription(selectedSeason);
        addSeasonInformationToPage(res, description);
      } catch (err) {
        handleError();
      }
    }
  }

  /**
   * Creates element tags with survivor season information from the given
   * response, and appends them to the page
   *
   * @param {Response} res - Response containing information about a survivor season
   * @param {String} description - a season description
   */
  function addSeasonInformationToPage(res, description) {
    let container = document.getElementById("survivor-container");
    container.innerHTML = "";
    let seasonLogo = document.createElement("img");
    seasonLogo.src = res.img;
    seasonLogo.alt = "Logo of " + res.title;
    let winner = document.createElement("p");
    winner.textContent = "Winner: " + res.winner;
    let country = document.createElement("p");
    country.textContent = "Location: " + res.country;
    container.appendChild(seasonLogo);
    container.appendChild(winner);
    container.appendChild(country);
    container.appendChild(description);
  }

  /**
   * Fetches a text description of a survivor season
   *
   * @param {String} seasonName - The name of the survivor season
   * @returns {HTMLElement} a p tag containing a description of the given season
   */
  async function getDescription(seasonName) {
    let url = GET_SEASON_DES_PATH + "?season=" + seasonName;
    try {
      let res = await fetch(url);
      statusCheck(res);
      res = await res.text();
      let description = document.createElement("p");
      description.textContent = res;
      return description;
    } catch (err) {
      handleError();
    }
  }

  /**
   * Generates and attaches a paragraph element with
   * an error message to the "survivor-container" div
   */
  function handleError() {
    let errorMessage = document.createElement("p");
    errorMessage.classList.add("error");
    errorMessage.textContent = "Oops! Looks like something went wrong...";
    errorMessage.textContent += "Try reloading the page or selecting a valid season";
    let survivorContainer = document.getElementById("survivor-container");
    survivorContainer.innerHTML = "";
    survivorContainer.appendChild(errorMessage);
  }

  /**
   * Performs a status check on the provided
   * response. Returns the response if it's ok,
   * and throws an error if it's not
   *
   * @param {Response} res the provided response
   * @throws new Error if res is not ok
   * @returns {Response} res (if it's ok)
   */
  async function statusCheck(res) {
    if (!res.ok) {
      throw new Error(await res.text());
    }
    return res;
  }
})();
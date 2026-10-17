// Intel Sustainability Summit check-in

// ---------- Page elements ----------
const form = document.getElementById("checkInForm");
const nameInput = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");
const greeting = document.getElementById("greeting");
const celebration = document.getElementById("celebration");
const attendeeCount = document.getElementById("attendeeCount");
const goalCount = document.getElementById("goalCount");
const progressBar = document.getElementById("progressBar");
const attendeeList = document.getElementById("attendeeList");
const emptyMessage = document.getElementById("emptyMessage");
const clearBtn = document.getElementById("clearBtn");

// ---------- Settings ----------
// The goal is 50 people. You can test with a smaller goal by adding ?goal=5
// to the end of the page link.
let maxAttendees = 50;
const goalFromLink = Number(new URLSearchParams(window.location.search).get("goal"));
if (goalFromLink > 0) {
  maxAttendees = goalFromLink;
}
goalCount.textContent = maxAttendees;

const storageKey = "intelSummitCheckIn";

// Full team names. The keys match the values in the dropdown.
const teamNames = {
  water: "Team Water Wise",
  zero: "Team Net Zero",
  power: "Team Renewables",
};

// Little icons for the attendee list
const teamIcons = {
  water: "🌊",
  zero: "🌿",
  power: "⚡",
};

// ---------- Data ----------
let count = 0;
let teamCounts = { water: 0, zero: 0, power: 0 };
let attendees = [];

// ---------- Saving and loading ----------
function saveProgress() {
  const data = {
    count: count,
    teamCounts: teamCounts,
    attendees: attendees,
  };

  try {
    localStorage.setItem(storageKey, JSON.stringify(data));
  } catch (error) {
    console.log("Could not save progress", error);
  }
}

function loadProgress() {
  try {
    const saved = localStorage.getItem(storageKey);
    if (saved === null) {
      return;
    }

    const data = JSON.parse(saved);

    // only use the saved data if it looks right
    if (
      typeof data.count === "number" &&
      data.teamCounts &&
      Array.isArray(data.attendees)
    ) {
      count = data.count;
      teamCounts = data.teamCounts;
      attendees = data.attendees;
    }
  } catch (error) {
    // the saved data was broken, so we just start from zero
    console.log("Could not load progress", error);
  }
}

// ---------- Updating the page ----------
function showCounts() {
  attendeeCount.textContent = count;

  // update each team card (waterCount, zeroCount, powerCount)
  for (const team in teamNames) {
    document.getElementById(`${team}Count`).textContent = teamCounts[team];
  }
}

function showProgress() {
  let percent = Math.round((count / maxAttendees) * 100);

  // the bar should never go past the end
  if (percent > 100) {
    percent = 100;
  }

  progressBar.style.width = `${percent}%`;
  progressBar.setAttribute("aria-valuenow", percent);
}

function showAttendeeList() {
  attendeeList.innerHTML = "";

  // newest check-in goes first
  for (let i = attendees.length - 1; i >= 0; i--) {
    const person = attendees[i];

    const item = document.createElement("li");
    item.className = "attendee-item";

    const name = document.createElement("span");
    name.className = "attendee-name";
    name.textContent = person.name;

    const badge = document.createElement("span");
    badge.className = `team-badge ${person.team}`;
    badge.textContent = `${teamIcons[person.team]} ${teamNames[person.team]}`;

    item.appendChild(name);
    item.appendChild(badge);
    attendeeList.appendChild(item);
  }

  // show the "no one yet" text only when the list is empty
  if (attendees.length === 0) {
    emptyMessage.style.display = "block";
  } else {
    emptyMessage.style.display = "none";
  }
}

// Works out which team has the most people
function showCelebration() {
  if (count < maxAttendees) {
    celebration.style.display = "none";
    return;
  }

  let highest = 0;
  for (const team in teamCounts) {
    if (teamCounts[team] > highest) {
      highest = teamCounts[team];
    }
  }

  const winners = [];
  for (const team in teamCounts) {
    if (teamCounts[team] === highest) {
      winners.push(teamNames[team]);
    }
  }

  let message = `🏆 We hit our goal of ${maxAttendees} check-ins! `;

  if (winners.length === 1) {
    message += `${winners[0]} showed up the strongest with ${highest} attendees.`;
  } else if (winners.length === 2) {
    message += `${winners[0]} and ${winners[1]} are tied for the win with ${highest} attendees each.`;
  } else {
    message += `All three teams are tied with ${highest} attendees each.`;
  }

  celebration.textContent = message;
  celebration.style.display = "block";
}

// Redraws everything from the saved numbers
function updatePage() {
  showCounts();
  showProgress();
  showAttendeeList();
  showCelebration();
}

// ---------- Messages ----------
function showGreeting(name, teamLabel) {
  greeting.textContent = `🎉 Welcome, ${name} from ${teamLabel}!`;
  greeting.className = "success-message";
  greeting.style.display = "block";
}

function showError(text) {
  greeting.textContent = text;
  greeting.className = "error-message";
  greeting.style.display = "block";
}

// ---------- Check in ----------
form.addEventListener("submit", function (event) {
  // stop the page from reloading
  event.preventDefault();

  const name = nameInput.value.trim();
  const team = teamSelect.value;

  // the name box could just have spaces in it
  if (name === "") {
    showError("Please enter a name to check in.");
    nameInput.focus();
    return;
  }

  // get the full team name from the option the person picked
  const teamLabel = teamSelect.options[teamSelect.selectedIndex].text;

  // add 1 to the total and to that team
  count = count + 1;
  teamCounts[team] = teamCounts[team] + 1;

  // remember this person for the list
  attendees.push({ name: name, team: team });

  saveProgress();
  updatePage();
  showGreeting(name, teamLabel);

  // get the form ready for the next person
  form.reset();
  nameInput.focus();
});

// ---------- Clear all ----------
clearBtn.addEventListener("click", function () {
  const sure = confirm("Clear all check-ins and start from zero?");
  if (!sure) {
    return;
  }

  count = 0;
  teamCounts = { water: 0, zero: 0, power: 0 };
  attendees = [];

  saveProgress();
  updatePage();
  greeting.style.display = "none";
});

// ---------- When the page opens ----------
loadProgress();
updatePage();

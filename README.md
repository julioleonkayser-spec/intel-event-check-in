# Intel Sustainability Summit: Event Check-In

A check-in app for Intel's company-wide Sustainability Summit. Employees are split into three teams (Water Wise, Net Zero and Renewables), and the app counts who shows up so the teams can compete on turnout.

This is Project 5 of the Global Career Accelerator web development program. It follows my earlier Intel work: [intel-sustainability-timeline](https://github.com/julioleonkayser-spec/intel-sustainability-timeline) and [intel-localization](https://github.com/julioleonkayser-spec/intel-localization).

**Live site:** https://julioleonkayser-spec.github.io/intel-event-check-in/

## What it does

- Type a name, pick a team and press Check In.
- A welcome message appears with the person's name and team.
- The total count goes up, and the progress bar moves toward the goal of 50.
- Each team card shows how many people from that team have checked in.
- The attendee list under the team cards shows everyone who checked in, newest first, with a colored team badge.
- When the count reaches 50, a banner shows the team with the most attendees. If teams are tied, the banner says so.
- Everything is saved in the browser with localStorage, so a refresh or a closed tab doesn't lose anything.
- The "Clear all" button wipes the saved check-ins and starts from zero.

## Try the celebration quickly

Checking in 50 people takes a while. Add `?goal=5` to the end of the link and the goal drops to 5:

https://julioleonkayser-spec.github.io/intel-event-check-in/?goal=5

## LevelUps done

1. Celebration message with the winning team (5 pts)
2. Save progress to localStorage (10 pts)
3. Attendee list with team names (10 pts)

## Files

- `index.html`: the page structure (starter file, plus the attendee list and the banner)
- `style.css`: the styling (starter file, plus the list, banner and error message)
- `script.js`: all the JavaScript, which I wrote for this project
- `img/`: the Intel logo and the hero background

## Run it on your computer

Open `index.html` in a browser. No install or build step.

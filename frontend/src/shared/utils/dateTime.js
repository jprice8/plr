export const getFormattedDate = (date) => {
  let d = new Date(date)
  let hour = parseInt(date?.substring(11, 13))
  let suffix = "AM"

  if (hour > 12) {
    hour = hour % 12
    suffix = "PM"
  }

  return {
    month: d.toLocaleString("default", { month: "long" }),
    day: date?.substring(8, 10),
    year: date?.substring(0, 4),
    hour: hour,
    minute: date?.substring(14, 16),
    suffix: suffix,
  }
}

export const getTimelyGreeting = () => {
  let greeting = ""
  const today = new Date()
  const curHr = today.getHours()
  if (curHr < 12) {
    greeting = "Good morning"
  } else if (curHr < 18) {
    greeting = "Good afternoon"
  } else {
    greeting = "Good evening"
  }

  return greeting
}

export const getTimePhase = () => {
  // Get the current phase from the current weekday number
  // Phase 2: Submit F.12AM - F.12PM
  // Phase 3: Sleep F.12PM - M.12AM

  // Current week day in number form
  // Ex. Monday -> 1, Tuesday -> 2, etc...
  var day = new Date().getDay()
  var hour = new Date().getHours()

  // Phase 1: Edit M.12AM - F.12AM
  if (day >= 1 && day < 5) {
    return "editPhase"
  } else if (day === 5 && hour <= 12) {
    return "submitPhase"
  } else if (day === 5 && hour >= 13) {
    return "sleepPhase"
  } else if (day > 5) {
    return "sleepPhase"
  } else {
    return "checkFunction"
  }
}

export const getFacilityName = (facilityCode) => {
  switch (facilityCode) {
    // Resolute
    case "872":
      return "Resolute Health Hospital"
    // SATX
    case "971":
      return "Mission Trail Baptist Hospital"
    case "954":
      return "North Central Baptist Hospital"
    case "968":
      return "Northeast Baptist Hospital"
    case "952":
      return "Saint Luke's Baptist Hospital"
    case "939":
      return "Baptist Medical Center"
    case "21C":
      return "Baptist Distribution Center"
    // Phoenix
    case "705":
      return "Abrazo Arizona Heart Hospital"
    case "730":
      return "Abrazo Arrowhead Campus"
    case "741":
      return "Abrazo Central Campus"
    case "740":
      return "Abrazo Scottsdale Campus"
    case "748":
      return "Abrazo West Campus"
    // Tuscon
    case "676":
      return "Carondelet Holy Cross"
    case "674":
      return "Carondelet St. Joseph's Hospital"
    case "675":
      return "Carondelet St. Mary's Hospital"
    // Northern California
    case "405":
      return "Doctors Hospital of Manteca"
    case "930":
      return "Doctors Medical Center of Modesto"
    case "027":
      return "Emanuel Medical Center"
    case "206":
      return "Sierra Vista Hospital"
    case "554":
      return "San Ramon Regional Medical Center"
    case "166":
      return "Twin Cities Community Hospital"
    // Southern California
    case "694":
      return "Desert Regional Medical Center"
    case "024":
      return "Fountain Valley Regional Hospital"
    case "665":
      return "Hi-Desert Medical Center"
    case "266":
      return "John F. Kennedy Memorial Hospital"
    case "012":
      return "Lakewood Regional Medical Center"
    case "169":
      return "Los Alamitos Medical Center"
    case "430":
      return "Placentia Linda Hospital"
    default:
      return "Unknown Facility Code"
  }
}

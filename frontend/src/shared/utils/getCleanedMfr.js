export const getCleanedMfr = (mfr) => {
  const abbott = new RegExp("^ABBOTT*", "i")
  const acme = new RegExp("^ACME MEDICAL*", "i")
  const alamo = new RegExp("^ALAMO*", "i")
  const avanos = new RegExp("^AVANOS*", "i")
  const appliedMedical = new RegExp("^APPLIED MED*", "i")
  const arthrex = new RegExp("^ARTHREX*", "i")
  const bard = new RegExp("^BARD*", "i")
  const baxter = new RegExp("^BAXTER*", "i")
  const becton = new RegExp("^BECTON*", "i")
  const biosense = new RegExp("^BIOSENSE WEBSTER*", "i")
  const bostonscientific = new RegExp("^BOSTON S*", "i")
  const braun = new RegExp("^B. BRAUN*", "i")
  const cardinal = new RegExp("^CARDINAL*", "i")
  const careline = new RegExp("^CARE LINE*", "i")
  const covidien = new RegExp("^COVIDIEN*", "i")
  const cook = new RegExp("^COOK*", "i")
  const customHealtchareSystems = new RegExp("^CUSTOM HEALTHCARE SYSTEMS*", "i")
  const cryolife = new RegExp("^CRYOLIFE*", "i")
  const davol = new RegExp("^DAVOL*", "i")
  const deroyal = new RegExp("^DEROYAL*", "i")
  const ethicon = new RegExp("ETHICON*", "i")
  const fresenius = new RegExp("^FRESENIUS*", "i")
  const ge = new RegExp("^GE MEDICAL*", "i")
  const greiner = new RegExp("^GREINER*", "i")
  const halyard = new RegExp("*HALYARD*", "i")
  const hologic = new RegExp("^HOLOGIC*", "i")
  const icumed = new RegExp("^ICU MEDICAL*", "i")
  const intuitive = new RegExp("^INTUITIVE*", "i")
  const jandj = new RegExp("^JOHNSON & JOHNSON*", "i")
  const kci = new RegExp("^KINETIC CONCEPTS*", "i")
  const lsl = new RegExp("^LSL*", "i")
  const masimo = new RegExp("^MASIMO*", "i")
  const medtronic = new RegExp("MEDTRONIC*", "i")
  const medline = new RegExp("MEDLINE*", "i")
  const microvasive = new RegExp("^MICROVASIVE*", "i")
  const molnlycke = new RegExp("^MOLNLYCKE*", "i")
  const m3 = new RegExp("^3M*", "i")
  const neotech = new RegExp("^NEOTECH*", "i")
  const pfizer = new RegExp("^PFIZER*", "i")
  const philips = new RegExp("^PHILIPS*", "i")
  const rd = new RegExp("^RD PLASTIC*", "i")
  const sage = new RegExp("^SAGE PROD*", "i")
  const smiths = new RegExp("^SMITHS M*", "i")
  const stryker = new RegExp("STRYKER*", "i")
  const teleflex = new RegExp("TELEFLEX*", "i")
  const terumo = new RegExp("^TERUMO*", "i")
  const welch = new RegExp("^WELCH*", "i")
  const zoll = new RegExp("^ZOLL MED*", "i")

  if (abbott.test(mfr)) {
    return "abbott"
  } else if (acme.test(mfr)) {
    return "tenethealth"
  } else if (appliedMedical.test(mfr)) {
    return "appliedmedical"
  } else if (arthrex.test(mfr)) {
    return "arthrex"
  } else if (baxter.test(mfr)) {
    return "baxter"
  } else if (becton.test(mfr)) {
    return "bd"
  } else if (bostonscientific.test(mfr)) {
    return "bostonscientific"
  } else if (bard.test(mfr)) {
    return "bd"
  } else if (braun.test(mfr)) {
    return "bbraunusa"
  } else if (careline.test(mfr)) {
    return "tenethealth"
  } else if (covidien.test(mfr)) {
    return "medtronicdiabetes"
  } else if (customHealtchareSystems.test(mfr)) {
    return "tenethealth"
  } else if (cryolife.test(mfr)) {
    return "cryolife"
  } else if (m3.test(mfr)) {
    return "3m"
  } else if (ethicon.test(mfr)) {
    return "ethicon"
  } else if (fresenius.test(mfr)) {
    return "fresenius"
  } else if (ge.test(mfr)) {
    return "generalelectric"
  } else if (greiner.test(mfr)) {
    return "gbo"
  } else if (halyard.test(mfr)) {
    return "halyardhealth"
  } else if (lsl.test(mfr)) {
    return "tenethealth"
  } else if (medline.test(mfr)) {
    return "medline"
  } else if (rd.test(mfr)) {
    return "rdplastics"
  } else if (deroyal.test(mfr)) {
    return "deroyal"
  } else if (avanos.test(mfr)) {
    return "avanosmedical"
  } else if (jandj.test(mfr)) {
    return "jnj"
  } else if (biosense.test(mfr)) {
    return "jnj"
  } else if (pfizer.test(mfr)) {
    return "pfizer"
  } else if (cardinal.test(mfr)) {
    return "cardinal"
  } else if (masimo.test(mfr)) {
    return "masimo"
  } else if (microvasive.test(mfr)) {
    return "bostonscientific"
  } else if (kci.test(mfr)) {
    return "3m"
  } else if (medtronic.test(mfr)) {
    return "medtronicdiabetes"
  } else if (neotech.test(mfr)) {
    return "neotech"
  } else if (philips.test(mfr)) {
    return "usa.philips"
  } else if (stryker.test(mfr)) {
    return "sageproducts"
  } else if (smiths.test(mfr)) {
    return "smiths-medical"
  } else if (alamo.test(mfr)) {
    return "tenethealth"
  } else if (icumed.test(mfr)) {
    return "icumed"
  } else if (intuitive.test(mfr)) {
    return "intuitive"
  } else if (sage.test(mfr)) {
    return "sageproducts"
  } else if (teleflex.test(mfr)) {
    return "tenethealth"
  } else if (terumo.test(mfr)) {
    return "terumobct"
  } else if (davol.test(mfr)) {
    return "bd"
  } else if (cook.test(mfr)) {
    return "cookmedical"
  } else if (molnlycke.test(mfr)) {
    return "molnlycke"
  } else if (hologic.test(mfr)) {
    return "hologic"
  } else if (welch.test(mfr)) {
    return "hillrom"
  } else if (zoll.test(mfr)) {
    return "zoll"
  } else {
    return "tenethealth"
  }
}

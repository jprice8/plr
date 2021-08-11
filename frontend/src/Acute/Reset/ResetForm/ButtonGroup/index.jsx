import React from "react"
import NextStepButton from "./NextStepButton"
import BackStepButton from "./BackStepButton"
import SubmitButton from "./SubmitButton"

const ButtonGroup = (props) => {
  const curStep = props.stepIndex

  if (curStep === 1) {
    return (
      <div className="pt-5 flex justify-center">
        <NextStepButton />
      </div>
    )
    // If second, third, or fourth...
  } else if (curStep > 1 && curStep < 5) {
    return (
      <div className="pt-5 flex justify-between">
        <BackStepButton onBack={props.onBackStepHandler} />
        <NextStepButton />
      </div>
    )
  } else {
    return (
      <div className="pt-5 flex justify-between">
        <BackStepButton onBack={props.onBackStepHandler} />
        <SubmitButton />
      </div>
    )
  }
}

export default ButtonGroup

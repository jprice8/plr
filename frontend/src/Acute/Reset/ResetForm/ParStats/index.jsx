import React, { Fragment} from "react"

import Excerpt from "./Excerpt"

const ParStats = ({ step, parIds }) => {
  const content = parIds.map((parId) => (
    <Excerpt key={parId} parId={parId} />
  ))

  return <Fragment>{content[step]}</Fragment>
}

export default ParStats

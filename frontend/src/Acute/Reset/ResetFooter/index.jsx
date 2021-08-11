import React from 'react'
import PreviousPageButton from './PreviousPageButton'
import NumberedPageButton from './NumberedPageButton'
import NextPageButton from './NextPageButton'

const ResetFooter = ({ data, prevLinkHandler, numberedLinkHandler, nextLinkHandler, currentPageNumber }) => {
  const pages = Math.ceil(data.count / 5)
  const nextUrl = data.next 
  const prevUrl = data.previous

  return (
    <nav className="border-t border-gray-200 grid grid-cols-3 justify-items-stretch pb-2">
      <PreviousPageButton prevUrl={prevUrl} prevLinkHandler={prevLinkHandler} />
      <NumberedPageButton pages={pages} numberedLinkHandler={numberedLinkHandler} currentPageNumber={currentPageNumber} />
      <NextPageButton nextUrl={nextUrl} nextLinkHandler={nextLinkHandler} />
    </nav>
  )
}

export default ResetFooter

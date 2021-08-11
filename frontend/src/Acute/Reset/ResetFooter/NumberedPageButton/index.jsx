import React from "react"

const NumberedPageButton = ({
  pages,
  numberedLinkHandler,
  currentPageNumber,
}) => {

  const numberedLinks = []
  for (let i = 1; i < pages + 1; i++) {
    const linkStyle = currentPageNumber === i ? "border-cyan-500 text-cyan-600 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium cursor-pointer"
      
    numberedLinks.push(
      <a
        key={i}
        onClick={(e) => numberedLinkHandler(e, i)}
        className={linkStyle}
      >
        {i}
      </a>
    )
  }

  return (
    <div className="hidden md:block place-self-center pb-5 px-5">
      {numberedLinks}
    </div>
  )
}

export default NumberedPageButton

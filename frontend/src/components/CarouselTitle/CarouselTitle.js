import React from "react"
import { EuiTitle } from "@elastic/eui"
import { motion, AnimatePresence } from "framer-motion"
import styled from "styled-components"

const AnimatedTitle = styled.div`
  margin-bottom: 1rem;

  & h1 {
    display: flex;
    color: #212121;
    margin: 0 0.25rem;
  }
`

const TitleWrapper = styled.span`
  display: flex;
  flex-wrap: wrap;
`

const AnimatedCarouselTitle = styled.span`
  position: relative;
  display: flex;
  justify-content: center;
  width: 150px;
  margin: 0 15px;
  white-space: nowrap;

  & .underline {
    width: 170px;
    height: 2px;
    border-radius: 4px;
    position: absolute;
    bottom: -4px;
    left: -10px;
    background: black;
    background: dodgerblue;
  }
`

const transitionDuration = 0.4
const transitionEase = [0.68, -0.55, 0.265, 1.55]
const statement = `For busy people who need their`

export default function CarouselTitle({ items, current }) {
  return (
    <AnimatedTitle>
      <EuiTitle>
        <TitleWrapper>
          {statement.split(" ").map((word, i) => (
            <h1 key={i}>{word}</h1>
          ))}

          <AnimatePresence exitBeforeEnter>
            <AnimatedCarouselTitle>
              {items.map((item, i) => {
                return (
                  current === i && (
                    <React.Fragment key={i}>
                      <motion.span
                        key={i}
                        initial="top"
                        animate="present"
                        exit="bottom"
                        variants={{
                          top: { opacity: 0, y: -150 },
                          present: { opacity: 1, y: 0 },
                          bottom: { opacity: 0, y: 150 }
                        }}
                        transition={{ duration: transitionDuration, ease: transitionEase }}
                      >
                        {item.label}
                      </motion.span>
                    </React.Fragment>
                  )
                )
              })}
              <div className="underline" />
            </AnimatedCarouselTitle>
          </AnimatePresence>

          <h1>cleaned.</h1>
        </TitleWrapper>
      </EuiTitle>
    </AnimatedTitle>
  )
}

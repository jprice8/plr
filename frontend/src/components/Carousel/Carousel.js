import React from "react"
import { EuiPanel } from "@elastic/eui"
import { motion, AnimatePresence } from "framer-motion"
import styled from "styled-components"

const CarouselWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  min-height: 450px;
  min-width: 450px;

  @media screen and (max-width: 450px) {
    min-height: calc(100vw - 25px);
    min-width: calc(100vw - 25px);
  }
`
const StyledEuiPanel = styled(EuiPanel)`
  /* width: 450px;
  height: 450px; */
  max-width: 450px;
  max-height: 450px;
  border-radius: 50%;

  & > img {
    width: 100%;
    border-radius: 50%;
  }

  @media screen and (max-width: 450px) {
    min-height: calc(100vw - 25px);
    min-width: calc(100vw - 25px);
  }
`

const transitionDuration = 0.3
const transitionEase = [0.68, -0.55, 0.265, 1.55]

export default function Carousel({ items = [], current, ...props }) {
  return (
    <CarouselWrapper {...props}>
      <AnimatePresence exitBeforeEnter>
        {items.map((item, i) =>
          current === i ? (
            <React.Fragment key={i}>
              <motion.div
                key={i}
                initial="left"
                animate="present"
                exit="right"
                variants={{
                  left: { opacity: 0, x: -70 },
                  present: { opacity: 1, x: 0 },
                  right: { opacity: 0, x: 70 }
                }}
                transition={{ duration: transitionDuration, ease: transitionEase }}
              >
                <StyledEuiPanel paddingSize="l">{item.content}</StyledEuiPanel>
              </motion.div>
            </React.Fragment>
          ) : null
        )}
      </AnimatePresence>
    </CarouselWrapper>
  )
}

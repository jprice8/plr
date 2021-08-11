import React from "react"
import { Link } from "react-router-dom"

const steps = [
  { name: "Par 1", href: "./step1", stage: 1 },
  { name: "Par 2", href: "./step2", stage: 2 },
  { name: "Par 3", href: "./step3", stage: 3 },
  { name: "Par 4", href: "./step4", stage: 4 },
  { name: "Par 5", href: "./step5", stage: 5 },
]

const Stepper = ({ stepIndex, onStepperClickLinkHandler }) => {
  return (
    <div className="bg-white shadow">
      <div className="px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
        <div className="py-6 lg:border-t lg:border-gray-200">
          <nav className="flex" aria-label="progressBar">
            <p className="text-sm font-medium">
              Par {stepIndex} of {steps.length}
            </p>
            <ol className="ml-8 flex items-center space-x-5">
              {steps.map((step) => (
                <li key={step.name}>
                  {step.stage < stepIndex ? (
                    <Link
                      to={step.href}
                      onClick={() => onStepperClickLinkHandler(step.stage)}
                      className="block w-2.5 h-2.5 bg-cyan-600 rounded-full hover:bg-cyan-900 transform hover:scale-110"
                    >
                      <span className="sr-only">{step.name}</span>
                    </Link>
                  ) : step.stage === stepIndex ? (
                    <Link
                      to={step.href}
                      onClick={() => onStepperClickLinkHandler(step.stage)}
                      className="relative flex items-center justify-center"
                      aria-current="current"
                    >
                      <span
                        className="absolute w-5 h-5 p-px flex"
                        aria-hidden="true"
                      >
                        <span className="w-full h-full rounded-full bg-cyan-200" />
                      </span>
                      <span
                        className="relative block w-2.5 h-2.5 bg-cyan-600 rounded-full"
                        aria-hidden="true"
                      />
                      <span className="sr-only">{step.name}</span>
                    </Link>
                  ) : (
                    <Link
                      to={step.href}
                      onClick={() => onStepperClickLinkHandler(step.stage)}
                      className="block w-2.5 h-2.5 bg-gray-200 rounded-full hover:bg-gray-400 transform hover:scale-110"
                    >
                      <span className="sr-only">{step.name}</span>
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </div>
    </div>
  )
}

export default Stepper

import React, { Fragment, useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useForm } from "react-hook-form"
import { useParams, useLocation, useHistory } from "react-router-dom"
import toast from "react-hot-toast"
import { unwrapResult } from "@reduxjs/toolkit"

import {
  selectParIds,
  addNestedItemReset,
  updateNestedItemReset,
  fetchPars,
} from "../../../shared/redux/parsSlice"

import Stepper from "./Stepper"
import ParStats from "./ParStats"
import AccuracyToggle from "./AccuracyToggle"
import ButtonGroup from "./ButtonGroup"
import ResetHistoryCard from "./ResetHistoryCard"
import ErrorModal from "../../../shared/components/ErrorModal"
import Loader from "../../../shared/components/Loader"
import ClearbitDisclosure from "../../../shared/components/ClearbitDisclosure"

const ResetForm = () => {
  const [loading, setLoading] = useState(false)
  const [parAccurate, setParAccurate] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm()

  const { weekNo } = useParams()
  const dispatch = useDispatch()
  const location = useLocation()
  const history = useHistory()
  const stepIndex = parseInt(
    location.pathname.substring(
      location.pathname.length - 1,
      location.pathname.length
    )
  )
  const [step, setStep] = useState(stepIndex)

  const onNextStepHandler = () => {
    setStep(step + 1)
    history.push(`/${weekNo}/step${step + 1}`)
  }

  const onBackStepHandler = () => {
    setValue("newParLevel", "")
    setParAccurate(false)
    setStep(step - 1)
    history.push(`/${weekNo}/step${step - 1}`)
  }

  const onFinalSubmitHandler = () => {
    setStep(1)
    history.push("/reset")
  }

  const onStepperClickLinkHandler = (newIndex) => {
    setValue("newParLevel", "")
    setParAccurate(false)
    setStep(newIndex)
  }

  const parStatus = useSelector((state) => state.pars.status)

  useEffect(() => {
    if (parStatus === "idle") {
      dispatch(fetchPars())
    }
  }, [parStatus, dispatch, step])

  const user = useSelector((state) => state.users)
  const parIds = useSelector(selectParIds)
  const parResetData = useSelector((state) => state.pars.entities)
  const parIndex = parIds[stepIndex - 1]
  const par = parResetData[parIndex]
  const isUpdate = par?.itemresets

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      // Check if par has been reset before,
      // If it has, then update. If not, then create new reset.
      if (isUpdate) {
        const resultAction = await dispatch(
          updateNestedItemReset({
            id: par?.itemresets.id,
            user: user.id,
            par: par?.id,
            reset_level: parseInt(data.newParLevel),
            send_back_confirmed: parAccurate,
            week: weekNo,
          })
        )
        unwrapResult(resultAction)
        toast.success("Reset updated successfully!")
      } else {
        const resultAction = await dispatch(
          addNestedItemReset({
            user: user.id,
            par: par?.id,
            reset_level: parseInt(data.newParLevel),
            send_back_confirmed: parAccurate,
            week: weekNo,
          })
        )
        unwrapResult(resultAction)
        toast.success("Par reset successfully!")
      }
      setValue("newParLevel", "")
      setParAccurate(false)
      onNextStepHandler()
    } catch (error) {
      console.error("Failed to save nested itemreset: ", error)
      toast.error("Failed to save new par level! Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const onFinalSubmit = async (data) => {
    setLoading(true)
    try {
      if (isUpdate) {
        const resultAction = await dispatch(
          updateNestedItemReset({
            id: par?.itemresets.id,
            user: user.id,
            par: par?.id,
            reset_level: parseInt(data.newParLevel),
            send_back_confirmed: parAccurate,
            week: weekNo,
          })
        )
        unwrapResult(resultAction)
      } else {
        const resultAction = await dispatch(
          addNestedItemReset({
            user: user.id,
            par: par?.id,
            reset_level: parseInt(data.newParLevel),
            send_back_confirmed: parAccurate,
            week: weekNo,
          })
        )
        unwrapResult(resultAction)
      }
      setValue("newParLevel", "")
      setParAccurate(false)
      toast.success("Week completed! Great job!")
      onFinalSubmitHandler()
    } catch (error) {
      console.error("Failed to save final par reset: ", error)
      toast.error("Failed to save new par level! Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const isParAccurateHandler = () => {
    setParAccurate(!parAccurate)
  }

  return (
    <Fragment>
      <Stepper
        stepIndex={stepIndex}
        onStepperClickLinkHandler={onStepperClickLinkHandler}
      />
      <div className="sm:max-w-4xl sm:mx-auto pt-10">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form
            onSubmit={
              stepIndex === 5
                ? handleSubmit(onFinalSubmit)
                : handleSubmit(onSubmit)
            }
            className="space-y-6"
          >
            <ParStats step={stepIndex - 1} parIds={parIds} />

            <div className="sm:max-w-sm sm:mx-auto">
              <label
                htmlFor="newParLevel"
                className="block text-sm font-medium text-gray-700"
              >
                New Par Level
              </label>
              <select
                id="newParLevel"
                name="newParLevel"
                className="mt-1 block w-full pl-3 pr-10 text-base border-gray-300 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm rounded-md"
                {...register("newParLevel", { required: true })}
              >
                {par?.multiples_list.map((multiple) => (
                  <option key={multiple} value={multiple}>
                    {multiple}
                  </option>
                ))}
              </select>
              {errors.newParLevel && (
                <ErrorModal
                  errorMessage={
                    "Your input is required. If keeping par level the same, then choose the highest option."
                  }
                />
              )}

              <AccuracyToggle
                isParAccurateHandler={isParAccurateHandler}
                parAccurate={parAccurate}
                currentParLevel={par?.current_par_qty}
              />
            </div>

            {isUpdate && <ResetHistoryCard parId={par?.id} user={user} />}

            {loading ? (
              <div className="mt-5 flex justify-center">
                <Loader />
              </div>
            ) : (
              <ButtonGroup
                stepIndex={stepIndex}
                onBackStepHandler={onBackStepHandler}
              />
            )}
          </form>
        </div>
        <ClearbitDisclosure />
      </div>
    </Fragment>
  )
}

export default ResetForm

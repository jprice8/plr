import React from 'react'
import { 
  NotFoundPage,
  ParsHome,
  ParView
} from '../../components'
import { Routes, Route } from 'react-router-dom'

export default function ParsPage() {
  return (
    <>
      <Routes>
        <Route path="/" element={<ParsHome />} />
        <Route path=":par_id" element={<ParView />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

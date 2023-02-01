"use client"

import { useRouter } from 'next/navigation'
import { useState } from 'react'
// import './UrlForm.css'

export default function UrlForm() {
  const router = useRouter()
  const [urlInput, setUrlInput] = useState('')

  return (
    <form
      className="card"
      onSubmit={(e) => {
        e.preventDefault()
        // forward to /domain/:domain
        router.push(`/domain/${urlInput}`)
      }}
    >
      <label hidden htmlFor="url-input">URL</label>
      <input
        id="url-input"
        type="text"
        value={urlInput}
        placeholder="Lookup Domain or IP"
        onChange={(e) => setUrlInput(e.target.value)}
      />
      <button id="url-submit" type="submit">Lookup</button>
    </form>
  )
}
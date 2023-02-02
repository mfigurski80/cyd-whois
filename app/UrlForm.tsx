"use client"

import { useState } from 'react'
// import './UrlForm.css'

interface UrlFormProps {
  onSubmit: (url: string) => void
}

export default function UrlForm({ onSubmit }: UrlFormProps) {
  const [urlInput, setUrlInput] = useState('')

  return (
    <form
      className="card"
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit(urlInput)
        setUrlInput('')
      }}
    >
      <label hidden htmlFor="url-input">Lookup Domain Name or IP</label>
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
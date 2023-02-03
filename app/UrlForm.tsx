"use client"

import { useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai';

import styles from  "./page.module.scss";
// import './UrlForm.css'

interface UrlFormProps {
  onSubmit: (url: string) => void
}

export default function UrlForm({ onSubmit }: UrlFormProps) {
  const [urlInput, setUrlInput] = useState('')

  return (
    <form
      className={styles['input-form']}
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
      <button id="url-submit" type="submit"><AiOutlineSearch /></button>
    </form>
  )
}
import React, { useState, useEffect } from 'react'
import classes from './UpdateProfile.module.css'
import axios from 'axios'
import { useSelector } from 'react-redux'

const UpdateProfile = () => {
  const auth = useSelector((state) => state.auth)
  const [name, setName] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.post(
          'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyA-jeJWjkeZO9L8-iw8IbwEjyrI4TOgS74',
          { idToken: auth.token }
        )
        const user = res.data.users[0]
        // console.log('user')
        // console.log(user)
        setName(user.displayName)
        setUrl(user.photoUrl)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])

  const updateHandler = async (e) => {
    e.preventDefault()
    // console.log(name, url)
    const data = {
      idToken: auth.token,
      displayName: name,
      photoUrl: url,
      returnSecureToken: false,
    }
    console.log(data)
    const resp = await axios.post(
      'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyA-jeJWjkeZO9L8-iw8IbwEjyrI4TOgS74',
      data
    )
    console.log(resp)
    const user = resp.data
    console.log(user)
    setName(user.displayName)
    setUrl(user.photoUrl)
  }

  return (
    <>
      <div className={classes.welcome}>
        <p>
          <i>Winners never quite, Quitters never win</i>
        </p>
        <p className={classes.p2}>
          <i>
            Your Profile is <b>64%</b> completed. A complete Profile has higher
            chances of landing a job. <span>Complete now</span>
          </i>
        </p>
      </div>
      <div className={classes.updateDetails}>
        <div className={classes.header}>
          <h3>Contact Details</h3>
          <button>Cancel</button>
        </div>
        <div className={classes.inputDetails}>
          <div className={classes.in}>
            <label htmlFor='name'>Full Name</label>
            <input
              id='name'
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className={classes.in}>
            <label htmlFor='image'>Profile Photo URL</label>
            <input
              id='image'
              type='url'
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
        </div>
        <button onClick={updateHandler}>Update</button>
      </div>
    </>
  )
}

export default UpdateProfile

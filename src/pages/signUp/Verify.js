import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import classes from './Verify.module.css'
import axios from 'axios'

const Verify = () => {
  const history = useHistory()
  const [mailUrl, setMailUrl] = useState('')

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      let tmp1 = mailUrl.split('oobCode=')[1]
      let tmp2 = tmp1.split('&apiKey=')[0]
      // console.log(tmp2)
      const resp = await axios.post(
        'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyA-jeJWjkeZO9L8-iw8IbwEjyrI4TOgS74',
        {
          oobCode: tmp2,
        }
      )
      // console.log(resp)
      if (resp.data.emailVerified === true) {
        console.log(resp)
        history.replace('/welcome')
      }
    } catch (error) {
      window.alert('Please enter valid link...')
      console.log(error.message)
    }
  }
  return (
    <div className={classes.updateDetails}>
      <h1>Verify Email</h1>
      <p>Please check your email and enter the link which you will get</p>
      <label htmlFor='verifyLink'>Enter URL</label>
      <input
        id='verifyLink'
        type='url'
        value={mailUrl}
        onChange={(e) => setMailUrl(e.target.value)}
      />
      <button onClick={submitHandler}>Submit</button>
    </div>
  )
}

export default Verify

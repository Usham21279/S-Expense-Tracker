import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import classes from './AddExpense.module.css'
import axios from 'axios'
import { expenseActions } from '../../store/expenseSlice'

const AddExpense = () => {
  const dispatch = useDispatch()
  const [money, setMoney] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('Food')

  const submitHandler = async (e) => {
    e.preventDefault()
    if (money && description && category) {
      const expense = {
        money: money,
        description: description,
        category: category,
      }
      try {
        const resp = await axios.post(
          'https://expense-tracker-app-a5fd4-default-rtdb.firebaseio.com/expenses.json',
          {
            body: JSON.stringify(expense),
            headers: {
              'content-type': 'application/json',
            },
          }
        )
        if (resp.status === 200) {
          const res = await axios.get(
            'https://expense-tracker-app-a5fd4-default-rtdb.firebaseio.com/expenses.json'
          )
          if (res.status === 200) {
            const data = res.data

            const loadArray = []
            for (const key in data) {
              const parsedData = JSON.parse(data[key].body)
              // console.log(parsedData)
              loadArray.unshift({
                id: key,
                money: parsedData.money,
                description: parsedData.description,
                category: parsedData.category,
              })
            }
            console.log(loadArray)
            dispatch(expenseActions.addExpense(loadArray))
          } else {
            alert('Something went wrong please Refresh Page...')
          }
        } else {
          alert('Something went wrong...')
        }
      } catch (error) {
        window.alert('Please try again...')
        console.log(error.message)
      }
      setCategory('Food')
      setDescription('')
      setMoney('')
    } else {
      alert('Please enter all details...')
    }
  }

  return (
    <div>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.formInside}>
          <h2>Enter Your Expense</h2>
          <div className={classes.enterVal}>
            <input
              id='money'
              type='number'
              placeholder='Enter Money'
              value={money}
              onChange={(e) => setMoney(e.target.value)}
            />
          </div>
          <div className={classes.enterVal}>
            <input
              id='desc'
              type='text'
              placeholder='Description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className={classes.dropdown}>
            <label htmlFor='category'>Category:</label>
            <select
              id='category'
              name='category'
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value='Food'>Food</option>
              <option value='Petrol'>Petrol</option>
              <option value='Salary'>Salary</option>
            </select>
          </div>
          <button type='Submit'>Submit</button>
        </div>
      </form>
    </div>
  )
}

export default AddExpense

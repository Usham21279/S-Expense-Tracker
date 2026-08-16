import React, { useState } from 'react'
import classes from './EditExpense.module.css'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { expenseActions } from '../../store/expenseSlice'
import axios from 'axios'

const EditExpense = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const editData = useSelector((state) => state.expense.editData)
  const [money, setMoney] = useState(editData.money)
  const [description, setDescription] = useState(editData.description)
  const [category, setCategory] = useState(editData.category)
  const [isLoading, setIsLoading] = useState(false)

  const submitHandler = async (e) => {
    e.preventDefault()
    if (money && description && category) {
      const expense = {
        money: money,
        description: description,
        category: category,
      }
      setIsLoading(true)
      try {
        const resp = await axios.delete(
          `https://expense-tracker-app-a5fd4-default-rtdb.firebaseio.com/expenses/${editData.id}.json`
        )
        console.log(resp)
        if (resp.status === 200) {
          console.log('ExpenseDeleted successfully...')
        } else {
          setIsLoading(false)

          alert('Something went wrong please try again...')
        }
      } catch (error) {
        setIsLoading(false)

        window.alert('Something went wrong please try again...')
        console.log(error.message)
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
            setIsLoading(false)

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
            history.replace('/expenses')
          } else {
            setIsLoading(false)

            alert('Something went wrong please Refresh Page...')
          }
        } else {
          setIsLoading(false)

          alert('Something went wrong...')
        }
      } catch (error) {
        setIsLoading(false)

        window.alert('Please try again...')
        console.log(error.message)
      }
      setIsLoading(false)
      setCategory('Food')
      setDescription('')
      setMoney('')
      dispatch(expenseActions.editExpense({}))
    } else {
      alert('Please enter all details...')
    }
  }

  return (
    <div>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.formInside}>
          <h2>Edit Your Expense</h2>
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
          <button type='Submit'>
            {isLoading ? 'Wait a second' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditExpense

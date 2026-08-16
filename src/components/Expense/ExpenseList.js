import React, { useEffect } from 'react'
import SingleExpense from './SingleExpense'
import classes from './ExpenseList.module.css'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { expenseActions } from '../../store/expenseSlice'

const ExpenseList = () => {
  const dispatch = useDispatch()
  const expenses = useSelector((state) => state.expense.expenses)

  useEffect(() => {
    async function fetchHandler() {
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
        // if (expenses.length === 0) {
        // expenses = loadArray
        // }
      }
    }
    fetchHandler()
  }, [])

  let totalAmount = 0
  if (expenses) {
    totalAmount = expenses.reduce((acc, val) => {
      return (acc += Number(val.money))
    }, 0)
    console.log(totalAmount)
  }

  const csvDataDownloader = () => {
    const csvData = [['Category', 'Money', 'Description']]

    expenses.forEach((each) => {
      let tmp = [each.category, each.money, each.description]
      csvData.push(tmp)
    })

    function makeCSV(allRows) {
      return allRows.map((r) => r.join(',')).join('\n')
    }

    const a2 = document.getElementById('a2')
    const blob2 = new Blob([makeCSV(csvData)])
    a2.href = URL.createObjectURL(blob2)
  }

  return (
    <div className={classes.mainList}>
      <div>
        <a id='a2' download='file2.csv'>
          <button onClick={csvDataDownloader} className={classes.btnc}>
            Download Expenses
          </button>
        </a>
      </div>
      {totalAmount > 10000 && (
        <button className={classes.premium}>Activate Premium</button>
      )}

      <ul className={classes.list}>
        {expenses.map((each) => {
          return <SingleExpense key={each.id} item={each} />
        })}
      </ul>
    </div>
  )
}

export default ExpenseList

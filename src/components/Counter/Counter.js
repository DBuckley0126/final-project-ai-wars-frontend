import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addCount } from './counterActions'

const Counter = () => {

  // const [count, setCount] = useState(0)

  const count = useSelector(state => state.testReducer.count)
  const dispatch = useDispatch()

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={()=> dispatch(addCount(1))}>Add</button>
    </div>
  )
}

export default Counter
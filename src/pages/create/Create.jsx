import './Create.css'
import { useState, useRef } from 'react'
import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { projectFirestore } from '../../firebase/config'

const Create = () => {
  const [title, setTitle] = useState('')
  const [method, setMethod] = useState('')
  const [cookingTime, setCookingTime] = useState('')
  const [newIngredients, setNewIngredients] = useState('')
  const [ingredients, setIngredients] = useState([])
  const ingredientInput = useRef(null)
  const history = useHistory()

  // const { postData, data, error } = useFetch(
  //   'http://localhost:3000/recipes',
  //   'POST'
  // )

  const handleSubmit = async (e) => {
    e.preventDefault()
    const doc = {
      title,
      ingredients,
      method,
      cookingTime: cookingTime + ' minutes',
    }

    try {
      await projectFirestore.collection('recipes').add(doc)
      history.push('/')
    } catch (err) {
      console.log(err)
    }
  }

  const handleAdd = (e) => {
    e.preventDefault()
    const ing = newIngredients.trim()

    if (ing && !ingredients.includes(ing)) {
      setIngredients((prevIngredients) => [...prevIngredients, ing])
    }
    setNewIngredients('')
    ingredientInput.current.focus()
  }

  // redirect user when we get data response
  // useEffect(() => {
  //   if (data) {
  //     history.push('/')
  //   }
  // }, [data])

  return (
    <div className='create'>
      <h2 className='page-title'>Add a New Recipe</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Recipe title:</span>
          <input
            type='text'
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          />
        </label>

        <label>
          <span>Recipe ingredients:</span>
          <div className='ingredients'>
            <input
              type='text'
              onChange={(e) => setNewIngredients(e.target.value)}
              value={newIngredients}
              ref={ingredientInput}
            />
            <button onClick={handleAdd} className='btn'>
              Add
            </button>
          </div>
        </label>
        <p>
          Current ingredients:{' '}
          {ingredients.map((item) => (
            <em key={item}>{item}, </em>
          ))}
        </p>

        <label>
          <span>Recipe method:</span>
          <textarea
            onChange={(e) => setMethod(e.target.value)}
            value={method}
            required
          />
        </label>

        <label>
          <span>Cooking time (minutes):</span>
          <input
            type='number'
            onChange={(e) => setCookingTime(e.target.value)}
            value={cookingTime}
            required
          />
        </label>

        <button className='btn'>Submit</button>
      </form>
    </div>
  )
}

export default Create

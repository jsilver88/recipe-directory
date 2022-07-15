import './Recipe.css'
import { useParams } from 'react-router-dom'
import { useTheme } from '../../hooks/useTheme'
import { useEffect, useState } from 'react'
import { projectFirestore } from '../../firebase/config'

const Recipe = () => {
  const { id } = useParams()
  // const url = 'http://localhost:3000/recipes/' + id
  // const { data: recipe, error, isPending } = useFetch(url)
  const { mode } = useTheme()

  const [recipe, setRecipe] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    setIsPending(true)

    const unsub = projectFirestore
      .collection('recipes')
      .doc(id)
      .onSnapshot((doc) => {
        if (doc.exists) {
          setIsPending(false)
          setRecipe(doc.data())
        } else {
          setIsPending(false)
          setError('Could not find that recipe')
        }
      })

    return () => unsub()
  }, [id])

  const handleClick = () => {
    projectFirestore.collection('recipes').doc(id).update({
      title: 'Something completely different',
    })
  }

  return (
    <div className={`recipe ${mode}`}>
      {error && <p className='error'>{error}</p>}
      {isPending && <p className='loading'>Loading...</p>}
      {recipe && (
        <>
          <h2 className='page-title'>{recipe.title}</h2>
          <p>Takes {recipe.cookingTime} to cook.</p>
          <ul>
            {recipe.ingredients.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className='method'>{recipe.method}</p>
          <button onClick={handleClick}>Update me</button>
        </>
      )}
    </div>
  )
}

export default Recipe

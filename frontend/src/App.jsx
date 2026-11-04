
import { useEffect, useState } from 'react'
import './App.css'

function App() {
    const [recipes, setRecipes] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [sortBy, setSortBy] = useState('id')
    const [sortDirection, setSortDirection] = useState('asc')

    useEffect(() => {
        const params = new URLSearchParams({
            ime: searchTerm,
            sortBy: sortBy,
            direction: sortDirection
        })

        fetch(`http://localhost:8080/api/recipes?${params}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Napaka pri nalaganju receptov.')
                }
                return response.json()
            })
            .then(data => {
                setRecipes(data.map(recipe => ({
                    id: recipe.id,
                    name: recipe.ime,
                    description: recipe.opis || '',
                    ingredients: recipe.sestavine
                        ? recipe.sestavine.split(',').map(item => item.trim())
                        : [],
                    prepTime: recipe.casPriprave
                })))
            })
            .catch(error => {
                console.error(error)
                alert('Receptov ni bilo mogoče naložiti. Preveri, ali backend deluje.')
            })
    }, [searchTerm, sortBy, sortDirection])

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [ingredients, setIngredients] = useState('')
    const [prepTime, setPrepTime] = useState('')
    const [editingId, setEditingId] = useState(null)


    async function handleSubmit(event) {
        event.preventDefault()

        if (!name.trim() || !ingredients.trim() || !prepTime) {
            alert('Izpolni vsa obvezna polja.')
            return
        }

        const recipeData = {
            ime: name.trim(),
            opis: description.trim(),
            sestavine: ingredients
                .split(',')
                .map(item => item.trim())
                .filter(Boolean)
                .join(', '),
            casPriprave: Number(prepTime),
        }

        try {
            const response = editingId !== null
                ? await fetch(`http://localhost:8080/api/recipes/${editingId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(recipeData),
                })
                : await fetch('http://localhost:8080/api/recipes', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(recipeData),
                })

            if (!response.ok) {
                throw new Error('Napaka pri shranjevanju recepta.')
            }

            const savedRecipe = await response.json()

            const formattedRecipe = {
                id: savedRecipe.id,
                name: savedRecipe.ime,
                description: savedRecipe.opis || '',
                ingredients: savedRecipe.sestavine
                    ? savedRecipe.sestavine.split(',').map(item => item.trim())
                    : [],
                prepTime: savedRecipe.casPriprave,
            }

            if (editingId !== null) {
                setRecipes(recipes.map(recipe =>
                    recipe.id === editingId ? formattedRecipe : recipe
                ))
            } else {
                setRecipes([...recipes, formattedRecipe])
            }

            resetForm()
        } catch (error) {
            console.error(error)
            alert('Recepta ni bilo mogoče shraniti. Preveri backend.')
        }
    }


    function resetForm() {
        setName('')
        setDescription('')
        setIngredients('')
        setPrepTime('')
        setEditingId(null)
    }

    function editRecipe(recipe) {
        setEditingId(recipe.id)
        setName(recipe.name)
        setDescription(recipe.description)
        setIngredients(recipe.ingredients.join(', '))
        setPrepTime(String(recipe.prepTime))
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }


    async function deleteRecipe(id) {
        if (!window.confirm('Ali res želiš izbrisati ta recept?')) {
            return
        }

        try {
            const response = await fetch(
                `http://localhost:8080/api/recipes/${id}`,
                { method: 'DELETE' }
            )

            if (!response.ok) {
                throw new Error('Napaka pri brisanju recepta.')
            }

            setRecipes(recipes.filter(recipe => recipe.id !== id))

            if (editingId === id) {
                resetForm()
            }
        } catch (error) {
            console.error(error)
            alert('Recepta ni bilo mogoče izbrisati iz baze.')
        }
    }


    return (
        <main className="app">
            <header className="hero">
                <p className="eyebrow">TVOJA KUHINJA, TVOJI RECEPTI</p>
                <h1>Knjiga receptov</h1>
                <p className="subtitle">
                    Vsi tvoji najljubši okusi na enem mestu.
                </p>
            </header>

            <section className="recipe-form-section">
                <div className="section-heading">
                    <div>
                        <p className="eyebrow">USTVARI NEKAJ DOBREGA</p>
                        <h2>{editingId !== null ? 'Uredi recept' : 'Dodaj nov recept'}</h2>
                    </div>
                    <span className="heading-icon">✎</span>
                </div>


                <form onSubmit={handleSubmit} className="recipe-form">
                    <div className="control-group">
                        <label htmlFor="name">Ime recepta *</label>
                        <input
                            id="name"
                            value={name}
                            onChange={event => setName(event.target.value)}
                            placeholder="Npr. Domača testeninska solata"
                            required
                        />
                    </div>

                    <div className="control-group">
                        <label htmlFor="prepTime">Čas priprave (v minutah) *</label>
                        <input
                            id="prepTime"
                            type="number"
                            min="1"
                            value={prepTime}
                            onChange={event => setPrepTime(event.target.value)}
                            placeholder="Npr. 30"
                            required
                        />
                    </div>

                    <div className="control-group full-width">
                        <label htmlFor="description">Opis</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={event => setDescription(event.target.value)}
                            placeholder="Na kratko opiši svojo jed ..."
                            rows="3"
                        />
                    </div>

                    <div className="control-group full-width">
                        <label htmlFor="ingredients">
                            Sestavine * (ločene z vejico)
                        </label>
                        <textarea
                            id="ingredients"
                            value={ingredients}
                            onChange={event => setIngredients(event.target.value)}
                            placeholder="Testenine, paradižnik, olivno olje ..."
                            rows="3"
                            required
                        />
                    </div>

                    <div className="form-actions full-width">
                        <button className="primary-button" type="submit">
                            {editingId !== null ? 'Shrani spremembe' : '+ Dodaj recept'}
                        </button>

                        {editingId !== null && (
                            <button
                                className="secondary-button"
                                type="button"
                                onClick={resetForm}
                            >
                                Prekliči
                            </button>
                        )}
                    </div>
                </form>
            </section>

            <section className="recipes-section">
                <div className="section-heading">
                    <div>
                        <p className="eyebrow">TVOJA ZBIRKA</p>
                        <h2>Moji recepti <span className="count">{recipes.length}</span></h2>
                    </div>
                    <span className="heading-icon">♡</span>
                </div>


                <div className="recipe-controls">
                    <div className="control-group search-control">
                        <label htmlFor="search">Išči recepte</label>
                        <input
                            id="search"
                            type="text"
                            value={searchTerm}
                            onChange={event => setSearchTerm(event.target.value)}
                            placeholder="Vnesi ime recepta ..."
                        />
                    </div>

                    <div className="control-group">
                        <label htmlFor="sortBy">Razvrsti po</label>
                        <select
                            id="sortBy"
                            value={sortBy}
                            onChange={event => setSortBy(event.target.value)}
                        >
                            <option value="id">Privzeto</option>
                            <option value="ime">Ime recepta</option>
                            <option value="casPriprave">Čas priprave</option>
                        </select>
                    </div>

                    <div className="control-group">
                        <label htmlFor="sortDirection">Vrstni red</label>
                        <select
                            id="sortDirection"
                            value={sortDirection}
                            onChange={event => setSortDirection(event.target.value)}
                        >
                            <option value="asc">Naraščajoče</option>
                            <option value="desc">Padajoče</option>
                        </select>
                    </div>
                </div>


                {recipes.length === 0 ? (
                    <div className="empty-state">
                        <h3>Za zdaj še ni receptov</h3>
                        <p>Dodaj svoj prvi recept in začni ustvarjati svojo zbirko.</p>
                    </div>
                ) : (
                    <div className="recipe-grid">
                        {recipes.map(recipe => (
                            <article className="recipe-card" key={recipe.id}>
                                <div className="card-top">
                                    <span className="food-icon">🍽️</span>
                                    <span className="time">◷ {recipe.prepTime} min</span>
                                </div>
                                <h3>{recipe.name}</h3>
                                {recipe.description && <p>{recipe.description}</p>}
                                <h4>Sestavine</h4>
                                <ul>
                                    {recipe.ingredients.map((ingredient, index) => (
                                        <li key={index}>{ingredient}</li>
                                    ))}
                                </ul>
                                <div className="card-actions">
                                    <button className="secondary-button" onClick={() => editRecipe(recipe)}>
                                        Uredi
                                    </button>
                                    <button className="delete-button" onClick={() => deleteRecipe(recipe.id)}>
                                        Izbriši
                                    </button>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </section>

            <footer>Pripravljeno z ljubeznijo do dobre hrane ♡</footer>
        </main>
    )
}

export default App

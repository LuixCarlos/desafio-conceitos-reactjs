import React, {useState, useEffect} from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(()=>{
    async function loadRepositories(){
      const response = await api.get('repositories')
      setRepositories(response.data);
    };
    loadRepositories()
  },[]);


  async function handleAddRepository() {
    const repository = await api.post('repositories', {
      url:"https://github.com/Rocketseat/umbriel",
      title: `New Repo ${Date.now()}`,
      techs: ["Node", "Express", "TypeScript"]
    });
    setRepositories([...repositories, repository.data])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)
    setRepositories(repositories.filter(repo=> repo.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        { repositories.map(repository=> {
          return (
            <li key={repository.id}>
              {repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          )
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;

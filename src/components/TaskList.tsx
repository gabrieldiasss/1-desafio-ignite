import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare,  } from 'react-icons/fi'

import { AiOutlineInfoCircle } from 'react-icons/ai'

interface Task {
	id: number;
	title: string;
	isComplete: boolean;
}

export function TaskList() {

	const [tasks, setTasks] = useState<Task[]>([]);
	const [newTaskTitle, setNewTaskTitle] = useState('');

	const [validationInput, setValidationInput] = useState(false)

	function handleCreateNewTask() {

		// Crie uma nova task com um id random, não permita criar caso o título seja vazio.

		if(newTaskTitle === "") {
			
			setValidationInput(true)
	
		} else {
			const idRandom = (num: number) => Math.floor(Math.random() * num)

			const newTask: Task = {id: idRandom(102343), title: newTaskTitle, isComplete: false}

			setTasks([...tasks, newTask])

			setNewTaskTitle("")

      setValidationInput(false)

		}

	}

	function handleToggleTaskCompletion(id: number) {
	// Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID

		const taskComplete = tasks.map(task => {

			if(task.id === id ) {
				return { ...task, isComplete: !task.isComplete }
			}

			return task

		})

		setTasks(taskComplete)

	}

	function handleRemoveTask(id: number) {
		// Remova uma task da listagem pelo ID

		setTasks(tasks.filter(task => task.id !== id))
	}

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <div>
            <input 
              type="text" 
              placeholder="Adicionar novo todo" 
              onChange={(e) => setNewTaskTitle(e.target.value)}
              value={newTaskTitle}
            />

            <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask} >
              <FiCheckSquare size={16} color="#fff"/>
            </button>
          </div>
          
          {validationInput && <h3 className="error-message" ><AiOutlineInfoCircle size={20} /> Erro! Digite alguma task </h3>}
          
        </div>

      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />

                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
            	<FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>

	  
    </section>
  )
}
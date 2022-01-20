import React, {useState, useEffect} from 'react'
import Ring from "./Ring";






const TaskForm = (props) => {


	const getValueInput = (e) => {									// Obtiene el valor del <input> y lo envia al state inputData del App 
		props.setInputData(e.target.value)
	}




	// Agreegar estilo de modo oscuro al/los siguientes elementos
	const [classInputDark, setClassInputDark] = useState('')
	useEffect(() => {
		setClassInputDark(props.AddDarkThemeClass('input-dark'))
	}, [props.darkTheme])


	return(
			<form className="form" onSubmit={props.createTask}>
				<input id="input" className={`input ${classInputDark}`} type="text" placeholder="Create a new todo... " onChange={getValueInput}/>
				<div className="ring-input-position">						{/* este <div> existe solamente para poder utilizar este className. Lo ideal seria ponerlo dentro del Componente <Ring/> pero no me deja. Si lo pusiera en el archivo Ring.js me afectaria la posicion de todos los anillos, incluidos los de las tareas */}
					<Ring darkTheme={props.darkTheme}/>	
				</div>
			</form>
	)
	
}


export default TaskForm;
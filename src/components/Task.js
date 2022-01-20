import React, {useState, useEffect} from "react";


import Ring from "./Ring";


const Task = (props) => {	



	// Dependiendo si la tarea fue completada o no, agrega una clase CSS a este state el cual sera usado en el elemento <p> para darle a las letras un efecto de tachado si la tarea fue realizada
	const [classDone, setclassDone] = useState('')
	useEffect(() => {
		if (props.hecho === true) {
			setclassDone('task-text-complete')
		} else {
			setclassDone('')
		}
	}, [props.hecho])
	
	
	
	
	// Agreegar estilo de modo oscuro al/los siguientes elementos
	const [classTaskDark, setClassTaskDark] = useState('')
	const [classTaskTextDark, setClassTaskTextDark] = useState('')
	useEffect(() => {
		setClassTaskDark(props.AddDarkThemeClass('task-dark'))
		setClassTaskTextDark(props.AddDarkThemeClass('task-text-dark'))
	}, [props.darkTheme])



	return (
		<div className={`task ${classTaskDark}`} id={props.id}>
			<div className='ring-task-position' onClick={props.changeDone}>
				<Ring hecho={props.hecho} darkTheme={props.darkTheme} AddDarkThemeClass={props.AddDarkThemeClass}/>
			</div>
			<p className={`task-text ${classTaskTextDark} ${classDone}`}>{props.description}</p>
			<img className="icon-delete" src="./assets/icons/icon-cross.svg" alt="Delete icon" onClick={props.deleteTask}></img>
		</div>
	)	
}


export default Task;

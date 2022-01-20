import React from "react";
import Task from "./Task";


const Tasks = (props) => {

	return(
		<>
			{props.renderItems.map(e => <Task deleteTask={props.deleteTask} changeDone={props.changeDone} key={e.id} description={e.description} id={e.id} hecho={e.hecho} darkTheme={props.darkTheme} AddDarkThemeClass={props.AddDarkThemeClass}/>)}
		</>
	)
} 


export default Tasks;

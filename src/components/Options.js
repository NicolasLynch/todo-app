import React, { useState, useEffect} from "react";

import Itemsleft from "./ItemsLeft";


function Options(props) {


	// Cambiar el valor del state "option" segun en que boton de opcion hicimos click
	const changeOption = (e) => {													
		props.setOption(e.target.id)		
	}
	


	
	// Cambiar el estilo de las opciones cuando hagamos click en ellas
	const [selectClassAll, setSelectClassAll] = useState('')						// Estos tres states los usaremos como clases para sus respectivos botones. La idea idea es que estos estates guarden dos posibles valores, uno es "blue", clase declarada en el archivo App.css el cual cambia de color azul al boton seleccionado; y el otro valor es "", literalmnte no es ningun valor y por ende no hace cambios 
	const [selectClassActive, setSelectClassActive] = useState('')
	const [selectClassComplete, setSelectClassComplete] = useState('')

	useEffect(() => {																// Este useState se ejecuta cuando el state "option" se ve modificado										
		if (props.option === 'all') {												// Cuando state "option" tenga cmo valor "all", que solamente el state "selectClassAll" tenga como valor "blue" (nombre de a clase del archvo App.css) y que el resto no tenga nada
			setSelectClassAll('blue')
			setSelectClassActive('')
			setSelectClassComplete('')

		}else if (props.option === 'active') {
			setSelectClassAll('')
			setSelectClassActive('blue')
			setSelectClassComplete('')

		} else if (props.option === 'complete') {
			setSelectClassAll('')
			setSelectClassActive('')
			setSelectClassComplete('blue')

		}
	}, [props.option])

	




	// Agreegar estilo de modo oscuro al/los siguientes elementos
	const [classInfoTaskDark, setclassInfoTaskDark] = useState('')
	const [classAllDark, setClassAllDark] = useState('')
	const [classActiveDark, setClassActiveDark] = useState('')
	const [classcomppleteDark, setClasscomppleteDark] = useState('')
	const [classClearDark, setClassClearDark] = useState('')
	const [classOptionDark, setClassOptionDark] = useState('')

	useEffect(() => {
		setclassInfoTaskDark(props.AddDarkThemeClass('info-tasks-dark'))
		setClassAllDark(props.AddDarkThemeClass('all-dark'))
		setClassActiveDark(props.AddDarkThemeClass('active-dark'))
		setClasscomppleteDark(props.AddDarkThemeClass('complete-dark'))
		setClassClearDark(props.AddDarkThemeClass('clear-dark'))
		setClassOptionDark(props.AddDarkThemeClass('options-dark'))
	}, [props.darkTheme])



	return(
		<div className={`info-tasks ${classInfoTaskDark}`}>
			<Itemsleft items={props.items} darkTheme={props.darkTheme} AddDarkThemeClass={props.AddDarkThemeClass}/>
			<div className={`options ${classOptionDark}`} onClick={changeOption}>
				<p className={`all ${classAllDark} ${selectClassAll}`}  id='all' onClick={props.showAllTask}>All</p>											{/* Este class que viene del state "selectClassAll" puede representar o no a la clase ya declarada en el App.css "blue". Esto depende de que si se hizo click en este boton o en otro */}
				<p className={`active ${classActiveDark} ${selectClassActive}`}  id='active' onClick={props.showIncompleteTasks}>Active</p>
				<p className={`complete ${classcomppleteDark} ${selectClassComplete}`}  id='complete' onClick={props.showCompleteTask}>Complete</p>
			</div>
			<p className={`clear ${classClearDark}`} onClick={props.deleteAllDoneTasks}>Clear Complete</p>
		</div>
	)
} 

export default Options;
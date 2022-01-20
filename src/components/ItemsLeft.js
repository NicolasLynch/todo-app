// import './App.css';

import React, {useState, useEffect} from 'react';



function Itemsleft(props) {
	
	const [unComplete, setUnComplete] = useState("")

	useEffect(() => {															// Este useEffect me devuelve la cantidad cantidad de tareas sin completar
		let newList = props.items.filter(e => e.hecho === false)

		setUnComplete((newList).length)

	}, [props.items])
	


	// Agreegar estilo de modo oscuro al/los siguientes elementos
	const [classItemsLedftDark, setClassItemsLedftDark] = useState('')
	const [classContainerItemsleftLeftDark, setClassContainerItemsleftLeftDark] = useState('')
	useEffect(() => {
		setClassItemsLedftDark(props.AddDarkThemeClass('items-left-dark'))
		setClassContainerItemsleftLeftDark(props.AddDarkThemeClass('container-itemsleft-left-dark'))
		
	}, [props.darkTheme])



	return(
	<div className={`container-itemsleft-left ${classContainerItemsleftLeftDark}`}>								{/* Sin esto, cada vez que se sume un decimal al numero total, se me moveran un digito a la derecha los botones de opciones. Con esta estiqueta extra soluciono este problema */}
			<p className={`items-left ${classItemsLedftDark}`}>{unComplete} items left</p>
		</div>
	)
}

export default Itemsleft;
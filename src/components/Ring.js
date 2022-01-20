import React, { useState, useEffect } from "react";

function Ring(props) {


	// Hacer aparecer el icono de check (Agregar o quitar una clase)
	const [showClass, setShowClass] = useState('')						// En este state voy a guardar uno de 2 posibles valores distintos segun convenga: Uno de los valores es la palabra "ring-center-view", este es el nombre de una clase del archivo App.css, el cual hace que desaparezca el "ring-center", de esta manera queda al descubierto el icono de check que esta por debajo. Este valor es agregado unicamente cuando la la tarea esta completa (osea, cuando la key "hecho" del objeto que representa la tarea vale "true"); El segundo valor es "", esto hace desaparecer al valor anterior (en caso de que este) y por ende la clase que mensionamos antes es quitada haciendo aparecer el "ring-center" y por ende tapando al icono de check. Este valor es agregado unicamente cuando la la tarea esta incompleta (osea, cuando la key "hecho" del objeto que representa la tarea vale "false") 									
																		// Este state showClass lo vamos a utilizar a modo de class de CSS. Pudiendo agregar dos posibles class: La primera es 'ring-center-view' la cual esta declarada en el archivo App.css; y la segunda claas es "" que es literalmente nada  
	useEffect(() => {													// Este useEffect se activa unicamente cuando el valor de props.hecho cambia. Esto esjecuta lo que ya se menciono arriba al principio 
		if (props.hecho === true){
			setShowClass('ring-center-view')

		} else{
			setShowClass('')
		}
	}, [props.hecho])




	// Agreegar estilo de modo oscuro al/los siguientes elementos								// Tengo una funcion que hace este trabajo, pero por algun motivo no funciona en este archivo. Por ende la volvi a crear aquí con
	const [classRingCenterDark, setClassRingCenterDark] = useState('')
	useEffect(() => {
		if (props.darkTheme === true) {
			setClassRingCenterDark('ring-center-dark') 

		} else {
			setClassRingCenterDark('')
		}
	}, [props.darkTheme])
	




	return(
			<div className="ring" id='ring'>
				<img src="./assets/icons/icon-check.svg" alt="Check icon" className="icon-check" id='icon-check'></img>
				<div className={`ring-center ${classRingCenterDark} ${showClass}`} id='ring-center'></div>						{/* "ring-center" es una clase y "showClass". Esta ultima al ser un state/variable puede almacenar dos distintos valores que funcionan como la verdadera clase: La primera es 'ring-center-view' la cual esta declarada en el archivo App.css; y la segunda claas es "" que es literalmente nada   */}
			</div>
	)
}


export default Ring;

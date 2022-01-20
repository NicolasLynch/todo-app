import React, {useState, useEffect} from 'react';


function ToggleDark(props) {


	// Cambiar el icono segun si esta en modo oscuro o claro
	const [icon, setIcon] = useState('')
	
	useEffect(() => {
		if (props.darkTheme === false) {
			setIcon("./assets/icons/icon-moon.svg")

		} else {
			setIcon("./assets/icons/icon-sun.svg")
		}
	}, [props.darkTheme])


	
	return(
			<img className="theme-icon" src={icon} alt="" onClick={props.changeTheme}></img>
	)
}


export default ToggleDark;
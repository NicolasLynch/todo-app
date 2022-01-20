import React, {useState, useEffect} from 'react';

import ToggleDark from './ToggleDark';


function Header (props){

	// Cambiar el la imagen de fondo segun si esta en modo oscuro o claro
	const [imageDesktop, setImageDesktop] = useState('')
	const [imageMovil, setImageMovil] = useState('')

	useEffect(() => {
		if (props.darkTheme === false) {
			setImageDesktop('./assets/images/bg-desktop-light.jpg')
			setImageMovil('./assets/images/bg-mobile-light.jpg')
			
		} else {
			setImageDesktop("./assets/images/bg-desktop-dark.jpg")
			setImageMovil('./assets/images/bg-mobile-dark.jpg')
		}
	}, [props.darkTheme])


	return(
		<div className="header">
			<img srcSet={`${imageDesktop}, ${imageMovil} 3x`} alt="Background decoration"  id="background-image" className="background-image"></img>
			<h1 className='title'>T O D O</h1>
			<ToggleDark changeTheme={props.changeTheme} darkTheme={props.darkTheme}/>
		</div>
	)
}

export default Header
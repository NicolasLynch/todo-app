// Ponerle las clases de modo oscuro al aro central y al y al text-complete-dark





// RECORDAR que la información que almacena el localStorage es un array que contiene las tareas en forma de objetos.  Ej: [{},{},{}]




import React, { useState, useEffect } from 'react'

import './App.css';

import Header from './components/header';
import TaskForm from './components/TaskForm';
import Options from './components/Options';
import Tasks from './components/Tasks';




const App = () => {


	// Obtener la lista de tareas del localStorage
	const getLocalItems = () => {															// Esta funcion se usara más adelante para pasarle la informacion al state items apenas se habra la página. Apenas se habre la página web, si hay información en localStorage, más precisamente en la key "lists", se guarda esa información en este mismo state "items". De no haber nada porque se borro todo o porque es la primera vez que el usuario entra, se coloca un [] como información (un array vacio). // RECORDAR que la información que almacena el localStorage es un array que contiene las tareas en forma de objetos.  Ej: [{},{},{}]  
		let list = localStorage.getItem('lists');

		if (list) {
			return JSON.parse(localStorage.getItem('lists'))

		}else { 
			return [];
		}
	}


	// Obtener el tema de color del localStorage
	const getLocalTheme = () => {
		let theme = localStorage.getItem('darkTheme');

		if (theme) {
			return JSON.parse(localStorage.getItem('darkTheme'))

		}else { 
			return false;
		}
	}




	const [items, setItems] = useState(getLocalItems())										// Apenas se habre la página web, si hay información en localStorage, más precisamente en la key "lists", se guarda esa información en este mismo state "items". De no haber nada porque se borro todo o porque es la primera vez que el usuario entra, se coloca un [] como información (un array vacio). // RECORDAR que la información que almacena el localStorage es un array que contiene las tareas en forma de objetos.  Ej: [{},{},{}]     // Este state es una representacion del localSorage, y toda la información que ingrese aqui sera enviada al localStorage. Pero es nesesario hacer lo contrario y enviarle la informacion del localStorage a este state cuando apenas abrimos la pagina porque de esta manera podemos obtenemos una representacion de la información localStorage para trabajar con ella y luego reemplazar la información original del localStorage 
	const [renderItems, setRenderItems] = useState(items)									// Usaremes este state para renderizar. Esto se debe a que el state "items" si sufre algun cambio tambien va a afectar al localStorage, pero con el renderItems podemos hacer los cambios que deciemos. Esto es util para renderizar unicamente las tareas que fueron completadas o las incompletas
	const [inputData, setInputData] = useState('')											// State que va a almacenar toda la informacion escrita en el <input>
	const [option, setOption] = useState('all')												// Segun su valor nos indica el opcion que selecionamos. Puede ser "all", "active" o "complete". Por defecto viene con la primera opcion "all". Por ende es la que se renderizara apenas se habra el navegador 

	const [darkTheme, setDarkTheme] = useState(getLocalTheme())								// Este state representa a una key del localStorage llamada con mismo el mismo nombre, la usaremos para asignar el tema a la paguina web (tema oscuro = true, tema brillante = false).  // ¿Por que lo guardamos en el state? Simplemente para que cuando el usuario entre a la página tenga ya tenga su tema preferido activado 




	// Agregar tareas al localStorage
	useEffect(() => {																		// Con este Hook ejecutamos la linea de codigo de abajo cada vez que el valor del state "items" se haya modificado. Tambien ejecutamos estalinea cuandoapenas abrimos la pagina. Sin toda esta funcion/UseEfect, no se crearia el espacio en el localStorage, osea las funcion de arriba "getLocalItems" depende de este state para funcionar y para crear su respectiva key en el localStorage por primera vez cuando se habre la página    									
		localStorage.setItem('lists', JSON.stringify(items))								// Le ingresamos al localStorage la información del state "items". Esto se se hace de forma automatica cuando abrimos la pagina o cuando hacemos algun tipo de modificación
	}, [items])																				// Este [items] me dice que cada vez que se modifique este state, que se ejecute la linea de codigo de arriba


	// Cambiar los el tema de color del localStorage
	useEffect(() => {
		localStorage.setItem('darkTheme', JSON.stringify(darkTheme))
	}, [darkTheme])

	


	
	// Generador de id para cada tareas
	const IdGenerator = () =>{																// Genera un id para la tarea. Basicamente busca el id más gande de entre todas las tareas ya existentes y a la nueva tarea de la un id nun un numero máa grande. Osea, si a tarea con el id más grande tenia un valor de 15, la nueva tarea va a tener un id de 16
		if(!items[0]){																		// Si no existe al menos una tarea y por ende un id, que se genere para la nueva tarea (que va a ser la primera) un id = 0    // El [0] representa la primera tarea, que puede o no existir dependiendo el caso
			return 0
			
		} else{																				// Caso contrario, que haga lo que dice la descripcion de la función
			const list = items.map(e => e.id)
			return Math.max(...list) + 1 
		}
	}

	

	// Crear la nueva tarea mediante la información obtenida del <input>
	const createTask = (e) =>{																// Función obtiene el valor del <input>, lo transforma en un objeto y lo envia al state "items". Más adelante por medio de otra función, la información del state "items" sera enviada al "localStorage" para luego ser renderizada en la página web  
		e.preventDefault()

		setItems([ 	
				{
					id: IdGenerator(),								
					description: inputData,
					hecho: false
				}, ...items])																// Necesitamos que el state "items" tenga el nuevo objeto junto con la informacion anterior que ya estaba en items, por eso lo pongo ahí.   // Al poner el nuevo objeto y luego los anteriores (items), logro que la nueva tarea este antes en la fila y no al final. Se puede lograr el efecto contrario haciendolo al revez   
		
		e.target.reset()
	}



	
	// Borrar una tarea en especifico
	const deleteTask = (e) => {
		const idTask = (e.target.parentElement.id);											// Reconoce el id de la tarea a la cual le estoy haciendo click desde el navegador. Esta tarea es la que elegi para borrar  

		const newList = items.filter(e => e.id !== parseInt(idTask))						// Creo una nueva lista donde van a estar toda las tareas excepto la que elegi para borrar   // El parseInt() convierte el numero que esta en modo "string" a un numero de verdad. Con esto logro evitar que me salga un error en la consola por poner != en vez de !==   

		setItems([...newList])																// Al state "items" le estoy reemplazando los valores que ya tenia por estos nuevos
	}



	// Cambiar el estatus de tarea "incompletada" a "completada" o viceversa
	const changeDone = (e) => {															
		let idTask = ""																		// Variable para almacenar el id HTML de la tarea a la cual estoy haciendo click desde el navegador

		if (e.target.id === 'ring'){														// Con esto identifico la tarea a la cual le estoy haciendo click en el navegador para luego obtener su id HTML y luego guardarlo en la variable idTask. Dependiendo si hago click en el anillo principal, en el anillo del centro o en el icono de check, la ruta para llegar al id HTML de la tarea va a ser distinto. Por eso pongo este if, de esta forma no importa en cual de los 3 haga click  
			idTask = e.target.parentElement.parentElement.id

		}else if (e.target.id === 'ring-center' || e.target.id === 'icon-check'){
			idTask = e.target.parentElement.parentElement.parentElement.id;
		}

		let newList = items 																// Crea una nueva lista en base a la información que posee el state "items". De esta forma podemos trabajar con esta información sin alterar el state "Items"

		for (let item of newList){															// Con este bucle buscamos una tarea en la lista que cuyo id coincida con la tarea del navegador al cual hicimos click. Luego cambiaremos el estatus de tarea "incompletada" a "completada" o viceversa 
			if (item.id === parseInt(idTask)){
				item.hecho = !item.hecho													// Esto es lo que cambia su estatus de tarea "incompletada" a "completada" o viceversa. Básicamente el valor que tenemos lo cambiamos el contrario gracias al "!".   // Esto funciona con los valores "true" y "false". Desconozco si se pude hacer lo mismo con los strings, numbers, arrays, etc
			} 
		}

		setItems([...newList])																// Ahora si, al state "items" le reemplazamos los valores anteriores por estos nuevos
	}




	// Borrar todas las tareas completadas
	const deleteAllDoneTasks = () => {														// Esta funcion filta a todas las tareas no hechas y las guarda en la variable "newlist". Ahora esta variable almacena unicamente las tareas pendientes a realizar. Por ultimo reemplazamos los valores antiguos del state "items" por estos nuevos valores que solamente tiene a las tareas imcompletas, descartando así a las tareas completadas de la lista  
		const newList = items.filter(e => e.hecho === false)					

		setItems([...newList])															
	} 




	// Mostar las tareas incompletas														  
	const showIncompleteTasks = () => {														// Simplemente filtro las tareas incompletas del state "items" y las paso al state "renderItems" para que de esta manera solamente las tareas incompletas sean renderizadas 
		setRenderItems(items.filter(e => e.hecho === false))
	}



	// Mostar las tareas completadas 
	const showCompleteTask = () => {														// Simplemente filtro las tareas completadas del state "items" y las paso al state "renderItems" para que de esta manera solamente las tareas completadas sean renderizadas
		setRenderItems(items.filter(e => e.hecho === true))
	}



	// Mostrar todas las tareas 
	const showAllTask = () => {																// Simplemte paso todas las tereas se state "items" al state "renderItems". Esto ya se hace de forma automatica como se muestra más arriba, pero con esta funcion puedeo renderizar todas las tareas cuando haga click en  el boton "All" de la página web
		setRenderItems(items)
	}



	// Renderizar unicamente en la opcion selecionada 										// Esto es importante porque sin esto cada vez que agregemos valores nuevos, se renderizaran todos los valores como si estuvieran en "all" aunque el la opcion en azul sea otra.  // Esto se debe a que cada vez que se hace un cambio en el state "items", este le pasa todas sus tareas al state "renderItems" para ser renderizadas. En algunas opciones yo deseo que solamente se rendericen ciertas tareas y no todas, con esto hago ese filtro y puedo modificar las tareas y renderizarlas sin importar donde este 
	useEffect(() => {
		if (option === 'all') {
			showAllTask()

		} else if (option === 'active') {
			showIncompleteTasks()

		} else if (option === 'complete') {
			showCompleteTask()
		}			
	}, [items])			// Esta señal se soluciona agregando dentro de este oparentesis las cosas que me pide  

	


	// Cambiar el tema de color																							
	const changeTheme = () => {																// Si el valor del state "darkTheme" es igual a "true" o a "false", que me lo cambie por el contrario 
		if (darkTheme === true || darkTheme === false){
			setDarkTheme(!darkTheme)
		}
	}

	// Agregar el tema ocuro a las clases 													// Esta funcion la usaremos en los states de los elementos que usaremos como clase. La clase sera ingresada aquí y esta funcion determinara si el modo ocuro esta activado para devolver la  misma clase, caso contrario devolvera un "", osea ninguna clase 
	const AddDarkThemeClass = (darkClassCSS) => {
		if (darkTheme === true) {
			document.body.style.backgroundColor = 'hsl(235, 21%, 11%)'						// Como el <body> esta por fuera de esta aplicacion React, la unica forma que encontre de cambiar sus estilos CSS fue esta 
			return darkClassCSS
			
		} else {
			document.body.style.backgroundColor = 'hsl(233, 11%, 84%)'
			return ""
		}
	}
	
	

	return (
		<div>
			
			<div className="app">
				<Header darkTheme={darkTheme} changeTheme={changeTheme} AddDarkThemeClass={AddDarkThemeClass}/>
				<main>
					<TaskForm setInputData={setInputData} createTask={createTask} darkTheme={darkTheme} AddDarkThemeClass={AddDarkThemeClass}/>
					<div className="content">
						<Options items={items} option={option} setOption={setOption} deleteAllDoneTasks={deleteAllDoneTasks} showIncompleteTasks={showIncompleteTasks} showCompleteTask={showCompleteTask} showAllTask={showAllTask}  darkTheme={darkTheme} AddDarkThemeClass={AddDarkThemeClass}/>
						<Tasks className="tasks" renderItems={renderItems} deleteTask={deleteTask} changeDone={changeDone} darkTheme={darkTheme} AddDarkThemeClass={AddDarkThemeClass}/>
					</div>
				</main>
			</div>
		</div>
	);
}

export default App;








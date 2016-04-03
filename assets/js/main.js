/**
 * TODO: cambiar ancho en función del input:range
 * TODO: crear y bindear las propiedaded flex de cada elemento hijo
 * TODO: permitir añadir/eliminar objetos flex y reiniciar
 * TODO: permitir cambiar las opciones flex del padre.
 */
window.onload = (function() {
	'use strict';

	var addButton = document.getElementById('add-box');
	var deleteButton = document.getElementById('delete-box');
	var content = document.getElementById('box-content');
	var flexContainer = document.getElementById('flexbox-container');
	var flexItems = document.getElementsByClassName('flex-item');
	var optionsToggler = document.getElementsByClassName('flex-item-toggle');
	var textArea = document.getElementById('box-content');
	var cloneItem = flexItems[0].cloneNode(true);

	// inicio contenedor flexbox
	/**
	 * Bindear los botones de añadir/eliminar elemento
	 * NOTE: quizás el borrar un elemento debería ir dentro del propio flex-item
	 *
	 * Para añadir un elemento hay que tomar el contenido HTML del textarea y
	 * crear un HTML idéntico al de los flex-items e introducir dicho contenido
	 * como cuerpo del elemento.
	 *
	 * Una vez añadido quizás haya que volver a 're-bindear' las opciones
	 */
	flexContainer.addItem = function (event = null, parent = null) {
		event.preventDefault();
		var parent = parent;
		var node = cloneItem.cloneNode(true);
		var content = textArea.value;
		
		if (null === content) {
			content = 'Hello World';
		}

		node.childNodes[5].innerHTML = content;

		if (null === parent) {
			parent = this;
		}

		this.appendChild(node);

		bindToggles(); // Re-llamada
		return true;
	};

	flexContainer.removeItem = function (event = null, child = null) {
		var lastChild = child;
		if (null === child) {
			lastChild = this.lastElementChild;
		}
		this.removeChild(lastChild);
		event.preventDefault();
	};

	// Bindear eventos para añadir/borrar nuevos elementos flex al contenedor
	addButton.addEventListener('click', function(e) { flexContainer.addItem(e, null) });
	deleteButton.addEventListener('click', function(e) { flexContainer.removeItem(e, null); });
	// ----------- fin contendor flexbox
	
	// inicio elementos flexbox
	/**
	 * Bindear todos los interruptores de opciones individuales 
	 * de cada flexbox item. Así se podrán modificar individualmente
	 * las opciones de cada item
	 */
	function bindToggles() {
		for (var i = 0; i < optionsToggler.length; i++) {
			optionsToggler[i].addEventListener('click', function(event) {
				// Obtener el hermano más cercano, que en este caso es el menú de opciones.
				var sibling = this.nextElementSibling;
				sibling.classList.toggle('hide');
			}, false);
		}
	};
	bindToggles(); // Llamada al inicio
})();
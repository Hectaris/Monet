(function () {
	var invertbutton = null;

	function myInvert() {
		var photo = document.getElementById('photo');
		var canvas = document.getElementById('mycanvas');
		var context = canvas.getContext('2d');

		// Get the CanvasPixelArray from the given coordinates and dimensions.
		x = 0;
		y = 0;
		val = 0;
		width = canvas.width;
		height = canvas.height;

		var imgd = context.getImageData(x, y, width, height);
		var pix = imgd.data;


		console.log("height=" + height + ", width=" + width);
		/*
		// EXEMPLE DE TRAITEMENT EN 1D
		// Loop over each pixel and invert the color.
		for (var i = 0; i < pix.length; i += 4) {
			pix[i  ] = 255 - pix[i  ]; // red
			pix[i+1] = 255 - pix[i+1  ]; // green
			pix[i+2] = 255 - pix[i+2  ]; // blue

			pix[i  ] = 255 ; // red
			pix[i+1] = 255 ; // green
			pix[i+2] = 0 ; // blue
			// i+3 is alpha (the fourth element)
		}
		*/

		// PASSAGE EN 1D POUR SIMPLIFIER LA GESTION DU VOISINAGE
		// 1 tab 1D -> 4 tab 2D (r,g,b,a) 
		// déclaration de 4 tableaux à 2 dim (de taille width * height)
		var tr = new Array(width).fill().map(() => Array(height));
		var tg = new Array(width).fill().map(() => Array(height));
		var tb = new Array(width).fill().map(() => Array(height));
		var ta = new Array(width).fill().map(() => Array(height));

		// copie des valeurs
		for (var y = 0; y < height; y++) {
			for (var x = 0; x < width; x++) {
				tr[x][y] = pix[x * 4 + y * (width * 4) + 0];
				tg[x][y] = pix[x * 4 + y * (width * 4) + 1];
				tb[x][y] = pix[x * 4 + y * (width * 4) + 2];
				ta[x][y] = pix[x * 4 + y * (width * 4) + 3];
			}
		}
		var val = document.getElementById("jauge").value
		// TRAITEMENT / APPLICATION D'UN FILTRE
		if (document.getElementById('3x3').checked) {
			for (var i = 0; i < val; i++)
				for (var y = 1; y < height - 1; y++) {
					for (var x = 1; x < width - 1; x++) {
						tr[x][y] = (((tr[x - 1][y - 1]) * 6) + ((tr[x][y - 1]) * 8) + ((tr[x + 1][y - 1]) * 6)
							+ ((tr[x - 1][y]) * 8) + ((tr[x][y]) * 10) + ((tr[x + 1][y]) * 8)
							+ ((tr[x - 1][y + 1]) * 6) + ((tr[x][y + 1]) * 8) + ((tr[x + 1][y + 1]) * 6)) / 66;
						tg[x][y] = (((tg[x - 1][y - 1]) * 6) + ((tg[x][y - 1]) * 8) + ((tg[x + 1][y - 1]) * 6)
							+ ((tg[x - 1][y]) * 8) + ((tg[x][y]) * 10) + ((tg[x + 1][y]) * 8) +
							((tg[x - 1][y + 1]) * 6) + ((tg[x][y + 1]) * 8) + ((tg[x + 1][y + 1]) * 6)) / 66;
						tb[x][y] = (((tb[x - 1][y - 1]) * 6) + ((tb[x][y - 1]) * 8) + ((tb[x + 1][y - 1]) * 6)
							+ ((tb[x - 1][y]) * 8) + ((tb[x][y]) * 10) + ((tb[x + 1][y]) * 8)
							+ ((tb[x - 1][y + 1]) * 6) + ((tb[x][y + 1]) * 8) + ((tb[x + 1][y + 1]) * 6)) / 66;
					}
				}
		}
		if (document.getElementById('5x5').checked) {
			for (var i = 0; i < val; i++)
				for (var y = 2; y < height - 2; y++) {
					for (var x = 2; x < width - 2; x++) {
						tr[x][y] = (((tr[x - 2][y - 2]) * 1) + ((tr[x - 1][y - 2]) * 2) + ((tr[x][y - 2]) * 3) + ((tr[x + 1][y - 2]) * 2) + ((tr[x + 2][y - 2]) * 1) +
							((tr[x - 2][y - 1]) * 2) + ((tr[x + 2][y - 1]) * 2) + ((tr[x - 2][y]) * 3) + ((tr[x + 2][y]) * 3) + ((tr[x - 2][y + 1]) * 2) + ((tr[x + 2][y + 1]) * 2) +
							((tr[x - 2][y + 2]) * 1) + ((tr[x - 1][y + 2]) * 2) + ((tr[x][y + 2]) * 3) + ((tr[x + 1][y + 2]) * 2) + ((tr[x + 2][y + 2]) * 1) +
							((tr[x - 1][y - 1]) * 6) + ((tr[x][y - 1]) * 8) + ((tr[x + 1][y - 1]) * 6)
							+ ((tr[x - 1][y]) * 8) + ((tr[x][y]) * 10) + ((tr[x + 1][y]) * 8)
							+ ((tr[x - 1][y + 1]) * 6) + ((tr[x][y + 1]) * 8) + ((tr[x + 1][y + 1]) * 6)) / 98;


						tg[x][y] = (((tg[x - 2][y - 2]) * 1) + ((tg[x - 1][y - 2]) * 2) + ((tg[x][y - 2]) * 3) + ((tg[x + 1][y - 2]) * 2) + ((tg[x + 2][y - 2]) * 1) +
							((tg[x - 2][y - 1]) * 2) + ((tg[x + 2][y - 1]) * 2) + ((tg[x - 2][y]) * 3) + ((tg[x + 2][y]) * 3) + ((tg[x - 2][y + 1]) * 2) + ((tg[x + 2][y + 1]) * 2) +
							((tg[x - 2][y + 2]) * 1) + ((tg[x - 1][y + 2]) * 2) + ((tg[x][y + 2]) * 3) + ((tg[x + 1][y + 2]) * 2) + ((tg[x + 2][y + 2]) * 1) +
							((tg[x - 1][y - 1]) * 6) + ((tg[x][y - 1]) * 8) + ((tg[x + 1][y - 1]) * 6)
							+ ((tg[x - 1][y]) * 8) + ((tg[x][y]) * 10) + ((tg[x + 1][y]) * 8)
							+ ((tg[x - 1][y + 1]) * 6) + ((tg[x][y + 1]) * 8) + ((tg[x + 1][y + 1]) * 6)) / 98;


						tb[x][y] = (((tb[x - 2][y - 2]) * 1) + ((tb[x - 1][y - 2]) * 2) + ((tb[x][y - 2]) * 3) + ((tb[x + 1][y - 2]) * 2) + ((tb[x + 2][y - 2]) * 1) +
							((tb[x - 2][y - 1]) * 2) + ((tb[x + 2][y - 1]) * 2) + ((tb[x - 2][y]) * 3) + ((tb[x + 2][y]) * 3) + ((tb[x - 2][y + 1]) * 2) + ((tb[x + 2][y + 1]) * 2) +
							((tb[x - 2][y + 2]) * 1) + ((tb[x - 1][y + 2]) * 2) + ((tb[x][y + 2]) * 3) + ((tb[x + 1][y + 2]) * 2) + ((tb[x + 2][y + 2]) * 1) +
							((tb[x - 1][y - 1]) * 6) + ((tb[x][y - 1]) * 8) + ((tb[x + 1][y - 1]) * 6)
							+ ((tb[x - 1][y]) * 8) + ((tb[x][y]) * 10) + ((tb[x + 1][y]) * 8)
							+ ((tb[x - 1][y + 1]) * 6) + ((tb[x][y + 1]) * 8) + ((tb[x + 1][y + 1]) * 6)) / 98;
					}
				}
		}
		if (document.getElementById('11x11').checked) {
			for (var i = 0; i < val; i++)
				for (var y = 1; y < height - 1; y++) {
					for (var x = 1; x < width - 1; x++) {
						tr[x][y] = (((tr[x - 1][y - 1]) * 6) + ((tr[x][y - 1]) * 8) + ((tr[x + 1][y - 1]) * 6)
							+ ((tr[x - 1][y]) * 8) + ((tr[x][y]) * 10) + ((tr[x + 1][y]) * 8)
							+ ((tr[x - 1][y + 1]) * 6) + ((tr[x][y + 1]) * 8) + ((tr[x + 1][y + 1]) * 6)) / 66;
						tg[x][y] = (((tg[x - 1][y - 1]) * 6) + ((tg[x][y - 1]) * 8) + ((tg[x + 1][y - 1]) * 6)
							+ ((tg[x - 1][y]) * 8) + ((tg[x][y]) * 10) + ((tg[x + 1][y]) * 8) +
							((tg[x - 1][y + 1]) * 6) + ((tg[x][y + 1]) * 8) + ((tg[x + 1][y + 1]) * 6)) / 66;
						tb[x][y] = (((tb[x - 1][y - 1]) * 6) + ((tb[x][y - 1]) * 8) + ((tb[x + 1][y - 1]) * 6)
							+ ((tb[x - 1][y]) * 8) + ((tb[x][y]) * 10) + ((tb[x + 1][y]) * 8)
							+ ((tb[x - 1][y + 1]) * 6) + ((tb[x][y + 1]) * 8) + ((tb[x + 1][y + 1]) * 6)) / 66;
					}
				}
		}
		// RETOUR EN 1D POUR AFFICHER LES MODIFICATIONS
		// 4 tab 2D (r,g,b,a) -> 1 tab 1D POUR METTRE A JOUR L'IMAGE
		for (var y = 0; y < height; y++) {
			for (var x = 0; x < width; x++) {
				pix[x * 4 + y * (width * 4) + 0] = tr[x][y];
				pix[x * 4 + y * (width * 4) + 1] = tg[x][y];
				pix[x * 4 + y * (width * 4) + 2] = tb[x][y];
				pix[x * 4 + y * (width * 4) + 3] = ta[x][y];
			}
		}

		// Draw the ImageData at the given (x,y) coordinates.
		context.putImageData(imgd, 0, 0);

		var data = canvas.toDataURL('image/png');
		photo.setAttribute('src', data);
	}

	function myAddLuminosity() {
		var photo = document.getElementById('photo2');
		var canvas = document.getElementById('mycanvas2');
		var context = canvas.getContext('2d');

		// Get the CanvasPixelArray from the given coordinates and dimensions.
		x = 0;
		y = 0;
		width = canvas.width;
		height = canvas.height;

		var imgd = context.getImageData(x, y, width, height);
		var pix = imgd.data;
		//console.log(pix);

		// Loop over each pixel and invert the color.
		for (var i = 0, n = pix.length; i < n; i += 4) {
			// Ajouter de la luminosité
			pix[i] = pix[i] + 20;
			pix[i + 1] = pix[i + 1] + 20;
			pix[i + 2] = pix[i + 2] + 20;
			// i+3 est alpha (the fourth element)
		}
		// Draw the ImageData at the given (x,y) coordinates.
		context.putImageData(imgd, 0, 0);

		var data = canvas.toDataURL('image/png');
		photo.setAttribute('src', data);
	}

	function myRemoveLuminosity() {
		var photo = document.getElementById('photo2');
		var canvas = document.getElementById('mycanvas2');
		var context = canvas.getContext('2d');

		// Get the CanvasPixelArray from the given coordinates and dimensions.
		x = 0;
		y = 0;
		width = canvas.width;
		height = canvas.height;

		var imgd = context.getImageData(x, y, width, height);
		var pix = imgd.data;

		// Loop over each pixel and invert the color.
		for (var i = 0, n = pix.length; i < n; i += 4) {
			// Diminuer la luminosité
			pix[i] = pix[i] - 20;
			pix[i + 1] = pix[i + 1] - 20;
			pix[i + 2] = pix[i + 2] - 20;
			// i+3 est alpha (the fourth element)
		}
		// Draw the ImageData at the given (x,y) coordinates.
		context.putImageData(imgd, 0, 0);

		var data = canvas.toDataURL('image/png');
		photo.setAttribute('src', data);
	}

	function myBlack() {
		var photo = document.getElementById('photo2');
		var canvas = document.getElementById('mycanvas2');
		var context = canvas.getContext('2d');

		// Get the CanvasPixelArray from the given coordinates and dimensions.
		x = 0;
		y = 0;
		width = canvas.width;
		height = canvas.height;

		var imgd = context.getImageData(x, y, width, height);
		var pix = imgd.data;
		//console.log(pix);

		// Loop over each pixel and invert the color.
		for (var i = 0, n = pix.length; i < n; i += 4) {
			// Mettre en noir :  pix[i] <= 128 ? 0 : 255;
			pix[i] = pix[i] <= 128 ? 0 : 255; // red
			pix[i + 1] = pix[i + 1] <= 128 ? 0 : 255; // green
			pix[i + 2] = pix[i + 2] <= 128 ? 0 : 255; // blue
			// i+3 is alpha (the fourth element)
		}

		// Draw the ImageData at the given (x,y) coordinates.
		context.putImageData(imgd, x, y);

		var data = canvas.toDataURL('image/png');
		photo.setAttribute('src', data);
	}

	function afterload() {
		invertbutton = document.getElementById('idinvertbutton');
		blackbutton = document.getElementById('blackbutton');
		addluminositybutton = document.getElementById('addluminositybutton');
		removeluminositybutton = document.getElementById('removeluminositybutton');

		invertbutton.addEventListener('click', function (ev) {
			myInvert();
		}, false);

		blackbutton.addEventListener('click', function (ev) {
			myBlack();
		}, false);

		addluminositybutton.addEventListener('click', function (ev) {
			myAddLuminosity();
		}, false);

		removeluminositybutton.addEventListener('click', function (ev) {
			myRemoveLuminosity();
		}, false);

	}

	window.addEventListener('load', afterload, false);

})();

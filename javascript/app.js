(function($) {
  'use strict';

	var app = (function() {
		
		return {
			init: function init() {
				this.getCompanyInfo();
				this.companyInfo();
				this.initEvents();
				this.initInfo();
			},

			initInfo: function initInfo() {
				var get = new XMLHttpRequest();

				get.open('GET', 'http://localhost:3000/car');
				get.send();

				get.onreadystatechange = function () {
					if (get.readyState === 4) {
						var res = JSON.parse(get.responseText);
						res.map(function (items) {
							app.updateElements(items);
						})
					}
				}
			},

			updateElements: function updateElements(items) {
				var $fragment = document.createDocumentFragment();
				var $tr = document.createElement('tr');
				var $tdImage = document.createElement('td');
				var $image = document.createElement('img');
				var $tdBrand = document.createElement('td');
				var $tdBoard = document.createElement('td');
				var $tdYear = document.createElement('td');
				var $tdColor = document.createElement('td');

				$tdImage.appendChild($image);

				$tdBrand.textContent = items.brandModel;
				$tdYear.textContent = items.year;
				$tdBoard.textContent = items.plate;
				$tdColor.textContent = items.color;

				$image.setAttribute('src', items.image);

				$tr.appendChild($tdImage).setAttribute('data-js', 'image');
				$tr.appendChild($tdBrand);
				$tr.appendChild($tdYear);
				$tr.appendChild($tdBoard).setAttribute('data-js', 'plate');
				
				$tr.appendChild($tdColor);

				var $tablecar = document.querySelector('[data-js="result"');
				return $tablecar.appendChild($fragment.appendChild($tr));
			},

			initEvents: function initEvents() {
				$('[data-js="form"]').on('submit', this.handleSubmit)
				$('[data-js="remove"]').on('click', this.handleRemove)
			},

			handleSubmit: function (e) {
				e.preventDefault();

				var $tablecar = document.querySelector('[data-js="result"');
				$tablecar.appendChild(app.createNewCar());

				var image = $('[data-js="image"]').get().value;
				var brand = $('[data-js="brand"]').get().value;
				var year = $('[data-js="year"]').get().value;
				var plate = $('[data-js="board"]').get().value;
				var color = $('[data-js="color"]').get().value;

				var post = new XMLHttpRequest();
				post.open('POST', 'http://localhost:3000/car');
				post.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
				post.send(`image=${image}&brandModel=${brand}&year=${year}&plate=${plate}&color=${color}`);

				post.onreadystatechange = function () {
					if (post.readyState === 4) {
						console.log('Cadastrado', post);
					}
				}
			},

			handleRemove: function handleRemove(e) {
				e.preventDefault();

				var plate = document.querySelector('[data-js="plate"]');

				if (document.querySelector('[data-js="result"] tr') !== null) {
					plate.parentNode.remove();

					var ajax = new XMLHttpRequest();
					ajax.open('DELETE', 'http://localhost:3000/car');
					ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
					ajax.send(`plate=${plate.textContent}`);

					ajax.onreadystatechange = function () {
						if (ajax.readyState === 4) {
							console.log('deletar', ajax);
						}
					}
				}

			},

			createNewCar: function createNewCar() {
				var $fragment = document.createDocumentFragment();
				var $tr = document.createElement('tr');
				var $tdImage = document.createElement('td');
				var $image = document.createElement('img');
				var $tdBrand = document.createElement('td');
				var $tdBoard = document.createElement('td');
				var $tdYear = document.createElement('td');
				var $tdColor = document.createElement('td');

				$tdImage.appendChild($image);
				
				$tdBrand.textContent = $('[data-js="brand"]').get().value;
				$tdYear.textContent = $('[data-js="year"]').get().value;
				$tdBoard.textContent = $('[data-js="board"]').get().value;
				$tdColor.textContent = $('[data-js="color"]').get().value;
				
				$image.setAttribute('src', $('[data-js="image"]').get().value);

				$tr.appendChild($tdImage);
				$tr.appendChild($tdBrand);
				$tr.appendChild($tdYear);
				$tr.appendChild($tdBoard);
				$tr.appendChild($tdColor);

				return $fragment.appendChild($tr);
			},

			companyInfo: function companyInfo() {
				var ajax = new XMLHttpRequest();
				var url = 'company.json';

				ajax.open('GET', url)
				ajax.send();
				ajax.addEventListener('readystatechange', this.getCompanyInfo);
			},

			getCompanyInfo: function getCompanyInfo() {
				if (!app.isReady.call(this))
				return;

				var data = JSON.parse(this.responseText);
				var $company = $('[data-js="company"]').get();
				var $phone = $('[data-js="phone"]').get();

				$company.textContent = data.name;
				$phone.textContent = data.phone;

			},

			isReady: function isReady() {
				return this.readyState === 4 && this.status === 200;
			}
		}
	})();

	app.init();

})(window.DOM);

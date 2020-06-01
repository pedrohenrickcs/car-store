(function($) {
  'use strict';

	var app = (function() {
		return {
			init: function init() {
				this.getCompanyInfo();
				this.companyInfo();
				this.initEvents();
			},

			initEvents: function initEvents() {
				$('[data-js="form"]').on('submit', this.handleSubmit)
			},

			handleSubmit: function (e) {
				e.preventDefault();

				var $tablecar = document.querySelector('[data-js="result"');
				$tablecar.appendChild(app.createNewCar());
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
				
				console.log('$image', $tdImage.appendChild($image));
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

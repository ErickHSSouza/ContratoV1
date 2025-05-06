var _breadcrumbs;

var breadcrumbs = (new function() {
	
	this.init = function() {
		require(["dojo/store/Memory"], function(Memory){
			_breadcrumbs = new Memory({data:[]});
			_breadcrumbs.add({title: "<i class='fa fa-dashboard'></i>&nbsp;Home", id: "views/home.jsp"});
		});
		
		return this;
	};
	
	/**
	 * Adiciona item ao store.
	 * @param {string} title Titulo da pagina.
	 * @param {string} url Url a ser chamada ao acionar o item na taxonomia. Caso seja informado uma url ja existente, um novo store sera criado voltando a taxonomia.
	 */
	this.add = function(title, url) {
		
		require(["dojo/store/Memory", "dojo/_base/array"], function(Memory, array){
			if(_breadcrumbs == null) {
				breadcrumbs.init();
			}
			
			var item = null; 
				
			if(url != null) {
				item = _breadcrumbs.get(url);
			} else {
				url = "#" + _breadcrumbs.data.length;
			}
			
			if(item != null) {
				// caso exista o item, cria novo store armazando ate chegar ao item adicionado, para voltar a taxonomia ao renderizar.
				var newStore = new Memory({data:[]});

				var adicionarItem = true;
				array.forEach(_breadcrumbs.data, function(item, indice) {
					
					if(adicionarItem) {
						newStore.add({title: item.title, id: item.id});
					}
					
					if(item.id == url) {
						adicionarItem = false;
					}
				});
				
				_breadcrumbs = newStore;

			} else {
				// caso nao exista o item, adiciona
				_breadcrumbs.add({title: title, id: url});
			}
		});
		
		return this;
	};
	
	/**
	 * Remove ultimo item inserido no store.
	 */
	this.removeLast = function() {
		require(["dojo/_base/array"], function(array) {	
			if(_breadcrumbs != null && _breadcrumbs.data != null && _breadcrumbs.data.length > 0) {
				var lastId = null;
				
				array.forEach(_breadcrumbs.data, function(item, indice) {
					lastId = item.id;
				});
				
				_breadcrumbs.remove(lastId);
			}
		});
		
		return this;
	};
	
	/**
	 * Limpa a lista do store.
	 */
	this.clean = function() {
		
		if(_breadcrumbs != null) {
			breadcrumbs.init();
		}
		
		return this;
	};
	
	/**
	 * Atualiza na tela a taxonomia de acordo com o store.
	 */
	this.render = function() {
		require(["dojo/_base/array"], function(array) {	
			if(_breadcrumbs != null && _breadcrumbs.data != null && _breadcrumbs.data.length > 0) {
				
				var html = "";
				array.forEach(_breadcrumbs.data, function(item, indice) {
					
					var url;
					if(item.id[0] != "#") {
						url = "javascript:app.setURL('" + item.id + "');";
					} else {
						url = "#";
					}
					
					if((indice+1) == _breadcrumbs.data.length || url == "#") {
						html += "<li class='active'>" + item.title + "</li>";
					} else {
						html += "<li><a href='#' onClick=" + url + ">" + item.title + "</a></li>";
					}
				});

				dojo.byId("index_breadcrumb").innerHTML = html;
			} else {
				dojo.byId("index_breadcrumb").innerHTML = "";
			}
		});
	};
	
	return this;
});
var _usuarioLogado;

var app = (new function() {

    this.log = function() {
        if (window.console) {
            console.log(arguments);
        }
    };
    
    this.debug = function() {
        if (window.console) {
            console.debug(arguments);
        }
    };
    
    
    this.formatarDataNormal = function(date) {
    	return date != null && date != "" ? dojo.date.locale.format(new Date(date), {selector: 'date', datePattern: "dd/MM/yyyy"}) : "";
    };
    
    
    this.formatarDataHoraNormal = function(date) {
    	return date != null ? dojo.date.locale.format(new Date(date), {selector: 'date', datePattern: "dd/MM/yyyy HH:mm"}) : "";
    };

    
    this.formatarDataHumanize = function(date) {
    	return date != null ? moment("/Date("+date+")/").fromNow() : ""; 
    };
    
    this.formatarDataNormalAndHumanize = function(date) {
    	var data = "";
    	if (date != null) {
    		data += dojo.date.locale.format(new Date(date), {selector: 'date', datePattern: 'dd/MM/yyyy HH:mm'});
    		data += "<br/>";
    		data += "<b>(" + moment("/Date("+date+")/").fromNow() + ")</b>"; 
    	}
    	return data;
    };
    
    this.formatarTimeHumanize = function(time) {
    	return time != null ? moment.duration(time).humanize() : "";
    };
    
    this.formatarTempoRestanteDataNormalAndHumanize = function(date) {
    	var tempoRestante = "";
    	if (date != null) {
    		tempoRestante += dojo.date.locale.format(new Date(date), {selector: 'date', datePattern: 'dd/MM/yyyy HH:mm'});
    		tempoRestante += "<br/>";
    		var time = date - Date.now();
	    	tempoRestante += "<b>(" +moment.duration(time).humanize(true)+ ")</b>"; 
    	}
    	return tempoRestante;
    };
    
    this.formatarTempoRestanteHumanize = function(date) {
    	var tempoRestanta = "";
    	if (date != null) {
    		var time = date - Date.now();
	    	tempoRestanta = moment.duration(time).humanize(true);
    	}
    	return tempoRestanta;
    };
    
    this.formatarTrueFalse = function(valor) {
		return valor != null && valor ? "Sim" : "Não";
	};
	
    this.formatarNvl = function(valor, valorAlternativo) {
    	if (valorAlternativo == null) {
    		valorAlternativo = "";
    	}
		return valor != null ? valor : valorAlternativo;
	};
	
    this.formatCurrencyByLong = function(valor) {
    	var val = valor != null && valor != "" ? parseInt(valor)/100 : 0;
        return app.formatCurrency(val);
    };
    
    this.formatCurrency = function(valor) {
        return valor != null && valor != "" ? dojo.currency.format(valor) : dojo.currency.format(0);
    };
    
    this.formatPercent = function(valor) {
        return valor != null && valor != "" ? dojo.currency.format(valor) + " %" : "0,00 %";
    };
    
    this.formatarTipoPessoa = function(valor) {
    	if (!valor) {
    		return "";
    	} else if (valor == "F") {
    		return "Física";
    	} else if (valor == "J") {
    		return "Jurídica";
    	} else {
    		return valor;
    	}
    }
    
    this.format = (function(source, params) {
    	var s = source;
		if (params && params.length > 0) {
			for (var i = 0; i < params.length; i++) {
		    	s = s.replace(new RegExp("\\{" + i + "\\}", "g"), function () {
		            return params[i];
		        });
			}
		}
	    return s;
    });
    
    
    this.encode = (function(unencoded) {
    	return encodeURIComponent(unencoded);
    });

    this.decode = (function(encoded) {
    	return decodeURIComponent(encoded.replace(/\+/g, " "));
    });
    
    this.replace = function(pTexto, pPadrao, pNovoValor) {
        do {
            pTexto = pTexto.replace(pPadrao, pNovoValor);
        } while (pTexto.indexOf(pPadrao) >= 0)
        return pTexto;
    };
    
    
    this.getSaudacao = function() {
    	var horaAtual = new Date().getHours();
    	var saudacao = "";
    	
    	if (horaAtual >= 5 && horaAtual < 12) {
    		saudacao = "Bom dia";
    	} else if (horaAtual >= 12 && horaAtual < 18) {
    		saudacao = "Boa tarde";
    	} else {
    		saudacao = "Boa noite";
    	}
    	
    	return saudacao;
    };
    
    this.getUsuarioLogado = function() {
    	return _usuarioLogado;
    };

    
    this.setTituloPrincipal = function(titulo) {
    	dojo.byId("tituloPrincipal").innerHTML = titulo;
    };
    
    this.setTituloSecundario = function(titulo) {
    	dojo.byId("tituloSecundario").innerHTML = '<i class="ace-icon fa fa-angle-double-right"></i> ' + titulo;
    };
    
    
    this.showInfoDialog = function(msg){
    	require(["dijit/registry"], function(registry) {	
    		dojo.byId("dialogBoxInformativo_mensagem").innerHTML = msg;
    		registry.byId("dialogBoxInformativo").show();
    	});
    };
    
    this.showMessage = function(message, options) {
    	if (dgrowl) {
	    	var _options = {channel:'info', title:'Notifica&ccedil;&atilde;o'};
	    	if (options && options != null) {
		    	require(["dojo/_base/lang"], function(lang){
					  lang.mixin(_options, options);				 
				});
	    	}
        	dgrowl.addNotification(message, _options);
        }
    };
    
    this.showError = function(message, options) {
    	if (dgrowl) {
    		var _options = {channel:'error', title:'Aten&ccedil;&atilde;o'};
	    	if (options && options != null) {
		    	require(["dojo/_base/lang"], function(lang) {
					  lang.mixin(_options, options);				 
				});
	    	}
        	dgrowl.addNotification(message, _options);
        }
    };
    
    this.showSuccessMessage = function(message) {
    	require(["dojo/dom", "dojo/_base/fx", "dojo/dom-style"], function(dom, fx, domStyle) {
	    	var html = "<br/>";
	    	html += "<div class='alert alert-success alert-dismissable'>";
	    	html += "	<i class='fa fa-check'></i>";
	    	html += "	<button type='button' class='close' data-dismiss='alert' aria-hidden='true' onClick=\"app.fadeOut('index_messages');\">&times;</button>";
	    	html += "	<p>" + message + "</p>";
	    	html += "</div>";
	    	
	    	dojo.byId("index_messages").innerHTML = html;					
	    	app.fadeIn("index_messages", true);
    	});
    }
    
    this.showWarningMessage = function(message, temporario) {
    	if (temporario == undefined || temporario == null) {
    		temporario = true;
    	}
    	
    	require(["dojo/dom", "dojo/_base/fx", "dojo/dom-style"], function(dom, fx, domStyle) {
	    	var html = "<br/>";
	    	html += "<div class='alert alert-warning alert-dismissable'>";
	    	html += "	<i class='fa fa-warning'></i>";
	    	html += "	<button type='button' class='close' data-dismiss='alert' aria-hidden='true' onClick=\"app.fadeOut('index_messages');\">&times;</button>";
	    	html += "	<p>" + message + "</p>";
	    	html += "</div>";
	    	
	    	dojo.byId("index_messages").innerHTML = html;					
	    	app.fadeIn("index_messages", temporario);
    	});
    }
    
    this.showErrorMessage = function(error, temporario) {
    	if (temporario == undefined || temporario == null) {
    		temporario = false;
    	}
    	
    	var html = "<br/>";
    	html += "<div class='alert alert-danger alert-dismissable'>";
    	html += "	<i class='fa fa-ban'></i>";
    	html += "	<button type='button' class='close' data-dismiss='alert' aria-hidden='true' onClick=\"app.fadeOut('index_messages');\">&times;</button>";
    	html += "	<p>";
    	html += "		<b>Aten&ccedil;&atilde;o!</b> N&atilde;o foi poss&iacute;vel processar a requisi&ccedil;&atilde;o. Ocorreu uma falha interna na aplica&ccedil;&atilde;o.";
    	html += "		&nbsp;<a class='btn btn-danger btn-xs' onClick=\"app.showHide('showErrorMessage_detalhe');\"><i class='fa fa-plus-circle'></i>&nbsp;Detalhes</a>";
    	html += "	</p>";
    	html += "	<div id='showErrorMessage_detalhe' style='display:none'>";
    	html += "		<br/>";
    	html += "		<p><b>" + error.clazz + ": " + error.message + "</b></p>";
    	html += "		<p>" + error.stackTrace + "</p>";
    	html += "	</div>";
    	html += "</div>";
    	
    	dojo.byId("index_messages").innerHTML = html;					
    	app.fadeIn("index_messages", temporario);
    }
    
    
    this.fadeIn = function(nodeId, temporario) {
    	if (dojo.byId(nodeId)) {
	    	require(["dojo/_base/fx", "dojo/dom-style"], function(fx, domStyle) {
		    	fx.fadeIn({
		    		node: nodeId,
		    		onBegin: function() {
		    			if (dojo.byId(nodeId)) {
		    				domStyle.set(nodeId, "display", "block");
		    			}
		    		},
		    		onEnd: function() {
		    			if (temporario) {
		    				app.fadeOut(nodeId, 5000);
		    			}
		    		}
		    	}).play();
	    	});
    	}
    };
    
    this.fadeOut = function(nodeId, delay) {
    	if (dojo.byId(nodeId)) {
	    	if (delay == null) {
	    		delay = 0;
	    	}
	    	
	    	require(["dojo/_base/fx", "dojo/dom-style"], function(fx, domStyle) {
		    	fx.fadeOut({
		    		node: nodeId,
		    		delay: delay,
		    		onEnd: function() {
		    			if (dojo.byId(nodeId)) {
		    				domStyle.set(nodeId, "display", "none");
		    			}
		    		}
		    	}).play();
	    	});
    	}
    };
    
    this.ajustaQuebraLinhaHTML = function(valor) {
    	if (valor != null) {
    		valor = valor.toString().replace(/\r\n/g,"<br/>").replace(/\n/g,"<br/>");
    	}
    	return valor;
    };

    this.showHide = function(id) {
    	require(["dojo/dom-style"], function(domStyle) {
    		if (domStyle.get(id, "display") == "none") {
    			app.fadeIn(id, false);
    		} else {
    			app.fadeOut(id, false);
    		}
    	});
    };
    
    this.show = function(id) {
    	app.fadeIn(id, false);
    };

    this.hide = function(id) {
    	app.fadeOut(id, false);
    };
    
    
    this.showLoadingScreen = function(show) {
    	require(["dijit/registry"], function(registry) {	
        	if (show) {
        		registry.byId("loadingMessage").show();
        	} else {
        		registry.byId("loadingMessage").hide();
        	}
    	});
    };
    
    
    this.initUsuarioLogado = function(callback) {
    	if (_usuarioLogado == null) {
    		app.doGet("seguranca/usuarioLogado/", null, function(data) {
    			_usuarioLogado = data;
    			callback(_usuarioLogado);
    		});
    	} else {
    		callback(_usuarioLogado);
    	}
    };
    
    this.doGet = function(url, data, callback, showLoading) {
    	if (showLoading == null) {
    		showLoading = true;
    	}
    	
    	require(["dojo/request", "dojo/io-query"], function(request, ioQuery) {
    	    var customConfig = {preventCache:true, handleAs:"json"};
    	    var queryStr = ioQuery.objectToQuery(data);

    	    if (url.indexOf("?") >= 0) {
    	    	url += "&";
    	    } else {
    	    	url += "?";
    	    }
    	    url += queryStr;
    	    
            if (showLoading) {
    		    app.showLoadingScreen(true);
            }
            
            request.get(url, customConfig).then(
            	function (response) {
                    if (showLoading) {
                    	app.showLoadingScreen(false);
                    }
                    app.handlerResponseToRequest(response, callback);
            	},
            	function(error) {
                    if (showLoading) {
                    	app.showLoadingScreen(false);
                    }
                    app.handlerErrorToRequest(error, callback);
            	}
            );
    	});
    };
    
    this.doGetForm = function(formId, data, callback, showLoading) {
    	if (showLoading == null) {
    		showLoading = true;
    	}
    	
    	require(["dojo/_base/lang","dojo/dom-form","dojo/dom"], function(lang, domForm, dom){
            var formData = domForm.toObject(formId);
            
            if (data != null) {
            	lang.mixin(formData, data);
            }
            
            var url = dom.byId(formId).action;

            app.doGet(url, formData, callback, showLoading);
       	});
    };
    
    this.doPost = function(url, data, callback, config) {
    	require(["dojo/_base/lang", "dojo/request"], function(lang, request) {
    		config = config || {};
    		
    	    var customConfig = {showLoading:true, preventCache:true, handleAs:"json", data:data};
    	    lang.mixin(customConfig, config);
    	    
            if (customConfig.showLoading) {
    		    app.showLoadingScreen(true);
            }
            
            request.post(url, customConfig).then(
            	function (response) {
            		if (customConfig.showLoading) {
                    	app.showLoadingScreen(false);
                    }
                    app.handlerResponseToRequest(response, callback);
            	},
            	function(error) {
            		if (customConfig.showLoading) {
                    	app.showLoadingScreen(false);
                    }
            		app.handlerErrorToRequest(error, callback);
            	}
            );
    	});
    };
    
    this.doPostForm = function(formId, data, callback, config) {
    	require(["dojo/_base/lang","dojo/dom-form","dojo/dom"], function(lang, domForm, dom){
    		config = config || {};
    		
            if (dijit.byId(formId).attr("encType").indexOf("multipart/form-data") >= 0 ) {
            	app.doPostUpload(formId, data, callback, showLoading, config);
            } else {
            	
                var url = dom.byId(formId).action;
                var formData = domForm.toObject(formId);
                if (data != null) {
                	lang.mixin(formData, data);
                }
                
                app.doPost(url, formData, callback, config);
            }
       	});
    };
    
    this.doPostUpload = function(formId, data, callback, config) {
    	require(["dojo/_base/lang", "dojo/request/iframe", "dojo/dom"], function(lang, iframe, dom) {
    		app.debug("doPostUpload com formId");
    		
    		config = config || {};
    		
        	app.debug("doPostUpload montar customConfig");

            var url = dom.byId(formId).action;
        	var customConfig = {showLoading:true, form: formId, preventCache:true, handleAs:"html", data:data};
        	lang.mixin(customConfig, config);

        	if (customConfig.showLoading) {
    		    app.showLoadingScreen(true);
            }
            
        	app.debug("doPostUpload vai realizar post");

        	iframe.post(url, customConfig).then(
            	function (response) {
            		if (customConfig.showLoading) {
            		    app.showLoadingScreen(false);
                    }
                    
					if(response instanceof HTMLDocument || Object.prototype.toString.call(response) == "[object HTMLDocument]") {
						var responseContent = null;
						if(response.getElementsByTagName("pre").length > 0) {
							responseContent = response.getElementsByTagName("pre")[0].innerHTML;
						} else {
							responseContent = response.getElementsByTagName("body")[0].innerHTML;
						}

						response = JSON.parse(responseContent);

						if(responseContent.indexOf("errorType") >= 0) {
							var error = {"response": {"data": response}};
							app.handlerErrorToRequest(error, callback);	
							return;
						}
					}
					                    
                    app.handlerResponseToRequest(response, callback);
            	},
            	function(error) {
            		if (customConfig.showLoading) {
            		    app.showLoadingScreen(false);
                    }
            		app.handlerErrorToRequest(error, callback);
            	}
            );
    	});
    };
    
    this.doPut = function(url, data, callback, config) {
    	require(["dojo/_base/lang", "dojo/request"], function(lang, request) {
    		config = config || {};
    		
    	    var customConfig = {showLoading:true, preventCache:true, handleAs:"json", data:data};
    	    lang.mixin(customConfig, config);

    	    if (customConfig.showLoading) {
    		    app.showLoadingScreen(true);
            }
            
            request.put(url, customConfig).then(
            	function (response) {
            		if (customConfig.showLoading) {
            		    app.showLoadingScreen(false);
                    }
                    app.handlerResponseToRequest(response, callback);
            	},
            	function(error) {
            		if (customConfig.showLoading) {
            		    app.showLoadingScreen(false);
                    }
            		app.handlerErrorToRequest(error, callback);
            	}
            );
    	});
    };
    
    this.doPutForm = function(formId, data, callback, config) {
    	require(["dojo/_base/lang","dojo/dom-form","dojo/dom"], function(lang, domForm, dom) {
    		config = config || {};
    		
            var url = dom.byId(formId).action;
            var formData = domForm.toObject(formId);
            if (data != null) {
            	lang.mixin(formData, data);
            }
            
            app.doPut(url, formData, callback, config);
       	});
    };
    
	
	this.customEntries = function(obj) {
		if (!Object.entries) {
			var ownProps = Object.keys(obj),
			i = ownProps.length,
			resArray = new Array(i); // preallocate the Array
			while (i--)
			resArray[i] = [ownProps[i], obj[ownProps[i]]];

			return resArray;
		}

		return Object.entries(obj);
	};
	
	this.handlerResponseToRequest = function(response, callback) {
    	if (callback) {
    		if (typeof response === 'string' || response instanceof String) {
    			response = JSON.parse(response);
    		}
			callback(response.items !== undefined && app.customEntries(response).length == 1 ? response.items : response); 
		}
    };
    
    this.handlerErrorToRequest = function(error, callback) {
    	if (error.response && error.response.data) {
    		var objData = (typeof error.response.data === 'string' || error.response.data instanceof String) ? JSON.parse(error.response.data) : error.response.data;
    		objData = objData.items !== undefined && app.customEntries(objData).length == 1 ? objData.items : objData;
    		if (objData.errorType == "SVDException") {
     			app.showWarningMessage(objData.message);
     			app.showError(objData.message);
     			if (callback) {
     				callback(null);
     			}
    		} else if (objData.errorType == "SpiderException") {
     			app.showWarningMessage(objData.message);
     			app.showError(objData.message);
    		} else if (objData.errorType == "Exception") {
    			app.showErrorMessage(objData);
    	 		app.showError(objData.message);
    		} else {
    			if (callback) {
     				callback(objData);
     			}
    		}
    	} else {
        	app.showErrorMessage(error);
        	app.showError(error.message ? error.message : 'Erro inesperado!');
        	app.log(error);
    	}
    };
    

    this.setFormFieldsToReadOnly = function(form_id, readOnly) {
		require(["dojo/_base/array", "dijit/registry"], function(array, registry) {	
    		try {
    			array.forEach(registry.byId(form_id).getChildren(), 
    				function (entry, i) {
						entry.attr("readOnly", readOnly);
					}
    			);
    		} catch (e) {
    			app.log(e);
    		}
    	});
	};
    
	this.getFormData = function(formId, data) {
		var _data = {};
		require(["dojo/_base/lang","dojo/dom-form"], function(lang, domForm){
			_data = domForm.toObject(formId);
            if (data != null) {
            	lang.mixin(_data, data);
            }
       	});
		return _data;
	}
	
	this.getFormModel = function(formId, data, options) {
		var defaults = {
			useJQuerySerialize: false,
	        associativeArrays: false,
	        parseBooleans: true
	    };
		
		const getValue = function(value) {
			if (settings.parseBooleans) {
				var boolValue = (value + "").toLowerCase();
				if (boolValue === "true" || boolValue === "false") {
					value = boolValue === "true";
				}
			}

			return value;
		};

		const createProperty = function(o, value, names) {
			var navObj = o;

			for (var i = 0; i < names.length; i++) {
				var currentName = names[i];

				if (i === names.length - 1) {								
					if (value !== null && Array.isArray(value)) {
						navObj[currentName] = new Array();
						$(value).each(function() {
							navObj[currentName].push(this);
						});
					} else {
						if (navObj.hasOwnProperty(currentName)) {
							if (Array.isArray(navObj[currentName])) {
								navObj[currentName].push(value);
							} else {
								var oldValue = navObj[currentName];
								navObj[currentName] = new Array();
								navObj[currentName].push(oldValue);
								navObj[currentName].push(value);
							}
						} else {
							navObj[currentName] = value;
						}
					}
				} else {
					var arrayKey = /\[\w+\]/g.exec(currentName);
					var isArray = arrayKey != null && arrayKey.length > 0;
					if (isArray) {
						currentName = currentName.substr(0, currentName.indexOf("["));
						if (settings.associativeArrays) {
							if (!navObj.hasOwnProperty(currentName)) {
								navObj[currentName] = {};
							}
						} else {
							if (!Array.isArray(navObj[currentName])) {
								navObj[currentName] = new Array();
							}
						}
						navObj = navObj[currentName];
						var keyName = arrayKey[0].replace(/[\[\]]/g, "");
						currentName = keyName;
					}
					if (!navObj.hasOwnProperty(currentName)) {
						navObj[currentName] = {};
					}
					navObj = navObj[currentName];
				}
			}
		};
			
		var settings = $.extend(true, {}, defaults, options);
		var serializedObject = {}
		
		if (settings.useJQuerySerialize) {
			var formData = $("#"+formId).serializeArray();
			$.each(formData, function(i, item) {
				var value = getValue(item.value);
				var names = item.name.split(".");
				createProperty(serializedObject, value, names);
			})
			serializedObject = $.extend(true, {}, serializedObject, data);
		} else {
			var newData = app.getFormData(formId, data);
			$.each(newData, function(i, item) {
				var value = getValue(item);
				var names = i.split(".");
				createProperty(serializedObject, value, names);
			})
		}
		
		return serializedObject;
	}
    
    this.responseItemsToForm = function(response, formId) {
    	try {
    		var object = response.items instanceof Array ? response.items[0] : response.items;
    		app.objectToForm(object, formId);
    	} catch (e) {
    	}
    };
    
    this.objectToForm = function(object, formId) {
    	require(["dojo/_base/array", "dijit/registry"], function(array, registry) {	
    		try {
    			array.forEach(registry.byId(formId).getChildren(), 
    				function (entry, i) {
    					if(entry.declaredClass == "dijit.form.DateTextBox" || entry.declaredClass == "dijit.form.TimeTextBox") {
    						try {
    							if (object[entry.name] != null) {
    								entry.attr("value", new Date(object[entry.name]));
    							}
    						} catch (e) {
    							app.debug(e);
    							entry.attr("displayedValue", object[entry.name]); 
    						}
    					} else if (entry.declaredClass == 'dijit.Editor') {
    						try {
    							entry.setValue(object[entry.id]);
    						} catch (e) {
    							app.debug(e);
    						}
    					} else if ( entry.type == 'radio' || entry.type == 'checkbox' ) {
    						if (entry.value == (object[entry.name] != null ? object[entry.name].toString() : "")) {
    							entry.attr("checked", true);
    						}
    					} else {
    						try {
    							entry.attr("value", object[entry.name]); 
    						} catch (e) {
    							app.debug(e);
    							entry.attr("displayedValue", object[entry.name]); 
    						}
    					} 
    				}
    			);
    		} catch (e) {
    			app.debug(e);
    		}
    	});
    };

    this.objectToLabel = function(object, labelPrefix) {
    	app.objectToElement(object, labelPrefix, "label");
    };
    
    this.objectToElement = function(object, labelPrefix, elemento) {
    	require(["dojo/query"], function(query) {	
    		query(elemento + '[id^="' + labelPrefix + '"]').forEach(function(node) {			
    			var name = node.id.replace(labelPrefix, "");
    			var value = app.getValueObjectRecursive(object, name);						
    			if (value != null) {
    				node.innerHTML = value;
    			}
    		}); 
    	});
    };
    
    this.getValueObjectRecursive = function(object, name) {
    	try {
    		if (name.indexOf("__") != -1) {
    			var key = name.split("__")[0]
    			return app.getValueObjectRecursive(object[key], name.substring(name.indexOf("__")+2));
    		} else {
    			return object[name]
    		}
    	} catch (e) {
    		return null;
    	}
    };
    
    this.setValueToLabels = function(labelPrefix, value) {
    	require(["dojo/query"], function(query) {	
    		query('label[id^="' + labelPrefix + '"]').forEach(function(node) {			
    			node.innerHTML = value;
    		}); 
    	});
    };
    
    this.setValueToLabel = function(label, value) {
    	require(["dojo/dom"], function(dom) {	
    		dom.byId(label).innerHTML = value;
    	});
    };
    
    
    this.createButton = function(params, onClick) {
    	var button;
    	require(["dijit/form/Button","dojo/_base/lang"], function(Button, lang) {
    		var customParams;
    		if (onClick != null) {
    			customParams = {onClick: onClick};
    			lang.mixin(customParams, params);
    		} else {
    			customParams = params;
    		}
    		
    		button = new Button(customParams);
    	});	
    	return button;
    };
    
    this.refreshStoreGrid = function(id) {
    	require(["dijit/registry"], function(registry) {
    		registry.byId(id)._refresh();
    		registry.byId(id)._resize();
    	});
    };
    
    this.removeItemGrid = (function(id, item) {
    	require(["dijit/registry"], function(registry) {
    		registry.byId(id).store.deleteItem(item);
    		registry.byId(id).store.save();
    		registry.byId(id).startup();
    	});
    });
    
    this.addNewItemGrid = (function(id, item)  {
    	require(["dijit/registry"], function(registry) {
    		if (registry.byId(id).store == null) {
    			app.fillGridWithData(id, "");
    		}

    		registry.byId(id).store.newItem(item);
    		registry.byId(id).store.save();
    		registry.byId(id).startup();
    	});
    });
    
    this.fillGridWithData = function(id, data, callback) {
    	require(["dijit/registry", "dojo/data/ObjectStore", "dojo/store/Memory"], function(registry, ObjectStore, Memory) {
    		registry.byId(id).setStore(new ObjectStore({objectStore: new Memory({data: data})}));
    		app.refreshStoreGrid(id);
    		
    		if (callback) {
    			callback();
    		}
    	});
    };
    
    this.fillGridFromUrl = function(id, url, callback) {
    	app.doGet(url, null, function(data) {
    		app.fillGridWithData(id, data, callback);
    	});
    };
    
    this.fillGridForm = function(id, formId, callback) {
    	app.doPostForm(formId, null, function(data) {
    		app.fillGridWithData(id, data, callback);
    	}, true);
    };
    
    this.getObjectDataFromGrid = (function(id) {
    	var objectData;
    	require(["dijit/registry"], function(registry) {
    		if(registry.byId(id).store != null) {
    			objectData = registry.byId(id).store.objectStore.data;
    		}
    	});
    	
    	return objectData;
    });
    
    this.getJsonDataFromGrid = (function(id) {
    	var jsonData;

    	require(["dojo/_base/json"], function(json) {
    		var objectData = app.getObjectDataFromGrid(id);
    		if(objectData != null) {
    			jsonData = json.toJson(objectData);
    		}
    	});
    	
    	return jsonData;
    });
    
    /**
     * Retorna a query string de acordo com os campos de um formulario
     * @param {string} id Id do formulario
     * @return {string} Query string, ex: campo1=valor1&campo2=valor2...
     */
    this.formToQuery = function(id) {
    	var formQuery;
    	require(["dojo/dom-form"], function(domForm){
    		formQuery = app.decode(domForm.toQuery(id));
    	});
    	
    	return formQuery;
    };
    
    /**
     * Preenche grid com QueryReadStore.
     * Utilizado para realizar consultas por demanda, ou seja, a cada pagina e realizada uma nova requisicao para recuperar os proximos registros.
     * @param {string} id Id do grid.
     * @param {string} url Url da requisicao.
     */
    this.fillQueryGrid = function(id, url) {
    	require(["dijit/registry", "dojox/data/QueryReadStore"], function(registry, QueryReadStore) {
    		registry.byId(id).setStore(new QueryReadStore({url: url}));
    		app.refreshStoreGrid(id);
    	});
    };
    
    /**
     * Preenche grid com QueryReadStore utilizando a url e os campos do formulario como parametros para a requisicao.
     * Utilizado para realizar consultas por demanda, ou seja, a cada pagina e realizada uma nova requisicao para recuperar os proximos registros.
     * @param {string} id Id do grid.
     * @param {string} formId Id do formulario.
     */
    this.fillQueryGridForm = function(id, formId) {
    	require(["dojo/dom", "dijit/registry", "dojox/data/QueryReadStore"], function(dom, registry, QueryReadStore) {
            var url = dom.byId(formId).action;

            var query = app.formToQuery(formId);

    		if (url.indexOf("?") >= 0) {
    			url += "&" + query;
    		} else {
    			url += "?" + query;
    		}
    		url += "&nocache="+new Date().getTime(); 
    		
    		registry.byId(id).setStore(new QueryReadStore({url: url}));
    		app.refreshStoreGrid(id);
    	});
    };
    
    /**
     * Preenche combobox de acordo com a url informada.
     * @param {sring} idItem Id do combobox.
     * @param {string} identifier Nome do campo identificador do item da lista retornada. Eh o valor que sera enviado como parametro ao postar o formulario.
     * @param {string} url Url da requisicao.
     * @param {function} callback Funcao a ser chamada apos realizar a requisicao e preencher o campo.
     * @param {boolean} showLoading Se deve mostrar ou nao a mensagem de "aguardando..."
     */
    this.fillComboBoxFromUrl = function(idItem, identifier, url, callback, showLoading) {
    	app.doGet(url, null, function(data) {
    		app.fillComboBoxWithData(idItem, identifier, data, callback);
    	}, showLoading ? showLoading : false );
    };
    
    /**
     * Preenche combobox de acordo com os dados informados.
     * @param {string} idItem Id do combobox.
     * @param {string} identifier Nome do campo identificador do item da lista retornada. Eh o valor que sera enviado como parametro ao postar o formulario.
     * @param {json object} data Dados utilizados para preencher o campo.
     * @param {function} callback Funcao a ser chamada apos preencher o campo.
     */
    this.fillComboBoxWithData = function(idItem, identifier, data, callback) {
    	require(["dijit/registry", "dojo/request", "dojo/_base/json", "dojo/data/ItemFileReadStore"], function(registry, request, json, ItemFileReadStore) {
    		var strData = json.toJson(data);
    		var customStrData = "{\"identifier\": \"" + identifier + "\", \"items\": " + strData + "}";
    		var customData = json.fromJson(customStrData);

    		registry.byId(idItem).set("store", new ItemFileReadStore({data: customData}));
    		
    		if (callback) {
    			callback(data);
    		}
    	});
    };

    
    /**
     * Realiza a validacao de formulario.
     * Considera os campos nao validados por padrao no dojo, como textarea e radiobutton.
     * @param {string} formId Id do formulario
     * @return {boolean} True se estiver valido ou False se nao for valido 
     */
    this.validateForm = function(formId) {
    	var isValid;
    	require(["dijit/registry"], function(registry) {
    		var formQuery = dojo.query("#"+formId)[0];
    		
    		isValid = registry.byId(formId).validate();
    		
    		if (isValid) {
    			dojo.query('textarea', formQuery).forEach(function(node, index, arr) {
    				var item = registry.byId(node.id);
    				if(item.attr("required") && item.attr("value") <= 0) {
    					isValid = false;
    					item.focus();
    				}
    			});
    			
    			dojo.query('input[type=radio]', formQuery).forEach(function(node, index, arr) {
    				var item = registry.byId(node.id);
    				if(item.attr("required")) {
    					if(dojo.query('input[name="' + node.name + '"]:checked').length <= 0) {
    						isValid = false;
    					}
    				}
    			});
    		}
    	});
    	
    	return isValid;
    };
    
    this.validateCpfCnpj = function(cpfCnpj) {
    	if (!cpfCnpj) {
    		return false;
    	}
    	
    	var isValid = false;
    	
    	require(["dojo/_base/lang"], function(lang) {
	    	if(!lang.isString(cpfCnpj)) {
	    		cpfCnpj = cpfCnpj + "";
	    	}
	    	
	    	let tried = null;
	    	if (cpfCnpj.length > 11) {
	    		let tried = 1;
	    		isValid = dojox.validate.br.isValidCnpj(cpfCnpj);
	    	} else {
	    		let tried = 2;
	    		isValid = dojox.validate.br.isValidCpf(cpfCnpj);
	    	}
	    	
	    	if (!isValid) {
	    		isValid = tried == 1 ? dojox.validate.br.isValidCpf(cpfCnpj) : dojox.validate.br.isValidCnpj(cpfCnpj);
	    	}
    	});
    	
    	return isValid;
    }
    
    this.validDateRange = function(initialDateId, endDateId, daysToValid) {
    	var valid = false;
    	if (dijit.byId(initialDateId).toString() != "" && dijit.byId(endDateId).toString() != "") {
	    	var initialDate = new Date(dijit.byId(initialDateId).toString());
	    	var endDate = new Date(dijit.byId(endDateId).toString());
	    	var difference = dojo.date.difference(initialDate, endDate, "day");
	    	if (difference >= 0 && difference <= daysToValid) {
	    		valid = true;
	    	}
    	}
    	return valid;
    }
    
    this.isCurrency = (function(valor) {
    	var retorno = false;
    	
    	if (!isNaN(valor) || !isNaN(dojo.currency.parse(valor))) {
    		retorno = true;
    	} else {
    		valor += '0';
    		if (!isNaN(valor) || !isNaN(dojo.currency.parse(valor))) {
    			retorno = true;
    		}
    	}
    	
    	return retorno;
    });
    
    
	//Evento de click enter para pesquisar em telas com Modal
	this.signal = {};
	this.eventClickEnter = (function(elementId) {
		try {
			app.signal.remove();
		} catch (e) {
		}
		
		require(["dojo/on", "dojo/domReady!"], function(on) {
			app.signal = on(document, "keydown", function(event) {
				if (event.keyCode == 13 && elementId != null) {
					$('#'+elementId).click();
					return false;  
				}
			});
		});
	});
	
	//UpperCase em todos os inputs
	this.upperCaseInputs = (function(){
		require(['dojo/on', 'dojo/dom'], function(on, dom) {
			on(document, 'keyup', function(event) {
				var inputElementWidget = dijit.byId(event.srcElement.id);
				var inputElementDom = dom.byId(event.srcElement.id);
				if (inputElementWidget != null && inputElementDom != null) {
					//48 a 57 -> numeros 0 a 9, 65 a 90 -> letras maiúsculas, 97 a 122 -> letras minúsculas
					var validKeyCode = ((event.keyCode >= 65 && event.keyCode <= 90) || (event.keyCode >= 97 && event.keyCode <= 122)) ? true : false;
					var inputHasClass = inputElementWidget.class && inputElementWidget.class.indexOf("text-uppercase") != -1 ? true : false;
					if (inputHasClass && validKeyCode) {
						inputElementDom.value = inputElementDom.value.toUpperCase();
						inputElementDom.style.textTransform = 'uppercase';
						inputElementWidget.validate();
					}
				}
			});
		});
	});
	this.upperCaseInputs();
	
	
    var lastPage = null;
    this.setURL = function(page) {
    	require(["dijit/registry"], function(registry) {	
	    	if (typeof history.pushState == "function") {
	    		// guarda as informacoes no historico do navegador
	    		var stateObj = { "page": page };
	    		history.pushState(stateObj, null, "index.jsp");
	    	}
	
	    	if (page.indexOf("?") == -1) {
	    		lastPage = page;
	    	}
	    	registry.byId("mainContentPane").set("href", page);
    	});
    };
    
    this.getLastPage = function() {
    	return lastPage;
    };
    
    
    this.openWindow = (function (page, target, width, height) {
    	if (page.indexOf("?") >= 0) {
    		page += "&";
    	} else {
    		page += "?";
    	}
    	page += "nocache="+new Date().getTime();
    	window.open(page, target, "scrollbars=yes, fullscreen=no, location=no, menubar=no,width=" + width + ", height=" + height);
    });
    
    
    this.focus = (function(elementId) {
    	require(["dijit/focus", "dojo/dom"], function(focusUtil, dom){
    		focusUtil.focus(dom.byId(elementId));
		});
	});
    
    
    this.ready = function(func) {
    	require(["dijit/registry"], function(registry) {	
    		var connected = dojo.connect(registry.byId("mainContentPane"), "onLoad", function() {
    			dojo.disconnect(connected); 
    			func();
    		});
    	});
    };
	    
    return this;

});
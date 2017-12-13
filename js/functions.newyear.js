/**
 * Файл с набором функций на JavaScript для работы с новогодними акциями
 * 
 * @author Игорь Стебаев <Stebaevin@gmail.com>
 * @copyright Copyright (c) 2017 Mycredit Company
 * @version 1.0
 * @package DesignAPI
 * @link http://www
 */

$(document).ready(function() {
	
    $('.js-btn-send').click(function() {

    	// console.log("js-btn-send");

    	var action = $(this.closest('form')).find('input[name=Action]').val();
    	var email = $(this.closest('form')).find('input[type=email]').val();
    	var tel = $(this.closest('form')).find('input[type=tel]').val();

    	console.log(action);
    	console.log(email);
    	console.log(tel);

    	if (validate($(this).closest('form'))) { 
    	
    		$("[name=email]").val(email);
    		$("[name=tel]").val(tel);
    		
    		var data = {
    				typeData: 'sendClientContactInfo',
    				Name: 'UserForAction',
      				Phone: tel,
      				Email: email,
    				Action: action
    			};
				
    		// отправить массив на сервер
    		console.log("Передаем запрос 'sendClientContactInfo'");
    		sendAjax(data);
    		
    		$(this.closest('.modal.fade')).modal('hide');
    	}
    });
 
});

/**
 * отсылает data через ajax на локальный сервер
 * @param url
 */
function sendAjax(data) {
	
	var url = "/ru/?ajax";	

	// отправить массив на сервер
	// console.log("Передаем запрос ajax " + url);
	// console.log("Передаем запрос ajax " + data.typeData);

	$.ajax({
		url: url,
		type: 'POST',
		data: {data: data},
		dataType: 'json',
		success: function(json){
			if(json) {
				//var js = JSON.parse(json);
				var js = json;
				
				// console.log(js);
			};
		},
	
		error: function(jqXHR, textStatus, errorThrown){
			// console.log(jqXHR); // вывод JSON в консоль
			console.log('Сообщение об ошибке от сервера: '+textStatus); // вывод JSON в консоль
			// console.log(errorThrown); // вывод JSON в консоль
		}
	});
}


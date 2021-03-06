var plantillas = plantillas || {};

plantillas.perfil = '<div class="login_users">'
		+ '<input type="hidden" id="reg_rol_usuario" name="reg_rol_usuario" value="{{rol}}">'
		+ '<input type="hidden" id="reg_id_usuario" name="reg_id_usuario" value="{{id_usuario}}">'
		+ '<i class="demo-icon icon-user in-inputs">&#xe800;</i> <input data-validado="" id="reg_name" type="text" name="" value="{{{nombre}}}" placeholder="Nombre">'
		+ '<div class="clear"></div>'
		+ '<i class="demo-icon icon-user in-inputs">&#xe800;</i> <input data-validado="" id="reg_surname" type="text" name="" value="{{{apellidos}}}" placeholder="Apellidos">'
		+ '<div class="clear"></div>'
		+ '<i class="demo-icon icon-user in-inputs">&#xe83e;</i> <input data-validado="" id="reg_dni" type="text" name="" value="{{dni}}" placeholder="DNI">'
		+ '<div class="clear"></div>'
		+ '<i class="demo-icon icon-user in-inputs">&#xe824;</i> <input data-validado="" id="reg_expediente" type="text" name="" value="{{expediente}}" placeholder="Expediente">'
		+ '<div class="clear"></div>'
		+ '<i class="demo-icon icon-user in-inputs">&#xe848;</i> <input data-validado="" id="reg_email" type="text" name="" value="{{mail}}" placeholder="Email">'
		+ '<div class="clear"></div>'
		+ '<i class="demo-icon icon-user in-inputs">&#xe82b;</i> <input data-validado="" id="reg_pass_new" type="password" name="" value="" placeholder="Nueva Password o dejar vacío">'
		+ '<div class="clear"></div>'
		+ '<a id="doactualizar" href="#" class="rotate"><i class="demo-icon icon-user">&#xe833;</i> Actualizar Datos</a>'
		+ '<div class="clear"></div>'
		+ '<div id="error" class="error"></div><div id="no-error" class="error">{{msg}}</div>'
		+ '</div>'
		+ '<div id="actualizarUsuarioModal" class="modal"><div>'
		+ '<h2 class="text-center">Actualizar Datos</h2>'
		+ '<input data-validado="" id="reg_pass_old" type="password" name="" placeholder="Introduzca su password actual">'
		+ '<div class="modal-botones"><a id="actualizarUserData" href="#" class="rotate"><i class="demo-icon icon-user">&#xe833;</i> Actualizar Datos</a>'
		+ '<a id="cancelarModal" class="cancel-modal" href="#"><i class="demo-icon icon-user">&#xe804;</i> Cancelar</a>'
		+ '</div></div>';

module.exports = plantillas;

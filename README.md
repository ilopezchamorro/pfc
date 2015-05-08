# RESUMEN DEL PROYECTO

Actualmente existen todo tipo de aplicaciones de gestión para distintos ámbitos pero llama la atención el déficit tecnólogico asociado a la práctica del deporte no profesional encontrando trabas como generación de fichas para equipos totalmente a mano en papel así como para el alquiler de instalaciones deportivas.

Esto genera trabas como la necesidad de acudir personalmente o en el mejor de los casos con gestión vía telefónica, haciéndose la empresa dependiente de horarios laborales del personal además de implicar un alto riesgo de pérdida de datos. También la creación de estadísticas de uso y rendimiento para la toma de decisiones del equipo directivo es sumamente costosa con la gestión tradicional además de tardía ya que se carece de datos en tiempo real.

Todo esto se traduce en un coste de oportunidad de mejorar el rendimiento del negocio así como la necesidad de depender de mayor número de personal y sueldos. Además el factor del error humano estará siempre presente como incertidumbre del negocio. Otra lectura desde el punto de vista contable es la capacidad de apuntar registros de cada entrada evitando errores de cara a La Hacienda Pública y desincentivar robos por parte del personal contratado.

Como solución se plantea la creación de una aplicación web que pueda crear un flujo más eficiente que ahorre costes, incertidumbres y de feedback inmediato sobre uso y consumo.

Él ámbito de este proyecto contempla la primera fase de desarrollo y puesta en marcha. Es importante destacar que la calidad y la astracción del código será clave para poder ser llevadas a cabo futuras fases que podrían contemplar la creación de estadísticas, el pago directo a traves de la aplicación con una pasarela de pago con el banco, PayPal u otras fuentes que puedan existir en el futuro dando las máximas facilidades a tus clientes y contables. Otra fase podría contemplar la creción de apps móviles nativas para cada plataforma, desarrollo de aplicaciones para wearables o google glasses, o el desarrollo de una inteligencia artificial capaz de identificar dentro de un complejo de pistas de toda una región sugiriendo la pista más cercana entre todos los jugadores que asistan al partido en cuanto a óptimo de pareto.

Extendiendo el comienzo del punto anterior pasamos a describir la primera fase de la aplicación que será la única contemplada en este proyecto fin de carrera.

## PRIMERA FASE DE DESAROLLO

La primera fase de desarrollo contempla la creación de una base de datos relacional para poder guardar los datos con los que se va a trabajar. El desarrollo de la API RESTful que se encargará de comunicar el front con la BBDD con todos los servicios necesarios para las interecciones de los clientes web. Un cliente web desarrollado bajo Backbone que llevará el peso de la lógica de negocio. La funcionalidades que se obtendrán de esta primera fase son los siguientes:

- Alta de nuevos Usuarios
- Login
- SignOut
- Listado de deportes
- Listado de pistas
- Listado de horarios de cada pista con aviso de estado: libre, ocupado o posibilidad de cancelación si es tu propia reserva.
- Calendario para switchear días
- Listado de ficha de usuario

###### Los usuarios administradores también podrán:
- Dar de baja Usuarios
- Crear Otras cuentas de administradores
- Cancelar cualquier reserva
- Reservar pistas
- Cambiar precios de las pistas



### DEFINICIÓN DE LA ESRTUCTURA DE SOFTWARE

Se ha optado por una arquitectura separada principalmente en tres capas lógicas:

	- 1.Modelo de Datos
	- 2.API-RESTful
	- 3.Front-end

El modelo será una base de datos relacional MySQL que guardará todos los datos necesarios para el funcionamiento de la aplicación.  Se creará una capa intermedia a modo broker cuyo único fin es comunicar el front-end con el modelo de datos que será la API RESTful. Y una tercera capa que será el front-end donde estará el peso de la lógica de negocio y las vistas para que los usuarios y administradores puedan interaccionar con el modelo.


![alt text][logo2]

[logo2]: https://github.com/ilopezchamorro/pfc/blob/master/arquitectura.png "Arquitectura"


Se ha optado por esta arquitectura para que los costes de servidores sean los mínimos posibles llevando la lógica de negocio al front-end gracias a la pontencia que nos brinda el framework Backbone desarrollado en javascript que pasará a ser ejecutado en el cliente. Actualmente esto es viable gracias al aumento de la potencia media de todos los dispositivos con los que cuentan los usuarios y conseguimos rebajar el número de procesos en el servidor prácticamente al mínimo reduciendo el coste notablemente. Se entiende que ante picos de uso y la necesidad de poder dar servicio a millones de personas concurremente esta misma arquitectura estaría preparada para ser desplegada en un entorno de alta disponibilidad con escalado automático sin tener que realizar ninguna refactorización de código.

Para el desarrollo y en corcondancia con la reducción de costes se ha optado por utilizar solo software libre exento del pago de licencias.

Seguidamente se van a definir las tecnologías de cada capa.


#### 1. MODELO DE DATOS

Será un modelo de datos relacional en MySQL... blah blah blah, aquí explayate tu y metes el diagrama que te paso de la bbdd te da para rellenar con wikipedia una página entera con historia etc... Si quieres el royo también del workbench, etc.


![alt text][logo]

[logo]: https://github.com/ilopezchamorro/pfc/blob/master/db.png "Modelo Relacional"

####  2. API-RESTful

Actuará de brocker ejerciendo la comunicación entre el frontend y el modelo de datos. Esta API no guardará datos en memoria por lo que no se encargará de la persistencia siendo su único fin la gestión de recuperación de datos y empaquetarlos como JSON para devolverlos al front. Se crea esta capa intermedia para garantizar la seguridad de los datos no teniendo nunca el front acceso directo a la base de datos siendo trabajo de esta api el lanzamiendo de las consultas en un entorno controlado. Las variables que proceden del front serán parametrizadas siempre evitando así cualquier ataque tipo SQL Inyection.

Estará desarrollada en PHP orientado a objetos y astraido en dos clases, Rest.php y API.php que extiende de Rest. Para generar las consultas se utilizará la libreria de php PDO.

Estará preparada para trabajar las consultas con urls amigables.

Su lógica implica que por cada petición vamos a recibir un objeto JSON ya sea dando la información solicitada o bien informando del error que ocurra por ejecución, petición no aceptada, datos incorrectos, o falta de privilegios para dicha consulta.

###### Clase Rest:

Esta clase se ocupa de dos tareas principalmente:
- Devolver las cabeceras con el código de estado y el resultado de la petición al cliente.
- Filtrar los datos enviados en la petición.

A) El método mostrarRespuesta recibe los parámetros $data, que contiene la respuesta JSON a enviar al cliente, y $estado que especifica el código de estado HTTP que acompañará a la respuesta. Este método se encarga de asignar el código de estado con el que se configurarán las cabeceras. Configurará las cabeceras que se van a enviar junto con la respuesta, mediante la llamada al método setCabecera.  Y mostrará dicha respuesta.
B) El método setCabecera  crea dos cabeceras que acompañarán a la respuesta de la petición. Para ello utilizará el código de estado asignado en el método mostrarRespuesta y la descripción del código obtenida mediante el método getCodEstado. Estas cabeceras no serán enviadas hasta que no se envíe la respuesta en mostrarRespuesta con la instrucción echo $data.
C) El método getCodEstado contiene un array asociativo donde las claves son los posibles códigos de estado y los valores son las descripciones asociadas a esos códigos. Por lo tanto a partir del código de estado que se enviará junto a las cabeceras y la respuesta, devolverá su descripción.

Los método encargados de limpiar los datos se encargan de sanear los datos que acompañan a las peticiones GET, POST, PUT y DELETE.
A) El método tratarEntrada se encarga de sanear el array datos de entrada llamando al método limpiarEntrada y asigna dicho array de datos al atributo $datosPetición. Para ello primero comprueba cual es el método de petición `($_SERVER['REQUEST_METHOD'])` y pasa los datos del array superglobal de la petición a limpiarEntrada. Esto quiere decir que si el método de estrada es GET se tratarán los datos del array `$_GET`. Y si es POST se tratarán los datos que puedan estar contenidos en `$_POST`.
B) El método limpiarEntrada se encarga de sanear los datos que se le pasen como parámetro. Es un método recursivo para tratar cada uno de los valores de un array.


###### .htaccess

Como comentamos anteriormente, queremos que el servicio pueda ser utilizado mediante URL's amigables. Para ello deberemos de especificar una regla de reescritura de URL's en un fichero .htaccess. Que lo definiremos en la raíz del proyecto.

Con esta regla de reescritura estamos especificando:
- El directorio base es `/login_restful/`
- Se han añadido tres condiciones para restringir la reescritura sólo a rutas que no existan previamente. Es decir, que no valdría realizar reescritura, por ejemplo, para `http://pfc.ilopezchamorro.com/img/img.png` (suponemos que esta ruta y recurso existe). La primera condición previene los directorios que ya existan con la bandera `!-d`. La segunda condición hace que se ignoren ficheros que ya existan con la bandera !-f. Y la tercera condición hace que se ignoren los enlaces simbólicos que ya existan con `!-l`.
- Luego con la regla de reescritura transformaremos una URL amigable a una URL con la que el servidor pueda trabajar. Por lo tanto http://pfc.ilopezchamorro.com/api/borrarUsuario/1 será transformado internamente a `http://pfc.ilopezchamorro.com/api/Api.php?url=borrarUsuario/1`. Ya que `/borrarUsuario/1` será tomado como referencia `$1`.


###### Clase Api

Anteriormente definimos la clase Rest y vamos a utilizarla como clase base a heredar. De esta forma tendremos disponibles tanto sus métodos como atributos. La clase que vamos a definir a continuación (Api) va a ser la encargada de:

- Conectar con la base de datos
- Determinar que método debe de utilizar para resolver la petición, a partir de la url de dicha petición.
- Utilizar los métodos heredados de la clase padre para sanear los datos de entrada de la petición y devolver el resultado al cliente.

A) El método conectarDB como su propio indica, se encarga de conectar con la base de datos que contendrán los recursos del servicio. Para ello utilizaremos PDO como librería de abstracción para tratar con la base de datos MySQL.

B) El método devolverError utiliza un identificador recibido como parámetro para devolver un array asociativo con dos elementos: elemento 'estado' con valor error y elementos 'msg' con la descripción de error.

C) El método procesarLLamada es uno de los métodos más importantes ya que es el encargado de procesar la URL de la petición y a partir de ella se llamará al método que resolverá la citada petición.
Como hemos comentado en el apartado anterior, si se hace una petición a la URL  `http://pfc.ilopezchamorro.com/api/borrarUsuario/1`, esta URL será transformado internamente a `http://pfc.ilopezchamorro.com/api/Api.php?url=borrarUsuario/1`. Por lo tanto, si obtenemos el valor de la variable global 'url' `($_REQUEST['url'])` obtendremos borrarUsuario/1.  Y esto nos puede sugerir que necesitamos invocar al método borrarUsuario con el 1 como argumento para resolver la petición. Evidentemente no todas las URL estarán asociadas a llamadas a métodos con argumentos. Por ejemplo: `http://pfc.ilopezchamorro.com/api/usuarios`.

Los siguientes métodos de la clase son los encargados de realizar cada una de la operaciones asociadas con las peticiones.

A) El método usuarios comprueba si se ha accedido a él mediante una petición GET y devuelve un objeto JSON con los datos de los usuarios del servicio.

B) El método login comprueba si se ha accedido a él mediante una petición POST, comprueba si lo datos que acompañan a dicha petición `($datosPeticion)` son adecuados y devuelve un objeto JSON indicando si el usuario existe.

C) El método `actualizarNombre($id)` tras comprobar que se ha accedido a él con una petición PUT, utiliza los datos pasados junto a dicha petición y el parámetro `$id`, extraído de la URL en procesarLLamada, para actualizar el nombre de un usuario existente (con dicho identificador). Posteriormente devuelve un objeto JSON confirmando que se ha actualizado los datos de un usuario.

D) El método `borrarUsuario($id)` tras comprobar que se ha accedido a él con una petición DELETE, utiliza el parámetro $id, extraído de la URL en procesarLLamada, para borrar el usuario con dicho identificador. Posteriormente devuelve un objeto JSON confirmando que se ha borrado el usuario.

E) Finalmente el método crearUsuario tras comprobar que se ha accedido a él mediante una petición POST, utiliza los datos pasados junto a dicha petición para crear a un nuevo usuario. Posteriormente se devuelve un objeto confirmando la creación del usuario.

Finalmente se creará una instancia de la clase Api y se llamará al método procesarLLamada. Esto es necesario ya que cada vez que se realice una petición a una URL del servicio, gracias a la regla de reescritura se llama al script `Api.php`. Y de esta manera se creará el objeto Api y se invocará al método que procesa la URL y llama al encargado de resolver la petición.

> Hasta ahora se ha documentado cómo funciona la api, a continuación se documentará cada endpoint del servicio


| Método        | URL             | Descripción                                          | Parametros
| ------------- | --------------- | ---------------------------------------------------- | -----------------------
| POST          | nuevoUsuario/   | Crea un nuevo Usuario                                | nombre, apellidos, expediente, dni, password, mail
| POST          | nuevoAdmin/     | Crea un nuevo Adminsitrador                          | nombre, apellidos, expediente, dni, password, mail, rol
| POST          | nuevaHora/      | Crea una nueva hora a todas las pistas               | inicio
| POST          | nuevoDeporte/   | Crea un nuevo Deporte                                | nombre
| GET           | deportes/       | Lista los deportes                                   | null
| POST          | pistas/         | Lista las pistas de un deporte de un día determinado | id (pista), fecha_pista
| POST          | reserva/        | Crea un nueva Reserva                                | id_usuario, id_pista, id_hora, fecha_pista, luz, anulado
| PUT           | anularReserva/  | Anula una reserva                                    | id_reserva
| GET           | usuarios/       | Lista los usuarios                                   | null
| POST          | login/          | Confirma credenciales del usuario                    | mail, password



####  3. FRONT-END

El front-end está compuesto por un conjunto de tecnologías web de última generación.

	- 1.HTML5
	- 2.CSS3
	- 3.Javascript(lógica de negocio)

Aunque estas tecnologías existen casi desde el comienzo de la web han sufren continuas actualizaciones y cambios sobre sus estándares mejorando su perfomance y ampliando sus capacidades.

Conviene destacar un poco la historia de javascript que nació para dar interactividad a las webs estáticas. Fue Microsof con Internet Explorer 5.5 quien sin saberlo dotó de vida a javascript creando los objtos XHR (comunicación ajax) aunque la comunidad no supo aprovechar la potencia de este objeto hasta varios años después. Este estándar nos permite hoy en día comunicar javascript directamente con el servidor a través de llamadas Ajax de manera asíncrona (sin tener que recargar la página). Gracias a esto se han desarrollado frameworks como Backbone que ha traído una revolución a la web, siempre se ha tenido javascript como un lenguaje menor por que no se ha sabido aprovechar su naturaleza funcional gracias a que son objetos de primera clase por que se pueden pasar funciones anónimas como parámetro o devolver funciones entre otras cualidades. Backbone nos ayuda a tener un patrón de diseño MVC en front teniendo la capacidad de desarrollar código bien estructurado y astraido que nos permite tener un código limpio, mantenible y ampliable.

A continuación pasamos a describir cada punto de manera más extensa.


#### 1. HTML5

to-do


#### 2. CSS3


to-do


#### 3. JAVASCRIPT

Existen librerías que son dependencias para el desarrollo pero que no afectan a la ejecución del proyectoque las explicaremos en un punto posterior sobre el entorno de desarrollo y las automatizaciones de tareas.

A continuación se listarán las librerías de las que el proyecto es dependiente para su ejecución:


- [Backbone.js](http://backbonejs.org/): Core de la aplicación, lleva MVC al front
- [Underscore.js](http://underscorejs.org/): Manejo de Objetos con orientación funcional y dependencia de Backbone
- [HandelBars](http://handlebarsjs.com/): Templating que astrae la lógica de la presentación
- [Moment](http://momentjs.com/): Gestión de fechas
- [Sha1](https://github.com/pvorb/node-sha1): Creación de arlgoritmo de cifrado Sha1 para la contraseña de los usuarios
- [Backbone.localstorage](https://www.npmjs.com/package/backbone.localstorage): Librería que facilita el uso de localstorege de HTML desde javascript
- [jQuery](https://jquery.com/): Libreria cross-browsing y dependencia de Backbone para peticiones Ajax
- [JQuery UI](https://jqueryui.com/): Capa de Front interactiva usada para el calendario


El resultado final del javascript del proyecto será un único javacript concatenado, ofuscado y minificado en el archivo `./js/app.min.js` con todas las dependencias de producción así como la lógica desarrollada. Gracias a esto conseguimos que toda la lógica que necesita la aplicación esté contenida en una única petición al servidor optimizando así la carga de la aplicación que podría llegar a ser servida de forma distribuída por un CDN tipo Amazon S3 y optimizar aun más el proyecto, aunque no se contempla en esta primera fase armar una arquitectura de alta disponibilidad.


***

TO-DO


o	ARQUITECTURA DE BASE DE DATOS
o	DEFINICIÓN DE ENDPOINTS DE LA APIREST
o	CONFIGURACIÓN DE ENTORNO DE DESARROLLO
o	AUTOMATAZACIÓN DE TAREAS
o	CONFIGURACIÓN DE DEPLOYS
o	CREACIÓN DE API REST Y SUS ENDPOINTS
o	CREACIÓN DEL PROYECTO BASE
o	IMPLEMENTACIÓN DE MODULOS
	•	REGISTRAR USUARIO
	•	LOGIN USUARIO
	•	PERSISTENCIA DE DATOS DEL LOGIN
	•	CERRAR SESIÓN
	•	TIPOS DE DEPORTES
	•	PISTAS POR DEPORTE
	•	CALENDARIO Y GESTIÓN DE FECHAS
	•	RESERVA DE PISTAS
	•	ANULACIÓN DE PISTAS
	•	FICHA DE USUARIO
	•	LISTADO DE RESERVAS
	•	MODO ADMINISTRADOR
	•	CREAR USUARIOS ADMINISTRADOR
	•	ANULAR CUALQUIER RESERVA
	•	RESERVAR COMO ADMINISTRADOR
	•	LISTAR Y BORRAR USUARIOS
	•	CAMBIAR PRECIOS DE LAS PISTAS
o	ESTILOS CSS AL ESQUELETO HTML
o	TESTING
o	MEMORIA


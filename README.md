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



### DEFINICIÓN DE LA ESTRUCTURA DE SOFTWARE

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

Será un modelo de datos relacional en MySQL.

MySQL es un sistema de gestión de bases de datos relacional, multihilo y multiusuario con más de seis millones de instalaciones.1 MySQL AB —desde enero de 2008 una subsidiaria de Sun Microsystems y ésta a su vez de Oracle Corporation desde abril de 2009— desarrolla MySQL como software libre en un esquema de licenciamiento dual.

Por un lado se ofrece bajo la GNU GPL para cualquier uso compatible con esta licencia, pero para aquellas empresas que quieran incorporarlo en productos privativos deben comprar a la empresa una licencia específica que les permita este uso. Está desarrollado en su mayor parte en ANSI C.

Al contrario de proyectos como Apache, donde el software es desarrollado por una comunidad pública y los derechos de autor del código están en poder del autor individual, MySQL es patrocinado por una empresa privada, que posee el copyright de la mayor parte del código. Esto es lo que posibilita el esquema de licenciamiento anteriormente mencionado. Además de la venta de licencias privativas, la compañía ofrece soporte y servicios. Para sus operaciones contratan trabajadores alrededor del mundo que colaboran vía Internet. MySQL AB fue fundado por David Axmark, Allan Larsson y Michael Widenius.

MySQL es usado por muchos sitios web grandes y populares, como Wikipedia, Google (aunque no para búsquedas), Facebook, Twitter, Flickr y YouTube.


![alt text][logo]

[logo]: https://github.com/ilopezchamorro/pfc/blob/master/db.png "Modelo Relacional"


- Se hace DELETE ON CASCADE con los deportes, usuarios y pistas. Al eleminar un usuario se eliminan sus reservas. Si se elimina un deporte se eliminan sus pistas y sus alquileres asociados.

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
- El directorio base es `/api/`
- Se han añadido tres condiciones para restringir la reescritura sólo a rutas que no existan previamente. Es decir, que no valdría realizar reescritura, por ejemplo, para `http://pfc.ilopezchamorro.com/img/img.png` (suponemos que esta ruta y recurso existe). La primera condición previene los directorios que ya existan con la bandera `!-d`. La segunda condición hace que se ignoren ficheros que ya existan con la bandera !-f. Y la tercera condición hace que se ignoren los enlaces simbólicos que ya existan con `!-l`.
- Luego con la regla de reescritura transformaremos una URL amigable a una URL con la que el servidor pueda trabajar. Por lo tanto `http://pfc.ilopezchamorro.com/api/borrarUsuario/1` será transformado internamente a `http://pfc.ilopezchamorro.com/api/Api.php?url=borrarUsuario/1`. Ya que `/borrarUsuario/1` será tomado como referencia `$1`.


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

Aunque estas tecnologías existen casi desde el comienzo de la web sufren continuas actualizaciones y cambios sobre sus estándares mejorando su perfomance y ampliando sus capacidades.

Conviene destacar un poco la historia de javascript que nació para dar interactividad a las webs estáticas. Fue Microsof con Internet Explorer 5.5 quien sin saberlo dotó de vida a javascript creando los objtos XHR (comunicación ajax) aunque la comunidad no supo aprovechar la potencia de este objeto hasta varios años después. Este estándar nos permite hoy en día comunicar javascript directamente con el servidor a través de llamadas Ajax de manera asíncrona (sin tener que recargar la página). Gracias a esto se han desarrollado frameworks como Backbone que ha traído una revolución a la web, siempre se ha tenido javascript como un lenguaje menor por que no se ha sabido aprovechar su naturaleza funcional gracias a que son objetos de primera clase por que se pueden pasar funciones anónimas como parámetro o devolver funciones entre otras cualidades. Backbone nos ayuda a tener un patrón de diseño MVC en front teniendo la capacidad de desarrollar código bien estructurado y astraido que nos permite tener un código limpio, mantenible y ampliable.

La aplicación será tipo 'ONE-PAGE' con un único archivo `.html` que será el index y nunca se recagará la página ya que la gestión el peso de la aplicación lo lleva Backbone que será capaz de cambiar dinamicamente las url gracias al push-state de `HTML5` que permite añadir parámetros a la url tras el hash ´#´, este lo escondemos para dejar una url más limpia. Véase como ejemplo en los comienzos Twitter que usa tecnología sus urls estaban formadas de la siguiente manera: `twitter.com/!#/user`, actualmente y gracias a HTML5 se puede esconder este valor.

Backbone injectará partes de HTML dentro del index de manera asíncrona según vayan ocurriendo eventos como pulsar en un botón o bien al cambiar la url sin necesidad de recargar la página.

A continuación pasamos a describir cada punto de manera más extensa.


#### 1. HTML5

HTML5  es la última evolución de la norma que define HTML. El término representa dos conceptos diferentes

Uno se trata de una nueva versión del lenguaje HTML, con nuevos elementos, atributos y comportamientos.
Dos un conjunto más amplio de tecnologías que permite a los sitios Web y a las aplicaciones ser más diversas y de gran alcance. Este conjunto se le llama HTML5 y amigos, a menudo reducido a sólo a HTML5 .

Diseñado para ser utilizable por todos los desarrolladores de Open Web, esta página referencia a numerosos recursos sobre las tecnologías de HTML5, que se clasifican en varios grupos según su función.

- Semántica: Permite describir con mayor precisión cuál es su contenido.
- Conectividad: Permite comunicarse con el servidor de formas nuevas e innovadoras.
- Fuera de línea y almacenamiento: Permite a páginas web almacenar datos, localmente, en el lado del cliente y operar fuera de línea de manera más eficiente.
- Multimedia: Nos otorga un excelente soporte para utilizar contenido multimedia como lo son audio y video nativamente.
- Gráficos y efectos 2D/3D: Proporcionar una amplia gama de nuevas características que se ocupan de los gráficos en la web como lo son el lienzo 2D, WebGL, SVG, etc.
- Rendimiento e Integración: Proporcionar una mayor optimización de la velocidad y un mejor uso del hardware.
- Acceso al dispositivo: Proporciona APIs para el uso de varios compomentes internos de entrada y salida de nuestro dispositivo.
- CSS3: Nos ofrece una nueva gran variedad de opciones para la sofisticación del diseño.

En este proyecto al ser tipo ONE-PAGE se encontrará un único archivo `.html` que será el esquelo base para generar las vistas de usuario y su gestión se delegará a Backbone. En este archivo se incluyen las llamadas a los documentos tanto javascript como css.


#### 2. CSS3


CSS u hojas de estilo en cascada (en inglés Cascading Style Sheets) es un lenguaje usado para definir la presentación de un documento estructurado escrito en HTML. El W3C (World Wide Web Consortium) es el encargado de formular la especificación de las hojas de estilo que servirán de estándar para los agentes de usuario o navegadores.

Actualmente, pese a que la especificación 2.1 se aprobó recientemente, CSS3 ha venido desarrollándose desde 1999. Esta nueva especificación viene con interesantes novedades que permitirán hacer webs más elaboradas y dinámicas, con mayor separación entre estilos y contenidos. Dará soporte a muchas necesidades de las webs actuales, sin tener que recurrir a trucos de diseñadores o lenguajes de programación.

En esta completa guía, el autor nos muestra el uso de las principales características que este lenguaje ofrece. De entre ellas, destacamos los nuevos selectores, los pseudo elementos, las pseudo clases y toda una serie de efectos estéticos que abarcan desde la tipografía a las transformaciones 3D.

Nuestro CSS será un único archivo minificado y concatenado generado por el precompilador Stylus (se describirá en la parte de desarrollo)

Se ha usado la librería [Normalize](http://necolas.github.io/normalize.css/) a modo reset de estilos.

#####¿Por qué se hace esto?

Hasta que CSS3 y HTML5 sean un estándar terminado y no en desarrollo ante huecos no claros de estilos predefinidos cada navegador aplica las reglas por defecto que le parecen mas óptimas, esto hace que de partida y sin un reset que iguale los estilos predefinidos de todos los navegadores nos encontramos algunos problemas como que Microsoft aplica bordes a las tablas ya que considera que una tabla debe mostrarse así mientras que Chrome lo muestra sin líneas a salvo que se le indique. Esto occurre con otros tantos estilos como márgenes, padings, etc.

#####Tipografía

El único resource externo que se usa es la fuente Roboto para utilizarla en toda la página.

-LLAMADA HTML:
```html
<link href='http://fonts.googleapis.com/css?family=Roboto:400,300italic,300,100italic,100,400italic,500,900italic,700italic,900,700,500italic' rel='stylesheet' type='text/css'>
```

-CSS:
```css
body{
	font-family: 'Roboto', sans-serif;
	font-size: 16px;
	margin: 0;
}
```





#### 3. JAVASCRIPT

Existen librerías que son dependencias para el desarrollo pero que no afectan a la ejecución del proyecto y las explicaremos en un punto posterior sobre el entorno de desarrollo y las automatizaciones de tareas.

A continuación se listarán las librerías de las que el proyecto es dependiente para su ejecución:


- [Backbone.js](http://backbonejs.org/): Core de la aplicación, lleva MVC al front
- [Underscore.js](http://underscorejs.org/): Manejo de Objetos con orientación funcional y dependencia de Backbone
- [HandelBars](http://handlebarsjs.com/): Templating que astrae la lógica de la presentación
- [Moment](http://momentjs.com/): Parsea, manipula y muestra fechasw
- [Sha1](https://github.com/pvorb/node-sha1): Creación de arlgoritmo de cifrado Sha1 para la contraseña de los usuarios
- [Backbone.localstorage](https://www.npmjs.com/package/backbone.localstorage): Librería que facilita el uso de localstorege de HTML5 desde javascript
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


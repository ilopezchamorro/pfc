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
- Listado de reservas
- Buscador de reservas
- Buscardor de usuarios
- Modificación de perfil

###### Los usuarios administradores también podrán:
- Crear usuarios
- Modificar Usuarios
- Buscar usuarios
- Dar de baja Usuarios
- Escalar permisos
- Crear Otras cuentas de administradores
- Cancelar cualquier reserva
- Listar reservas
- Busqueda de reservas
- Reservar pistas
- Crear Deportes
- Modificar Deportes
- Eliminar Deportes
- Crear pistas
- Modificar pistas
- Asignar pistas a Deportes
- Gestionar precios de las pistas



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




| Método        | URL             | Descripción                                          | Parámetros
| ------------- | --------------- | ---------------------------------------------------- | -----------------------
| POST          | nuevoUsuario/   | Crea un nuevo Usuario                                | nombre, apellidos, expediente, dni, password, mail
| POST          | nuevoAdmin/     | Crea un nuevo Adminsitrador                          | nombre, apellidos, expediente, dni, password, mail, rol
| POST          | actualizarUsuario/| Atualiza los datos de un user                      | nombre, apellidos, expediente, dni, password, mail
| POST          | actualizarAdmin/| Atualiza los datos de un admin                      | nombre, apellidos, expediente, dni, password, mail
| POST          | eliminarUsuario/| Elimina un usuario                                   | id_usuario
| POST          | nuevaHora/      | Crea una nueva hora a todas las pistas               | inicio
| POST          | nuevoDeporte/   | Crea un nuevo Deporte                                | nombre
| POST          | EliminarDeporte/| Elimina un deporte                                   | id_deporte
| POST          | ModificarDeporte/| Modifica un Deporte                                 | id, new_name_deporte
| GET           | deportes/       | Lista los deportes con Pistas asociadas              | null
| GET           | deportesAdmin/       | Lista todos los deportes                             | null
| POST          | pistas/         | Lista las pistas de un deporte de un día determinado | id (pista), fecha_pista
| POST          | modificarPistas/| Modifica una pista                                   | id (pista), nombre, precio_luz, precio_pista
| POST          | eliminarPista/  | Elimina una pista                                    | id (pista)
| POST          | nuevaPista/     | Crea una pista asociada a un derporte                | nombre, id_deporte
| POST          | pistasAdmin/    | Lista todas las pistas                               | id (pista)
| POST          | reserva/        | Crea un nueva Reserva                                | id_usuario, id_pista, id_hora, fecha_pista, luz, anulado
| POST          | reservasUsuario/| Lista todas las reservas de un user                  | id_usuario
| GET           | reservasAdmin/  | Lista todas las reservas de todos los users          | null
| PUT           | anularReserva/  | Anula una reserva                                    | id_reserva
| GET           | usuarios/       | Lista los usuarios                                   | null
| POST          | login/          | Confirma credenciales del usuario                    | mail, password
| GET           | estadísticas/   | Genera y devuelve un json con datos estadísticos     | null



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
- [Moment](http://momentjs.com/): Parsea, manipula y muestra fechas
- [Sha1](https://github.com/pvorb/node-sha1): Creación de arlgoritmo de cifrado Sha1 para la contraseña de los usuarios
- [Backbone.localstorage](https://www.npmjs.com/package/backbone.localstorage): Librería que facilita el uso de localstorege de HTML5 desde javascript
- [jQuery](https://jquery.com/): Libreria cross-browsing y dependencia de Backbone para peticiones Ajax
- [JQuery UI](https://jqueryui.com/): Capa de Front interactiva usada para el calendario

El resultado final del javascript del proyecto será un único javacript concatenado, ofuscado y minificado en el archivo `./js/app.min.js` con todas las dependencias de producción así como la lógica desarrollada. Gracias a esto conseguimos que toda la lógica que necesita la aplicación esté contenida en una única petición al servidor optimizando así la carga de la aplicación que podría llegar a ser servida de forma distribuída por un CDN tipo Amazon S3 y optimizar aun más el proyecto, aunque no se contempla en esta primera fase armar una arquitectura de alta disponibilidad.


#### 3. ENTORNO DE DESAROLLO

El entorno de desarrollo se ha creado orientado a la automatización de tareas. Esto conlleva una inversión de tiempo inicial muy notable pero nos brinda la seguridad de la eliminación de errores humanos durante los procesos de deploy o desarrollo u inyección de dependencias.


	- a. Dependencias de desarrollo
	- b. Control de versiones
	- c. Automatización de tareas


###### a. Dependencias de desarrollo

A continuación listamos todo el software y librerías utilizadas para el proceso desarrollo del proyecto.

- [SublimeText](http://www.sublimetext.com/): IDE de desarrollo
- [Git](https://github.com/): Control de Versiones
- [PhpMyAdmin](http://www.phpmyadmin.net/home_page/index.php): Gestor de Bases de Datos
- [Nodejs](https://nodejs.org/): Chrome's JavaScript runtime
- [Grunt](http://gruntjs.com): Ejecutor de Tareas programadas
- [grunt-browserify](https://www.npmjs.com/package/grunt-browserify): Inyección de dependencias de Javascript
- [Grunt-contrib-clean](https://www.npmjs.com/package/grunt-contrib-clean): Borra directorios
- [Grunt-contrib-copy](https://www.npmjs.com/package/grunt-contrib-copy): Copia archivos entre directorios
- [Grunt-contrib-cssmin](https://www.npmjs.com/package/grunt-contrib-cssmin): Minifica los archivos css
- [Grunt-contrib-stylus](https://www.npmjs.com/package/grunt-contrib-stylus): Precompilados de stylus css
- [Grunt-contrib-uglify](https://www.npmjs.com/package/grunt-contrib-uglify): Minifica y Concatena archivos javascript
- [Grunt-open](https://www.npmjs.com/package/grunt-open): Abre un directorio en el navegador
- [Grunt-ssh](https://www.npmjs.com/package/grunt-ssh): Abre una conexión con el servidor para la subida de archivos por sftp o ssh
- [Grunt-replace](https://www.npmjs.com/package/grunt-replace): Sustituye strings de archivos mediante expresiones regulares
- [Grunt-contrib-watch](https://www.npmjs.com/package/grunt-contrib-watch): Observa cambios sobre los archivos para recompilar automáticamente


###### b. Control de Versiones

El control de versiones es un sistema que registra los cambios realizados sobre un archivo o conjunto de archivos a lo largo del tiempo, de modo que puedas recuperar versiones específicas más adelante.

Te permite revertir archivos a un estado anterior, revertir el proyecto entero a un estado anterior, comparar cambios a lo largo del tiempo, ver quién modificó por última vez algo que puede estar causando un problema, quién introdujo un error y cuándo, y mucho más. Usar un VCS también significa que si fastidias o pierdes archivos, puedes recuperarlos fácilmente. Además, obtienes todos estos beneficios a un coste muy bajo.

Instantáneas, no diferencias
La principal diferencia entre Git y cualquier otro VCS (Subversion y compañía incluidos) es cómo Git modela sus datos. Conceptualmente, la mayoría de los demás sistemas almacenan la información como una lista de cambios en los archivos. Estos sistemas (CVS, Subversion, Perforce, Bazaar, etc.) modelan la información que almacenan como un conjunto de archivos y las modificaciones hechas sobre cada uno de ellos a lo largo del tiempo.

Git no modela ni almacena sus datos de este modo. En cambio, Git modela sus datos más como un conjunto de instantáneas de un mini sistema de archivos. Cada vez que confirmas un cambio, o guardas el estado de tu proyecto en Git, él básicamente hace una foto del aspecto de todos tus archivos en ese momento, y guarda una referencia a esa instantánea. Para ser eficiente, si los archivos no se han modificado, Git no almacena el archivo de nuevo — sólo un enlace al archivo anterior idéntico que ya tiene almacenado como podemos ver en la siguiente imagen.

Esta es una diferencia muy importante entre Git y prácticamente todos los demás VCSs. Hace que Git reconsidere casi todos los aspectos del control de versiones que muchos de los demás sistemas copiaron de la generación anterior. Esto hace a Git más como un mini sistema de archivos con algunas herramientas tremendamente potentes construidas sobre él, más que como un VCS.

![alt text][logo4]

[logo4]: https://github.com/ilopezchamorro/pfc/blob/master/git1.png "Modelo de Datos Git"



- Integridad de git

Todo en Git es verificado mediante una suma de comprobación antes de ser almacenado, y es identificado a partir de ese momento mediante dicha suma (checksum en inglés). Esto significa que es imposible cambiar los contenidos de cualquier archivo o directorio sin que Git lo sepa. Esta funcionalidad está integrada en Git al más bajo nivel y es parte integral de su filosofía. No puedes perder información durante su transmisión o sufrir corrupción de archivos sin que Git sea capaz de detectarlo.

El mecanismo que usa Git para generar esta suma de comprobación se conoce como hash SHA-1. Se trata de una cadena de 40 caracteres hexadecimales (0-9 y a-f), y se calcula en base a los contenidos del archivo o estructura de directorios en Git. Un hash SHA-1 tiene esta pinta:

24b9da6552252987aa493b52f8696cd6d3b00373
Verás estos valores hash por todos lados en Git, ya que los usa con mucha frecuencia. De hecho, Git guarda todo no por nombre de archivo, sino en la base de datos de Git por el valor hash de sus contenidos.

- Estados de Git


Ahora presta atención. Esto es lo más importante a recordar acerca de Git si quieres que el resto de tu proceso de aprendizaje prosiga sin problemas. Git tiene tres estados principales en los que se pueden encontrar tus archivos: confirmado (committed), modificado (modified), y preparado (staged). Confirmado significa que los datos están almacenados de manera segura en tu base de datos local. Modificado significa que has modificado el archivo pero todavía no lo has confirmado a tu base de datos. Preparado significa que has marcado un archivo modificado en su versión actual para que vaya en tu próxima confirmación.

Esto nos lleva a las tres secciones principales de un proyecto de Git: el directorio de Git (Git directory), el directorio de trabajo (working directory), y el área de preparación (staging area).

![alt text][logo5]

[logo5]: https://github.com/ilopezchamorro/pfc/blob/master/git2.png "Estados de Git"

El directorio de Git es donde Git almacena los metadatos y la base de datos de objetos para tu proyecto. Es la parte más importante de Git, y es lo que se copia cuando clonas un repositorio desde otro ordenador.

El directorio de trabajo es una copia de una versión del proyecto. Estos archivos se sacan de la base de datos comprimida en el directorio de Git, y se colocan en disco para que los puedas usar o modificar.

El área de preparación es un sencillo archivo, generalmente contenido en tu directorio de Git, que almacena información acerca de lo que va a ir en tu próxima confirmación. A veces se denomina el índice, pero se está convirtiendo en estándar el referirse a ello como el área de preparación.

El flujo de trabajo básico en Git es algo así:

Modificas una serie de archivos en tu directorio de trabajo.
Preparas los archivos, añadiendo instantáneas de ellos a tu área de preparación.
Confirmas los cambios, lo que toma los archivos tal y como están en el área de preparación, y almacena esa instantánea de manera permanente en tu directorio de Git.
Si una versión concreta de un archivo está en el directorio de Git, se considera confirmada (committed). Si ha sufrido cambios desde que se obtuvo del repositorio, pero ha sido añadida al área de preparación, está preparada (staged). Y si ha sufrido cambios desde que se obtuvo del repositorio, pero no se ha preparado, está modificada (modified).



###### c. Automatización de Tareas


El Universo entero tiende a la complejidad y el caos, y los proyectos de software, lejos de ser una excepción, confirman y aceleran esta tendencia cosmogónica. Y a medida que se amplían en alcance, complejidad o equipo, también crece el esfuerzo necesario para mantenerlos, evolucionarlos y desplegarlos tras cada nueva versión.

Parte de este esfuerzo proviene del conflicto existente entre las prioridades del proyecto en su entorno de desarrollo, donde prima la ergonomía del desarrollador y la legibilidad del código, y las características que ha de tener la aplicación ya publicada, donde esto se convierte en irrelevante y se prioriza la eficiencia y la economía de recursos.

Muchos frameworks de desarrollo web incorporan mecanismos más o menos transparentes al desarrollador para —por ejemplo— concatenar y minimizar scripts y hojas de estilos. De este modo el programador puede trabajar con componentes modulares y ficheros optimizados para la legibilidad, que son transformados al vuelo en versiones optimizadas para la velocidad de descarga o de interpretación.

Pero a medida que el proyecto gana en complejidad o en requisitos de eficiencia esta facilidad puede resultar insuficiente. Pongamos otro ejemplo: para trabajar con iconos un diseñador puede preferir trabajar con una miríada de ficheros independientes generados en lotes por su herramienta de diseño favorita y que le resultan fáciles de mantener. Y unos metros más allá su compañero desarrollador o administrador de sistemas puede ver con terror como esta práctica dispara las peticiones HTTP necesarias para servir la página, y con ello el consumo de recursos y el tiempo de transferencia.

¿Cómo resolver este conflicto? En los últimos dos o tres años están cobrando relevancia algunas herramientas dirigidas a programadores y que podríamos denominar de automatización de tareas o de compilación de proyectos (frontend build tools, developer automation tools, task runners o streaming build systems). Se trata fundamentalmente de Grunt (2012), que mantiene con Gulp (2013) un interesante duelo por el favor de los desarrolladores, y GNU Make (1977. Sí: mil novecientos setenta y siete), la popular y casi omnipotente utilidad del mundo Unix.

Más allá de las diferencias conceptuales o técnicas, la idea detrás de estas herramientas es común y sencilla: automatizar la ejecución de tareas repetitivas con la finalidad de transformar un proyecto de su forma óptima para desarrollo a su forma óptima para publicación o despliegue.

Un ejemplo probablemente común en proyectos online que han adquirido una cierta complejidad podría ser un workflow consistente en todas o algunas de las siguientes tareas:

- Linting de código, particularmente JavaScript.
- Optimización de las imágenes del proyecto, recortando, recomprimiendo, ajustando la calidad o realizando conversiones de formato.
- Minimización o conversión de ficheros de tipografía.
- Generación de una hoja de sprites a partir de ficheros con iconos independientes.
- Compilación de ficheros Sass, Less, CoffeScript…
- Ejecución de tests unitarios, de integración o de usuario (Selenium).
- Comprobación automática de enlaces rotos.
- Supresión de comentarios y compactación de la salida.
- Generación automática de documentación o APIs a partir del código.
- Validación semántica de lenguajes W3C.
- Concatenación y minimización de scripts u hojas de estilos.
- Vaciado (flush) de cachés.
- Despliegue automático en producción.

El coste de tener que realizar manualmente estas tareas puede ser inasumible, especialmente en proyectos con un desarrollo ágil, iteraciones frecuentes y muchas versiones y publicaciones. Esta es la dificultad que tratan de resolver las herramientas descritas. En ningún orden en particular:

Grunt, originaria del mundo de JavaScript, implementa una filosofía basada en configuración mejor que programación, y sus numerosísimos plugins facilitan las tareas más frecuentes y minimizan la curva de aprendizaje.

GNU Make, la herramienta con que nuestros abuelos compilaban sus programas Fortran en pantallas de fósforo verde, goza de excelente salud y proporciona a los usuarios más fieles a la filosofía Unix workflows potentes y flexibles desde una herramienta estándar y casi universal.

# TUTORIAL DE INSTALACIÓN Y USO

En este punto vamos a describir paso por paso cómo armar el proyecto en local desde cero para poder desarrollar y cómo se crean deploys a producción:

	- 1. LAMP STACK
	- 2. Git
	- 3. Nodejs


## 1. LAMP STACK

Para este proyecto necesitamos tener instalado en nuestro sistema un entorno LAMP.

LAMP es el acrónimo usado para describir un sistema de infraestructura de internet que usa las siguientes herramientas:

- Linux, el sistema operativo; En algunos casos también se refiere a LDAP.
- Apache, el servidor web;
- MySQL/MariaDB, el gestor de bases de datos;
- Perl, PHP, o Python, los lenguajes de programación.

La combinación de estas tecnologías es usada principalmente para definir la infraestructura de un servidor web, utilizando un paradigma de programación para el desarrollo.

Existen distinas maneras de lograrlo, se puede instalar de forma nativa en el sistemao bien utilizar alguna herramienta como XAMP.

XAMPP es un servidor independiente de plataforma, software libre, que consiste principalmente en la base de datos MySQL, el servidor web Apache y los intérpretes para lenguajes de script: PHP y Perl. El nombre proviene del acrónimo de X (para cualquiera de los diferentes sistemas operativos), Apache, MySQL, PHP, Perl.

XAMPP solamente requiere descargar y ejecutar un archivo ZIP, tar , exe o fkl, con unas pequeñas configuraciones en alguno de sus componentes que el servidor Web necesitará. XAMPP se actualiza regularmente para incorporar las últimas versiones de Apache/MySQL/PHP y Perl. También incluye otros módulos como OpenSSL y phpMyAdmin. Para instalar XAMPP se requiere solamente una pequeña fracción del tiempo necesario para descargar y configurar los programas por separado.

Puesto que para este caso quién sepa hacerlo de forma nativa no necesitaría un tutorial por nuestra parte pasamos a indicar los pasos para instalar XAMPP.

Primero de todo se ha de Descargar e instalar XAMPP

- [XAMPP](https://www.apachefriends.org/download.html#641): Descargar XAMPP

NOTA: Dar al archivo botón derecho y ejecutar con persmisos de administrador.

Seguir los pasos de instalación y siempre verificar que se instala tanto PHP como MYSQL, el resto de opciones son opcionales.

![alt text][xamp1]

[xamp1]: https://github.com/ilopezchamorro/pfc/blob/master/xampp01.jpg

![alt text][xamp2]

[xamp2]: https://github.com/ilopezchamorro/pfc/blob/master/xampp02.jpg

Al terminar la instalación arrancar el programa de nuevo en modo ejecutar con permisos de administrador y seleccionar los módulos y arrancar los servicios de PHP y MySQL

![alt text][xamp4]

[xamp4]: https://github.com/ilopezchamorro/pfc/blob/master/xampp04.jpg

Ahora ya tenemos instalado un servidor web y phpmyadmin para poder accerder a base de datos de una manera sencilla.


## 2. Git

Instalar Git en Windows es muy fácil. El proyecto msysGit tiene uno de los procesos de instalación más sencillos. Simplemente descarga el archivo exe del instalador desde la página de GitHub, y ejecútalo:

- [GIT](http://msysgit.github.io/): Descargar GIT

Una vez instalado, tendrás tanto la versión de línea de comandos (incluido un cliente SSH que nos será útil más adelante) como la interfaz gráfica de usuario estándar.

Nota para el uso en Windows: Se debería usar Git con la shell provista por msysGit (estilo Unix), si por cualquier razón se necesitara usar la shell nativa de Windows, la consola de línea de comandos, se han de usar las comillas dobles en vez de las simples (para parámetros que contengan espacios) y se deben entrecomillar los parámetros terminándolos con el acento circunflejo (^) si están al final de la línea, ya que en Windows es uno de los símbolos de continuación.


## 3. Nodejs

Para poder utilizar todas las herramientas de automatización necesitamos tener instalado el motor V8 de Chrome que nos brinda Node para poder ejecutar Javascript del lado del servidor, es un intérprete de comandos gracias al cual no necesitamos estar dentro de un navegador para poder ejecutar Javascript.

Si no tienes instalado todavía Node.JS el proceso es bastante fácil. Por supuesto, todo comienza por dirigirse a la página de inicio de NodeJS:


- [Node.js](https://nodejs.org/): Descargar NODE

Allí encontrarás el botón para instalarlo "Install" que pulsas y simplemente sigues las instrucciones.

Los procesos de instalación son sencillos y ahora los describimos. Aunque son ligéramente distintos de instalar dependiendo del sistema operativo, una vez lo tienes instalado, el modo de trabajo con NodeJS es independiente de la plataforma y teóricamente no existe una preferencia dada por uno u otro sistema, Windows, Linux, Mac, etc. Sin embargo, dependiendo de tu sistema operativo sí puede haber unos módulos diferentes que otros, ésto es, unos pueden funcionar en Linux y no así en otros sistemas, y viceversa.

***

##### YA TENEMOS INSTALADO TODO LO NECESARIO PARA TRABAJAR CON EL PROYECTO AHORA PASAMOS A CONFIGURAR EL ENTORNO, OBTENER EL CÓDIGO Y EJECUTARLO.

***

	- Configurar un Dominio Local
	- Hola Consola de Comandos
	- Algunos comandos Básicos
	- Configurando Git
	- Descargando el código desde Github
	- Crear Base de Datos
	- Grunt
	- Npm
	- Bower
	- Configuración de credenciales
	- Comandos automatizados



##### Configurar un Dominio Local


Antes de empezar definamos qué es un virtual host (también llamado host virtual): consiste en poder alojar múltiples dominios en una sola máquina.

¿En dónde son utilizados? Son utilizados en ambientes de desarrollos, por lo que solo funcionan de manera local.


Empecemos:

###### Paso 1:

Lo primero que debemos hacer es crear el directorio donde alojaremos nuestros virtual hosts que contendrá el código, por ejemplo en la carpeta principal de documentos de xammp

```console
C:/xampp/htdocs/pfc
````

Dentro de esta carpeta es donde guardaremos nuestros proyectos.


###### Paso 2:

Lo siguiente que debemos  hacer es dirigirnos a C:\WINDOWS\system32\drivers\etc\ y modificar el archivo hosts, pero para modificar el archivo necesitamos permisos de administrador por lo que primero abrimos el Bloc de Notas como administrador y abrimos la siguiente dirección C:\WINDOWS\system32\drivers\etc\hosts.

Nos aparecerá de esta manera el archivo:

Hosts

![alt text][hosts]

[hosts]: https://github.com/ilopezchamorro/pfc/blob/master/hosts.png


En este archivo agregamos nuestro host virtual, para agregarlo lo hacemos de la siguiente manera:

````console
IP               Nombre de Host
````

Entonces nosotros agregaremos nuestros host apuntado a 127.0.0.1 que es la dirección IPv4 de la maquina local, y después el nombre de nuestro hosts. Podemos agregar los host que deseemos pero siempre apuntando a 127.0.0.1


````console
127.0.0.1        pfc.dev
````

NOTA: Usamos pfc.dev pero podría ser cualquiera otro, lo único que esta dirección será la que habrá que meter en el navegador para que apunte a nuestro site local.


###### Paso 3:

Ahora debemos modificar el archivo de configuración de Apache, para incluir el archivo de configuración de virtual host, lo podemos abrir de igual manera con un bloc de notas.

En XAMPP, la ruta será la siguiente: C:\xampp\apache\conf\httpd.conf

Lo siguiente es buscar las siguientes dos líneas que están resaltadas:

Virtual host

Elimínese el # de la segunda línea.

Además dentro del mismo archivo debemos asegurarnos de que el módulo Rewrite está habilitado, para ello buscamos la siguiente línea:

![alt text][hosts2]

[hosts2]: https://github.com/ilopezchamorro/pfc/blob/master/httpd.conf_.png


````console
httpd.conf
LoadModule rewrite_module modules/mod_rewrite.so
```

Y nos aseguramos de que no esté comentada (el signo de numeral # sirve para comentar líneas), si no tiene el signo quiere decir que ya está habilitada.

Realizado esto guardamos los cambios.

###### Paso 4:

Lo siguiente es abrir el archivo de configuración que nos provee XAMPP, de igual manera lo podemos editar con un Bloc de Notas.

Si están en XAMPP, la ruta será la siguiente: `C:\xampp\apache\conf\extra\httpd-vhosts.conf


![alt text][hosts3]

[hosts3]: https://github.com/ilopezchamorro/pfc/blob/master/hosts2.png


Es en este archivo donde alojaremos cada uno de los host virtuales que creemos, en esta caso nos valdrá con pegar este ya configurado para nuestro proyecto:

````
<VirtualHost *:80>
    ServerAdmin webmaster@pfc.com
    DocumentRoot c:\xampp\htdocs\pfc\dev
    ServerName pdf.dev
    <Directory "c:\xampp\htdocs\pfc\dev">
	Options Indexes FollowSymLinks
	Order allow,deny
	Allow from all
   </Directory>
</VirtualHost>
````

Recuerda reemplazar `c:\xampp\htdocs\pfc\dev` y `pfc.dev` con tu directorio y dominio local en caso de que hayas establecido uno diferente.


	Nota: si te ha tocado cambiar el puerto donde escucha Apache que por defecto es 80 a otro puerto (ejemplo: 8080), en ese caso ese el número de puerto que debes de poner en el encabezado de Virtual Host ejemplo: <VirtualHost *:8080>

Realizado todo esto procedemos a  guardar nuestro archivo, y ahora nos toca reiniciar Apache, y probar el acceso al host virtual en el explorador en el caso de este ejemplo la dirección sería:

````console
http://pfc.dev
````

##### Hola Consola de Comandos

Abrimos en modo Ejecutar como Administrador la consola de git, GIT BASH que hemos instalado antes junto con Git.
Esta consola tipo Unix, la usaremos para ejecutar los comandos necesarios para el desarrollo del proyecto así como para gestionar el control de versiones con Git.

###### Algunos comandos Básicos:

- Para saltar una carpeta hacia arriba al ser estilo Unix sería: `cd ..`
- Para saber en qué carpeta estamos: `pwd`
- Para listar los archivos en la carpeta dónde nos encontramos: `ls`
- Para crear una carpeta: `mkdir`
- Borrar `rm`
- Mover `mv`
- Copy paste `cp`
- Ir a Carpeta de usuario (home) `cd ~/`
- Ir a la raiz del ordenador `cd /`

##### Descargando el código desde Github

Para descargar el código nos dirigimos a Github que es el repositorio donde lo tenemos guardado y donde lo estamos versionando. Por motivos de perfomance solo se guarda el código de desarrollo, los pases a producción se generarán al vuelo mediante comandos automatizados.

`https://github.com/ilopezchamorro/pfc`

Con la consola abierta lo primero es posicionarse en la carpeta que deseamos generar el código

`cd c:`

`cd xampp/htdocs/pfc/dev`

Una vez colocados en esta capeta hay que clonar el repositorio. Para esto ejecutamos el siguiente comando y se descagará de forma automática el código.

`git clone https://github.com/ilopezchamorro/pfc.git .`

NOTA: al final ponemo un punto, esto significa que nos descargue el código "aquí" (en esta carpeta) si no idicamos esto nos creará una carpeta padre y habría que cambiar el vhost que acabamos de configurar previamente.


	Ya tenemos el código en nuestro ordenador !!!!


##### Crear Base de Datos

Lo siguiente será crear la BAse de Datos necesaria para el funcionamiento del poryecto.

Para crear la base de datos simplemente vamos a introducir en el navegador la siguiente ruta:

`http://localhost/phpmyadmin`

Esto nos dará acceso a PhpMyAdmin, un gestor de base de datos visual.

Si no le has dado credenciales específicas lo normal es que por defecto use:

````
User: root
Pass: (vacío, ninguna pass asignada)
Host: localhost
````
no necesitarás cambiarlas para trabajar de forma local.

Una vez dentro tan solo debes crear una nueva base de datos con el nombre que queramos.

Despues pinchar en Importar, e importar el archivo `sql.sql` que está en la raiz del proyecto y la estructura de base de datos ya estará lista para trabajar, el sql que acabamos de importar ha generado nuestra base de datos.


###### ¿Por qué aun no puedo ver el proyecto en el nevegador?

Si apreciamos hemos puesto una ruta que aun no existe para el virtual host. `c:/xampp/htdocs/pfc/dev`

La carpeta dev la generará la aplicación al vuelo cuando ejecutemos los comandos para desarrollo.

##### Grunt

Necesitaremos instalar la línea de comandos de Gunt para que podamos ejecutarlos.

En la consola de comandos (ejecutada en modo administrador):

`npm install -g grunt-cli`

Esto nos instala la línea de comandos de grunt de forma global en nuestro pc (tendremos acceso desde cualquier carpeta) gracias a `-g`


##### Npm

Node Package Modules. Es un repositorio de librerías de javascript.

Existe un archivo `package.json` en el que figuran todas las dependencias de desarrollo y de ejecución de javascript que no hacen falta versionar ya que pueden obtenerse desde el repositorio oficial ejecutando un solo comando, detectará qué librerías en qué versión queremos ya que lo tenemos configurado en dicho archivo.

Puede llevar un un rato instalarlo todo hata que descarga todas las librerías pero solo lo tendremos que realizar una vez, para esto ejecutar en la consola en modo administrador:

`npm install`

Automáticamente descagará todo lo necesario.

##### Bower

Bower es otro gestor de dependencias espécifico para front, en en se encuentran librerías que no son solo javascript sino también de css. Para este proyecto hemos utilizado un 2reset2 de estilo para igualar a todos los navegadores llamado Normalize. Como es CSS no está disponible en NPM así que usaremos Bower para instalarla.

Simplemente ejecutar el siguiente comando:

`bower install`


##### Configuración de credenciales

En la raíz del poryecto viene un archivo `secret.json.example`

````json
{
	"sftp":{
		"host" : "yourHost",
	    "username" : "yourUser",
	    "password" : "**********"
	},
	"mysql":{
		"dev":{
			"dbname": "dbname",
			"user" : "root",
		    "pass" : "**********",
		    "host" : "localhost"
		},
		"pro":{
			"dbname": "dbname",
			"user" : "exampleUser",
		    "pass" : "**********",
		    "host" : "localhost"
		}
	}
}
````
Sustituir los valores por los correctos y guardar el archivo con el nombre: `secret.json`

Este archivo nunca será versionado para no comprometer la seguridad.

"sftp": credenciales para subir el código al servidor de producción de forma atomática.
"mysql": credeciales de la base de datos en dos versiones:

"dev": credenciales Base de Datos de desarrollo
"pro": credenciales de la Base de Datos de producción

##### Comandos automatizados

Ahora sí estamos listos para intereactuar con el proyecto. Si no has tenido errores durante la instalación ahora simplemente hay 3 comándos básicos que puedes ejecutar para usar el proyecto:


- Desarrollo:

`grunt`

Crea una caperta dev/, ejecuta browserify para inyección de dependencias de javascript, después compila y minifica javascript, después minifica y concatena CSS, mueve todos los archivos necesarios desde src hasta dev, abre la url en el navegador y se queda escuchando cambios en código para relanzar todo el proceso de forma automática al guardar un cambio y cambia las credenciales con las encontradas en el archivo secret.json de dev

- Generar código entregable:

`grunt build`

Genera un entregable en un carpeta Build/ con todo el código listo para ejecutarse con las credenciales de pro.

- Pase a producción:

`grunt deploy`

Hace los mismo que el comando anterior pero además lo sube al servidor de producción los archivos.



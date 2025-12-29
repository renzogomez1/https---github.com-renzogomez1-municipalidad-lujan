<?php
session_start();
session_unset();   // Limpia todas las variables
session_destroy(); // Elimina la sesión

echo "OK";
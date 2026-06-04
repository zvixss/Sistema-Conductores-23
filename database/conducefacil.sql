-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 04-06-2026 a las 05:43:40
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `conducefacil`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `examenes`
--

CREATE TABLE `examenes` (
  `id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `tipo_examen` varchar(50) NOT NULL,
  `fecha` date NOT NULL,
  `hora` time NOT NULL,
  `estado` enum('pendiente','confirmado','cancelado','realizado') DEFAULT 'pendiente',
  `fechaCreacion` timestamp NOT NULL DEFAULT current_timestamp(),
  `id_municipalidad` int(11) DEFAULT NULL,
  `resultado` enum('pendiente','aprobado','reprobado') DEFAULT 'pendiente'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `examenes`
--

INSERT INTO `examenes` (`id`, `usuario_id`, `tipo_examen`, `fecha`, `hora`, `estado`, `fechaCreacion`, `id_municipalidad`, `resultado`) VALUES
(2, 2, 'Primera Licencia Clase B', '2026-06-10', '08:30:00', 'pendiente', '2026-06-03 22:03:01', 10, 'pendiente'),
(3, 2, 'Primera Licencia Clase B', '2026-06-04', '09:15:00', 'pendiente', '2026-06-04 00:25:04', 10, 'pendiente'),
(4, 2, 'Primera Licencia Clase B', '2026-06-08', '10:00:00', 'pendiente', '2026-06-04 00:51:43', 10, 'pendiente'),
(5, 2, 'Primera Licencia Clase B', '2026-09-16', '13:15:00', 'pendiente', '2026-06-04 00:53:11', 10, 'pendiente'),
(6, 2, 'Ampliación de Licencia', '2026-06-30', '11:45:00', 'pendiente', '2026-06-04 02:06:04', 10, 'pendiente');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `licencias`
--

CREATE TABLE `licencias` (
  `id_licencia` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `clase` varchar(10) NOT NULL,
  `fecha_emision` date NOT NULL,
  `fecha_vencimiento` date NOT NULL,
  `estado` enum('vigente','vencida','suspendida') DEFAULT 'vigente'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `licencias`
--

INSERT INTO `licencias` (`id_licencia`, `usuario_id`, `clase`, `fecha_emision`, `fecha_vencimiento`, `estado`) VALUES
(1, 2, 'Clase B', '2025-06-01', '2031-06-01', 'vigente');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `municipalidades`
--

CREATE TABLE `municipalidades` (
  `id_municipalidad` int(11) NOT NULL,
  `nombre_municipalidad` varchar(150) NOT NULL,
  `comuna` varchar(100) NOT NULL,
  `direccion` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `municipalidades`
--

INSERT INTO `municipalidades` (`id_municipalidad`, `nombre_municipalidad`, `comuna`, `direccion`) VALUES
(1, 'Municipalidad de Santiago', 'Santiago', 'Plaza de Armas S/N'),
(2, 'Municipalidad de Maipu', 'Maipu', 'Av. Pajaritos 2077'),
(3, 'Municipalidad de Puente Alto', 'Puente Alto', 'Concha y Toro 1820'),
(4, 'Municipalidad de Arica', 'Arica', 'Rafael Sotomayor 415'),
(5, 'Municipalidad de Iquique', 'Iquique', 'Aníbal Pinto 50'),
(6, 'Municipalidad de Antofagasta', 'Antofagasta', 'Av. Séptimo de Línea 3505'),
(7, 'Municipalidad de Copiapó', 'Copiapó', 'Chacabuco 857'),
(8, 'Municipalidad de La Serena', 'La Serena', 'Arturo Prat 451'),
(9, 'Municipalidad de Calama', 'Calama', 'Granaderos 3636'),
(10, 'Municipalidad de Valparaíso', 'Valparaíso', 'Condell 1490'),
(11, 'Municipalidad de Viña del Mar', 'Viña del Mar', 'Arlegui 615'),
(12, 'Municipalidad de Rancagua', 'Rancagua', 'Plaza de los Héroes 445'),
(13, 'Municipalidad de Talca', 'Talca', '1 Sur 790'),
(14, 'Municipalidad de Chillán', 'Chillán', '18 de Septiembre 510'),
(15, 'Municipalidad de Concepción', 'Concepción', 'O\'Higgins 525'),
(16, 'Municipalidad de Temuco', 'Temuco', 'Arturo Prat 650'),
(17, 'Municipalidad de Valdivia', 'Valdivia', 'Independencia 455'),
(18, 'Municipalidad de Puerto Montt', 'Puerto Montt', 'San Felipe 80'),
(19, 'Municipalidad de Coyhaique', 'Coyhaique', 'Condell 434'),
(20, 'Municipalidad de Punta Arenas', 'Punta Arenas', 'Plaza Muñoz Gamero 745');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `notificaciones`
--

CREATE TABLE `notificaciones` (
  `id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `titulo` varchar(100) DEFAULT NULL,
  `mensaje` text DEFAULT NULL,
  `leido` tinyint(1) DEFAULT 0,
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp(),
  `tipo` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `notificaciones`
--

INSERT INTO `notificaciones` (`id`, `usuario_id`, `titulo`, `mensaje`, `leido`, `fecha_creacion`, `tipo`) VALUES
(1, 2, 'Examen Próximo', 'Su examen será dentro de 7 días.', 0, '2026-06-04 01:11:11', 'recordatorio_7'),
(2, 2, 'Examen Mañana', 'Su examen será mañana a las 09:15:00', 0, '2026-06-04 01:11:11', 'recordatorio_1');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombreUsuario` varchar(50) NOT NULL,
  `rut` varchar(12) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `telefono` varchar(10) NOT NULL,
  `region` varchar(100) NOT NULL,
  `comuna` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `rol` enum('usuario','admin') NOT NULL DEFAULT 'usuario',
  `fechaRegistro` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombreUsuario`, `rut`, `correo`, `telefono`, `region`, `comuna`, `password`, `rol`, `fechaRegistro`) VALUES
(1, 'Pedro Pascal', '19475834-k', 'Pedrito@gmail.com', '734512357', 'Antofagasta', 'Antofagasta', '$2b$10$0XOhA1HZwdSPusJqlHJn0u2SM81qEszlqcj6NXJV1rtGnVTBTp3TS', 'usuario', '2026-06-01 02:04:43'),
(2, 'Alex Parada', '21551582-6', 'test@gmail.com', '123456789', 'Valparaíso', 'Valparaíso', '$2b$10$m/p3ziA4Z5DNcd.6TXgYIeWmQvuRTmR3JzmMBwze.4mfAKt2WlA3y', 'admin', '2026-06-01 23:23:05');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `examenes`
--
ALTER TABLE `examenes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario_id` (`usuario_id`),
  ADD KEY `fk_examen_municipalidad` (`id_municipalidad`);

--
-- Indices de la tabla `licencias`
--
ALTER TABLE `licencias`
  ADD PRIMARY KEY (`id_licencia`),
  ADD KEY `usuario_id` (`usuario_id`);

--
-- Indices de la tabla `municipalidades`
--
ALTER TABLE `municipalidades`
  ADD PRIMARY KEY (`id_municipalidad`);

--
-- Indices de la tabla `notificaciones`
--
ALTER TABLE `notificaciones`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario_id` (`usuario_id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombreUsuario` (`nombreUsuario`),
  ADD UNIQUE KEY `rut` (`rut`),
  ADD UNIQUE KEY `correo` (`correo`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `examenes`
--
ALTER TABLE `examenes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `licencias`
--
ALTER TABLE `licencias`
  MODIFY `id_licencia` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `municipalidades`
--
ALTER TABLE `municipalidades`
  MODIFY `id_municipalidad` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `notificaciones`
--
ALTER TABLE `notificaciones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `examenes`
--
ALTER TABLE `examenes`
  ADD CONSTRAINT `examenes_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_examen_municipalidad` FOREIGN KEY (`id_municipalidad`) REFERENCES `municipalidades` (`id_municipalidad`);

--
-- Filtros para la tabla `licencias`
--
ALTER TABLE `licencias`
  ADD CONSTRAINT `licencias_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `notificaciones`
--
ALTER TABLE `notificaciones`
  ADD CONSTRAINT `notificaciones_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

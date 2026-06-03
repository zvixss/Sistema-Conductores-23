-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 03-06-2026 a las 04:40:29
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
  `ubicacion` varchar(255) NOT NULL,
  `estado` enum('pendiente','confirmado','cancelado','realizado') DEFAULT 'pendiente',
  `fechaCreacion` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

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
  ADD CONSTRAINT `examenes_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

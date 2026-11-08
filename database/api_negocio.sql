-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Nov 08, 2026 at 06:31 AM
-- Server version: 8.4.3
-- PHP Version: 8.3.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `api_negocio`
--

-- --------------------------------------------------------

--
-- Table structure for table `detalle_pedido`
--

CREATE TABLE `detalle_pedido` (
  `iddetalle` int NOT NULL,
  `idpedido` int NOT NULL,
  `tamano` varchar(50) NOT NULL,
  `ingredientes` varchar(255) NOT NULL,
  `numPizzas` int NOT NULL,
  `subTotal` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `detalle_pedido`
--

INSERT INTO `detalle_pedido` (`iddetalle`, `idpedido`, `tamano`, `ingredientes`, `numPizzas`, `subTotal`) VALUES
(2, 8, 'Grande', 'Jamón, Piña, Champiñones', 4, 480.00),
(3, 9, 'Grande', 'Jamón, Piña', 1, 120.00);

-- --------------------------------------------------------

--
-- Table structure for table `pedidos`
--

CREATE TABLE `pedidos` (
  `idpedido` int NOT NULL,
  `nombreCompleto` varchar(100) NOT NULL,
  `direccion` varchar(150) NOT NULL,
  `telefono` varchar(20) NOT NULL,
  `fechaCompra` varchar(30) NOT NULL,
  `totalPedido` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `pedidos`
--

INSERT INTO `pedidos` (`idpedido`, `nombreCompleto`, `direccion`, `telefono`, `fechaCompra`, `totalPedido`) VALUES
(8, 'Diego Giovanni Quiroga Prado', 'León #123', '477 123 1234', '2026-11-08', 480.00),
(9, 'Juan Sanchez Lopez', 'hidalgo #123', '477 432 4321', '2026-11-08', 120.00);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `detalle_pedido`
--
ALTER TABLE `detalle_pedido`
  ADD PRIMARY KEY (`iddetalle`),
  ADD KEY `idpedido` (`idpedido`);

--
-- Indexes for table `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`idpedido`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `detalle_pedido`
--
ALTER TABLE `detalle_pedido`
  MODIFY `iddetalle` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `idpedido` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `detalle_pedido`
--
ALTER TABLE `detalle_pedido`
  ADD CONSTRAINT `detalle_pedido_ibfk_1` FOREIGN KEY (`idpedido`) REFERENCES `pedidos` (`idpedido`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

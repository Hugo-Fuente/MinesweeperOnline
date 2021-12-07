-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Tempo de geração: 05-Dez-2021 às 19:03
-- Versão do servidor: 8.0.21
-- versão do PHP: 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `minesweeper`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `jogador`
--

DROP TABLE IF EXISTS `jogador`;
CREATE TABLE IF NOT EXISTS `jogador` (
  `ncpf` varchar(20) NOT NULL,
  `username` varchar(15) NOT NULL,
  `nome` varchar(30) NOT NULL,
  `datanasc` date NOT NULL,
  `email` varchar(30) NOT NULL,
  `telefone` varchar(20) NOT NULL,
  `senha` varchar(20) NOT NULL,
  PRIMARY KEY (`ncpf`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Extraindo dados da tabela `jogador`
--

INSERT INTO `jogador` (`ncpf`, `username`, `nome`, `datanasc`, `email`, `telefone`, `senha`) VALUES
('07744814800', 'hugolino', 'Hugo Gomes de La Fuente', '1900-11-27', 'hugo@hugos', '37733773', '123abc'),
('123456', 'braum', 'Matheus B', '2013-12-11', 'mattew@brown', '12123434', 'mbraum'),
('88776655', 'zoio', 'Everston Olhos', '1420-02-04', '420@blaze', '66642069', '42069'),
('666', 'satan', 'satanas junior', '1666-06-06', 'diabo@hell', '666666', '666'),
('909090', 'ultimo', 'Ultimato Finale', '1998-08-11', 'ultimo@teste', '99998888', '123'),
('69696969', 'hauny', 'Hauny T', '1987-02-11', 'hauny@t', '69693333', '69420'),
('123457', 'pedrosa', 'Pedro Andrade', '1997-12-05', 'pedro@andrads', '3773', 'pedropedro');

-- --------------------------------------------------------

--
-- Estrutura da tabela `partida`
--

DROP TABLE IF EXISTS `partida`;
CREATE TABLE IF NOT EXISTS `partida` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cpf` varchar(30) NOT NULL,
  `dimensao` int NOT NULL,
  `qbombas` int NOT NULL,
  `modalidade` varchar(10) NOT NULL,
  `tempo` varchar(30) NOT NULL,
  `resultado` varchar(20) NOT NULL,
  `datahora` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Extraindo dados da tabela `partida`
--

INSERT INTO `partida` (`id`, `cpf`, `dimensao`, `qbombas`, `modalidade`, `tempo`, `resultado`, `datahora`) VALUES
(6, '07744814800', 5, 6, 'rivotril', '', '', '2021-12-04 23:12:11'),
(7, '07744814800', 6, 2, 'classica', '', '', '2021-12-04 23:17:37'),
(8, '69696969', 6, 7, 'rivotril', '3', 'ganhou', '2021-12-05 02:03:49'),
(9, '666', 8, 5, 'classica', '', '', '2021-12-05 14:33:49'),
(10, '07744814800', 3, 2, 'rivotril', '', '', '2021-12-05 14:36:18'),
(11, '666', 3, 2, 'classica', '', '', '2021-12-05 14:39:14'),
(13, '07744814800', 4, 5, 'rivotril', '2', 'ganhou', '2021-12-05 14:44:05'),
(14, '07744814800', 7, 6, 'classica', '', '', '2021-12-05 14:44:16'),
(15, '07744814800', 7, 7, 'rivotril', '2', 'ganhou', '2021-12-05 15:54:44'),
(16, '07744814800', 8, 8, 'classica', '2', 'ganhou', '2021-12-05 15:55:07'),
(17, '666', 6, 6, 'rivotril', '..', '..', '2021-12-05 15:56:27'),
(18, '07744814800', 3, 2, 'classica', '', '', '2021-12-05 15:57:08'),
(19, '07744814800', 1, 2, 'classica', '', '', '2021-12-05 16:01:01'),
(20, '07744814800', 4, 1, 'classica', '2', 'ganhou', '2021-12-05 16:49:22'),
(21, '666', 6, 6, 'rivotril', '3', 'perdeu', '2021-12-05 16:50:25'),
(22, '123457', 3, 2, 'rivotril', '3', 'perdeu', '2021-12-05 18:49:01'),
(23, '07744814800', 3, 2, 'rivotril', '3', 'perdeu', '2021-12-05 18:55:09');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

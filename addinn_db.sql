-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : dim. 09 fév. 2025 à 00:52
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `addinn_db`
--

-- --------------------------------------------------------

--
-- Structure de la table `contact`
--

CREATE TABLE `contact` (
  `id` int(11) NOT NULL,
  `Cin` varchar(10) NOT NULL,
  `np` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `telephone` varchar(20) NOT NULL,
  `tarea` text NOT NULL,
  `reponse` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `contact`
--

INSERT INTO `contact` (`id`, `Cin`, `np`, `email`, `telephone`, `tarea`, `reponse`, `created_at`) VALUES
(0, '12345678', 'AAA', 'AAA@GMAIL.COM', '87654321', 'QJZHFDHAZGEFHBQZJHFBVHCBHFA', 'OK', '2025-01-20 09:43:56'),
(0, '44441233', 'fff', 'aaaa@gmail.com', '76543212', 'JBFJHSDFBJHKVSR', 'refuser', '2025-01-23 11:28:12');

-- --------------------------------------------------------

--
-- Structure de la table `demandes_stage`
--

CREATE TABLE `demandes_stage` (
  `id` int(11) NOT NULL,
  `cin` varchar(20) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `tel` varchar(20) NOT NULL,
  `cv` varchar(255) NOT NULL,
  `lettre` varchar(255) NOT NULL,
  `convention` varchar(255) NOT NULL,
  `stage` varchar(50) NOT NULL,
  `project` varchar(255) NOT NULL,
  `date_submitted` timestamp NOT NULL DEFAULT current_timestamp(),
  `etat` enum('en attente','accepter','refuser') DEFAULT 'en attente',
  `remarque` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `demandes_stage`
--

INSERT INTO `demandes_stage` (`id`, `cin`, `nom`, `email`, `tel`, `cv`, `lettre`, `convention`, `stage`, `project`, `date_submitted`, `etat`, `remarque`) VALUES
(0, '12345678', 'AA', 'AAA@GMAIL.COM', '87654321', 'projects/678e1ab077161_lettre d\'affectation de stage.pdf', 'projects/678e1ab0773be_Convention de stage.pdf', 'projects/678e1ab077718_MANAR RAPPORT.pdf', 'init', 'Développement d\'une application de to-do list en ligne de commande', '2025-01-20 09:43:12', 'accepter', 'ok'),
(0, '22222334', 'BACCAR', 'myriam@gmail.com', '76543212', 'projects/6790fcc6188d3_Atelier08-tp-java-jdbc.pdf', 'projects/6790fcc618d89_Atelier08-tp-java-jdbc.pdf', 'projects/6790fcc619261_Chapitre4-cours-java-fts-methodes.pdf', 'pfe', 'Développement dun système de gestion de stock avec prédiction de la demande', '2025-01-22 14:12:22', 'en attente', NULL );

-- --------------------------------------------------------

--
-- Structure de la table `feedback`
--

CREATE TABLE `feedback` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `reponse` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `feedback`
--

INSERT INTO `feedback` (`id`, `name`, `email`, `message`, `reponse`, `created_at`) VALUES
(1, 'AA', 'AAA@GMAIL.COM', 'DVSLKEJGKZERQ', 'OK', '2025-01-20 09:41:10'),
(2, 'fff', 'aaaa@gmail.com', 'fcfdxdsx', 'aerfz', '2025-01-22 22:57:54');

-- --------------------------------------------------------

--
-- Structure de la table `projets`
--

CREATE TABLE `projets` (
  `id` int(11) NOT NULL,
  `cin` varchar(20) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `nprojet` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `etat` enum('EN ATTENTE','ACCEPTER','REFUSER') DEFAULT 'EN ATTENTE',
  `remarque` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `projets`
--

INSERT INTO `projets` (`id`, `cin`, `name`, `email`, `nprojet`, `description`, `etat`, `remarque`, `created_at`) VALUES
(0, '12345678', 'AA', 'AAA@GMAIL.COM', 'DD', 'DJNFKZJERNQNFBJHAEBFRHRBJH', 'ACCEPTER', 'OK', '2025-01-20 09:40:17');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `cin` varchar(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `role` enum('ADMIN','STAGIAIRE') DEFAULT 'STAGIAIRE',
  `image` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `cin`, `name`, `email`, `password`, `created_at`, `role`, `image`) VALUES
(0, '11111111', 'mohamed essid', 'mohamed.essid@addinn.com', 'mohamed123', '2025-01-20 10:34:44', 'ADMIN', 'uploads/homme.jpg'),
(0, '12345678', 'AA', 'AAA@GMAIL.COM', '123E', '2025-01-20 09:39:25', 'STAGIAIRE', 'uploads/homme.jpg'),
(0, '22222334', 'baccar ', 'myriam@gmail.com', 'aaa', '2025-01-21 17:47:36', 'STAGIAIRE', 'uploads/homme.jpg'),
(0, '44441233', 'fff', 'aaaa@gmail.com', 'zzz', '2025-01-21 18:09:49', 'STAGIAIRE', 'uploads/homme.jpg'),
(0, '87654321', 'BACCAR', 'myro@gmail.com', '1234MIRO', '2025-02-08 21:39:07', 'STAGIAIRE', 'uploads/homme.jpg');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `contact`
--
ALTER TABLE `contact`
  ADD PRIMARY KEY (`Cin`);

--
-- Index pour la table `demandes_stage`
--
ALTER TABLE `demandes_stage`
  ADD PRIMARY KEY (`cin`);

--
-- Index pour la table `feedback`
--
ALTER TABLE `feedback`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Index pour la table `projets`
--
ALTER TABLE `projets`
  ADD PRIMARY KEY (`email`),
  ADD KEY `cin` (`cin`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`cin`),
  ADD UNIQUE KEY `cin` (`cin`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `feedback`
--
ALTER TABLE `feedback`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `contact`
--
ALTER TABLE `contact`
  ADD CONSTRAINT `contact_ibfk_1` FOREIGN KEY (`Cin`) REFERENCES `users` (`cin`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `demandes_stage`
--
ALTER TABLE `demandes_stage`
  ADD CONSTRAINT `demandes_stage_ibfk_1` FOREIGN KEY (`cin`) REFERENCES `users` (`cin`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `feedback`
--
ALTER TABLE `feedback`
  ADD CONSTRAINT `feedback_ibfk_1` FOREIGN KEY (`email`) REFERENCES `users` (`email`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `projets`
--
ALTER TABLE `projets`
  ADD CONSTRAINT `projets_ibfk_1` FOREIGN KEY (`cin`) REFERENCES `users` (`cin`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

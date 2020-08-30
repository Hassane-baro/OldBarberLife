-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le :  mar. 28 avr. 2020 à 11:11
-- Version du serveur :  5.7.19
-- Version de PHP :  7.1.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `barberlife`
--

-- --------------------------------------------------------

--
-- Structure de la table `avisclient_ac`
--

DROP TABLE IF EXISTS `avisclient_ac`;
CREATE TABLE IF NOT EXISTS `avisclient_ac` (
  `id_ac` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` int(11) NOT NULL,
  `coiffeur_ac` int(11) NOT NULL,
  `commentaire_ac` varchar(200) DEFAULT NULL,
  `note_ac` float DEFAULT NULL,
  PRIMARY KEY (`id_ac`),
  KEY `FK user_ac` (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `categorie_cat`
--

DROP TABLE IF EXISTS `categorie_cat`;
CREATE TABLE IF NOT EXISTS `categorie_cat` (
  `id_cat` int(11) NOT NULL AUTO_INCREMENT,
  `libelle_cat` varchar(64) NOT NULL,
  PRIMARY KEY (`id_cat`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `commande_cmd`
--

DROP TABLE IF EXISTS `commande_cmd`;
CREATE TABLE IF NOT EXISTS `commande_cmd` (
  `id_cmd` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` int(11) NOT NULL,
  `coiffeur_cmd` int(11) NOT NULL,
  `etat_cmd` varchar(64) NOT NULL,
  `montant_cmd` float NOT NULL,
  `date_debut_cmd` date NOT NULL,
  `date_fin_cmd` date NOT NULL,
  `paiement_cmd` float DEFAULT NULL,
  PRIMARY KEY (`id_cmd`),
  KEY `FK user_cmd` (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `photo_ph`
--

DROP TABLE IF EXISTS `photo_ph`;
CREATE TABLE IF NOT EXISTS `photo_ph` (
  `id_ph` int(11) NOT NULL AUTO_INCREMENT,
  `contenu_ph` longblob NOT NULL,
  PRIMARY KEY (`id_ph`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `token_tk`
--

DROP TABLE IF EXISTS `token_tk`;
CREATE TABLE IF NOT EXISTS `token_tk` (
  `id_tk` int(11) NOT NULL AUTO_INCREMENT,
  `token_tk` varchar(100) NOT NULL,
  PRIMARY KEY (`id_tk`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `utilisateur_categorie`
--

DROP TABLE IF EXISTS `utilisateur_categorie`;
CREATE TABLE IF NOT EXISTS `utilisateur_categorie` (
  `id_user` int(11) NOT NULL,
  `id_cat` int(11) NOT NULL,
  PRIMARY KEY (`id_user`,`id_cat`),
  KEY `FK cat_userCat` (`id_cat`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `utilisateur_photo`
--

DROP TABLE IF EXISTS `utilisateur_photo`;
CREATE TABLE IF NOT EXISTS `utilisateur_photo` (
  `id_user` int(11) NOT NULL,
  `id_ph` int(11) NOT NULL,
  PRIMARY KEY (`id_user`,`id_ph`),
  KEY `FK ph_userPh` (`id_ph`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `utilisateur_user`
--

DROP TABLE IF EXISTS `utilisateur_user`;
CREATE TABLE IF NOT EXISTS `utilisateur_user` (
  `id_user` int(11) NOT NULL AUTO_INCREMENT,
  `id_tk` int(11) NOT NULL,
  `typeProfil_user` int(11) NOT NULL,
  `nom_user` varchar(64) NOT NULL,
  `prenom_user` varchar(64) NOT NULL,
  `dataNaiss_user` date NOT NULL,
  `mail_user` varchar(64) NOT NULL,
  `sexe_user` varchar(64) DEFAULT NULL,
  `numero_user` int(11) NOT NULL,
  `adress_user` varchar(200) NOT NULL,
  `password_user` varchar(64) NOT NULL,
  PRIMARY KEY (`id_user`),
  KEY `FK tk_user` (`id_tk`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `avisclient_ac`
--
ALTER TABLE `avisclient_ac`
  ADD CONSTRAINT `FK user_ac` FOREIGN KEY (`id_user`) REFERENCES `utilisateur_user` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `commande_cmd`
--
ALTER TABLE `commande_cmd`
  ADD CONSTRAINT `FK user_cmd` FOREIGN KEY (`id_user`) REFERENCES `utilisateur_user` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `utilisateur_categorie`
--
ALTER TABLE `utilisateur_categorie`
  ADD CONSTRAINT `FK cat_userCat` FOREIGN KEY (`id_cat`) REFERENCES `categorie_cat` (`id_cat`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK user_userCat` FOREIGN KEY (`id_user`) REFERENCES `utilisateur_user` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `utilisateur_photo`
--
ALTER TABLE `utilisateur_photo`
  ADD CONSTRAINT `FK ph_userPh` FOREIGN KEY (`id_ph`) REFERENCES `photo_ph` (`id_ph`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK user_userPH` FOREIGN KEY (`id_user`) REFERENCES `utilisateur_user` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `utilisateur_user`
--
ALTER TABLE `utilisateur_user`
  ADD CONSTRAINT `FK tk_user` FOREIGN KEY (`id_tk`) REFERENCES `token_tk` (`id_tk`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

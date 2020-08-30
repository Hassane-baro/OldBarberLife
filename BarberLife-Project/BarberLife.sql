-- MariaDB dump 10.17  Distrib 10.4.11-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: BarberLife
-- ------------------------------------------------------
-- Server version	10.4.11-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `BarberLife`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `BarberLife` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */;

USE `BarberLife`;

--
-- Table structure for table `avisclient_ac`
--

DROP TABLE IF EXISTS `avisclient_ac`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `avisclient_ac` (
  `id_ac` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` int(11) NOT NULL,
  `coiffeur_ac` int(11) NOT NULL,
  `commentaire_ac` varchar(200) DEFAULT NULL,
  `note_ac` float DEFAULT NULL,
  PRIMARY KEY (`id_ac`),
  KEY `FK user_ac` (`id_user`),
  CONSTRAINT `FK user_ac` FOREIGN KEY (`id_user`) REFERENCES `utilisateur_user` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `avisclient_ac`
--

LOCK TABLES `avisclient_ac` WRITE;
/*!40000 ALTER TABLE `avisclient_ac` DISABLE KEYS */;
/*!40000 ALTER TABLE `avisclient_ac` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categorie_cat`
--

DROP TABLE IF EXISTS `categorie_cat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categorie_cat` (
  `id_cat` int(11) NOT NULL AUTO_INCREMENT,
  `libelle_cat` varchar(64) NOT NULL,
  PRIMARY KEY (`id_cat`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorie_cat`
--

LOCK TABLES `categorie_cat` WRITE;
/*!40000 ALTER TABLE `categorie_cat` DISABLE KEYS */;
INSERT INTO `categorie_cat` VALUES (1,'en cours'),(2,'degrade'),(3,'afro'),(4,'carre'),(5,'bol'),(6,'iroquois'),(7,'court'),(8,'long'),(9,'rase'),(10,'frise'),(11,'boucle'),(12,'lisse'),(13,'tresse');
/*!40000 ALTER TABLE `categorie_cat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `commande_cmd`
--

DROP TABLE IF EXISTS `commande_cmd`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `commande_cmd` (
  `id_cmd` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` int(11) NOT NULL,
  `coiffeur_cmd` int(11) NOT NULL,
  `etat_cmd` varchar(64) NOT NULL,
  `montant_cmd` float NOT NULL,
  `date_debut_cmd` date NOT NULL,
  `date_fin_cmd` date NOT NULL,
  `paiement_cmd` float DEFAULT NULL,
  PRIMARY KEY (`id_cmd`),
  KEY `FK user_cmd` (`id_user`),
  CONSTRAINT `FK user_cmd` FOREIGN KEY (`id_user`) REFERENCES `utilisateur_user` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `commande_cmd`
--

LOCK TABLES `commande_cmd` WRITE;
/*!40000 ALTER TABLE `commande_cmd` DISABLE KEYS */;
INSERT INTO `commande_cmd` VALUES (1,8,9,'En attente de validation',10,'2020-06-28','2020-06-28',NULL),(2,8,10,'En attente de validation',10,'2020-06-28','2020-06-28',NULL),(3,8,10,'En attente de validation',10,'2020-06-28','2020-06-28',NULL);
/*!40000 ALTER TABLE `commande_cmd` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `photo_ph`
--

DROP TABLE IF EXISTS `photo_ph`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `photo_ph` (
  `id_ph` int(11) NOT NULL AUTO_INCREMENT,
  `contenu_ph` longblob NOT NULL,
  PRIMARY KEY (`id_ph`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `photo_ph`
--

LOCK TABLES `photo_ph` WRITE;
/*!40000 ALTER TABLE `photo_ph` DISABLE KEYS */;
/*!40000 ALTER TABLE `photo_ph` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `token_tk`
--

DROP TABLE IF EXISTS `token_tk`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `token_tk` (
  `id_tk` int(11) NOT NULL AUTO_INCREMENT,
  `token_tk` varchar(100) NOT NULL,
  PRIMARY KEY (`id_tk`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `token_tk`
--

LOCK TABLES `token_tk` WRITE;
/*!40000 ALTER TABLE `token_tk` DISABLE KEYS */;
INSERT INTO `token_tk` VALUES (1,'azazdazdazdazda');
/*!40000 ALTER TABLE `token_tk` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `utilisateur_categorie`
--

DROP TABLE IF EXISTS `utilisateur_categorie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `utilisateur_categorie` (
  `id_user` int(11) NOT NULL,
  `id_cat` int(11) NOT NULL,
  PRIMARY KEY (`id_user`,`id_cat`),
  KEY `FK cat_userCat` (`id_cat`),
  CONSTRAINT `FK cat_userCat` FOREIGN KEY (`id_cat`) REFERENCES `categorie_cat` (`id_cat`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK user_userCat` FOREIGN KEY (`id_user`) REFERENCES `utilisateur_user` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `utilisateur_categorie`
--

LOCK TABLES `utilisateur_categorie` WRITE;
/*!40000 ALTER TABLE `utilisateur_categorie` DISABLE KEYS */;
/*!40000 ALTER TABLE `utilisateur_categorie` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `utilisateur_photo`
--

DROP TABLE IF EXISTS `utilisateur_photo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `utilisateur_photo` (
  `id_user` int(11) NOT NULL,
  `id_ph` int(11) NOT NULL,
  PRIMARY KEY (`id_user`,`id_ph`),
  KEY `FK ph_userPh` (`id_ph`),
  CONSTRAINT `FK ph_userPh` FOREIGN KEY (`id_ph`) REFERENCES `photo_ph` (`id_ph`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK user_userPH` FOREIGN KEY (`id_user`) REFERENCES `utilisateur_user` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `utilisateur_photo`
--

LOCK TABLES `utilisateur_photo` WRITE;
/*!40000 ALTER TABLE `utilisateur_photo` DISABLE KEYS */;
/*!40000 ALTER TABLE `utilisateur_photo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `utilisateur_user`
--

DROP TABLE IF EXISTS `utilisateur_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `utilisateur_user` (
  `id_user` int(11) NOT NULL AUTO_INCREMENT,
  `id_tk` int(11) NOT NULL,
  `typeProfil_user` int(11) NOT NULL,
  `nom_user` varchar(64) NOT NULL,
  `prenom_user` varchar(64) NOT NULL,
  `dataNaiss_user` varchar(40) DEFAULT NULL,
  `mail_user` varchar(64) NOT NULL,
  `sexe_user` varchar(64) DEFAULT NULL,
  `numero_user` varchar(40) DEFAULT NULL,
  `adress_user` varchar(200) NOT NULL,
  `password_user` varchar(64) NOT NULL,
  PRIMARY KEY (`id_user`),
  KEY `FK tk_user` (`id_tk`),
  CONSTRAINT `FK tk_user` FOREIGN KEY (`id_tk`) REFERENCES `token_tk` (`id_tk`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `utilisateur_user`
--

LOCK TABLES `utilisateur_user` WRITE;
/*!40000 ALTER TABLE `utilisateur_user` DISABLE KEYS */;
INSERT INTO `utilisateur_user` VALUES (7,1,1,'Baro','Hassane','18/10/1995','Hassanebaro@hotmail.com',NULL,'0628660185','60Rue gretillat Vitry-sur-Seine 94400','$2a$10$MB5gp/LuSq/Wc/vEUZgsGupEcskQVHB7AbCgLNiW8WFhf.tNH.jqe'),(8,1,1,'MINBIELLE','Morgan','27/03/1997','m.minbielle@gmail.com','homme','0606060606','adresse 1','momo'),(9,1,0,'Coiffeur','tailleur','20/10/1999','coiffeur.tailleur@pro.com','homme','0605050505','adresse2','coiffeur'),(10,1,0,'Professionnel','raseur','18/02/1980','proraseur@gmail.com','homme','0143752077','adresse inconnue','coiffeur');
/*!40000 ALTER TABLE `utilisateur_user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-08-30 13:10:23

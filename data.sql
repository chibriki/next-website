-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: dev
-- ------------------------------------------------------
-- Server version	8.0.41

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Chat`
--

DROP TABLE IF EXISTS `Chat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Chat` (
  `id_chat` int NOT NULL AUTO_INCREMENT,
  `id_team` int DEFAULT NULL,
  PRIMARY KEY (`id_chat`),
  UNIQUE KEY `Chat_id_team_key` (`id_team`),
  CONSTRAINT `Chat_id_team_fkey` FOREIGN KEY (`id_team`) REFERENCES `Team` (`id_team`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Chat`
--

LOCK TABLES `Chat` WRITE;
/*!40000 ALTER TABLE `Chat` DISABLE KEYS */;
INSERT INTO `Chat` VALUES (3,NULL),(1,1),(2,2);
/*!40000 ALTER TABLE `Chat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Lifts`
--

DROP TABLE IF EXISTS `Lifts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Lifts` (
  `id_lift` int NOT NULL AUTO_INCREMENT,
  `name_lift` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('IN_SERVICE','IN_MAINTENANCE') COLLATE utf8mb4_unicode_ci NOT NULL,
  `end_date` datetime(3) DEFAULT NULL,
  `last_maintenance` datetime(3) DEFAULT NULL,
  PRIMARY KEY (`id_lift`),
  UNIQUE KEY `Lifts_name_lift_key` (`name_lift`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Lifts`
--

LOCK TABLES `Lifts` WRITE;
/*!40000 ALTER TABLE `Lifts` DISABLE KEYS */;
INSERT INTO `Lifts` VALUES (1,'PAR-R1','IN_SERVICE',NULL,NULL),(2,'PAR-R2','IN_SERVICE',NULL,NULL),(3,'PAR-2','IN_SERVICE',NULL,NULL),(4,'PAR-14','IN_SERVICE',NULL,NULL),(5,'PAR-4','IN_SERVICE',NULL,'2025-05-06 00:00:00.000'),(6,'PAR-17','IN_SERVICE',NULL,NULL),(7,'PAR-7','IN_SERVICE',NULL,'2025-05-12 00:00:00.000'),(8,'PAR-6','IN_SERVICE',NULL,NULL),(9,'PAR-9','IN_SERVICE',NULL,NULL),(10,'PAR-13','IN_SERVICE',NULL,'2025-05-08 19:21:12.954'),(11,'PAR-15','IN_SERVICE',NULL,NULL),(12,'PAR-22','IN_SERVICE',NULL,NULL),(13,'PAR-8','IN_SERVICE',NULL,NULL),(14,'PAR-11','IN_SERVICE',NULL,NULL),(15,'PAR-12','IN_SERVICE',NULL,'2025-05-14 00:00:00.000'),(16,'PAR-16','IN_SERVICE',NULL,NULL),(17,'PAR-3','IN_SERVICE',NULL,NULL),(18,'MULTILIFT','IN_SERVICE',NULL,NULL),(19,'Transport line','IN_SERVICE',NULL,NULL);
/*!40000 ALTER TABLE `Lifts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Message`
--

DROP TABLE IF EXISTS `Message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Message` (
  `id_message` int NOT NULL AUTO_INCREMENT,
  `id_chat` int NOT NULL,
  `id_user` int NOT NULL,
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id_message`),
  KEY `Message_id_chat_fkey` (`id_chat`),
  KEY `Message_id_user_fkey` (`id_user`),
  CONSTRAINT `Message_id_chat_fkey` FOREIGN KEY (`id_chat`) REFERENCES `Chat` (`id_chat`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Message_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `User` (`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Message`
--

LOCK TABLES `Message` WRITE;
/*!40000 ALTER TABLE `Message` DISABLE KEYS */;
INSERT INTO `Message` VALUES (49,2,32,'Hello!','2025-05-09 13:10:38.526'),(50,3,38,'Alexander, check your inbox for the plan of the project 15 I have prepared.','2025-05-09 13:12:47.210'),(51,3,41,'Got it, will get back to you.','2025-05-09 13:13:13.020'),(52,2,41,'Good afternoon!','2025-05-09 13:13:43.923'),(53,2,32,'Alexander, please get by my office at 5 pm','2025-05-09 13:14:39.300'),(54,3,32,'Dear employees,\n\nWe’d like to thank each of you for your continued dedication and professionalism as we head into the peak season. Please remember to perform daily safety checks, stay alert, and assist guests with a friendly attitude. Your role is crucial to ensuring a safe and enjoyable experience for all visitors.\n\nLet’s keep the lifts running smoothly and safely – together we make Bukovel world-class!\n\nBest regards,\nManagement Team','2025-05-09 13:16:17.116'),(55,2,32,'Also, great job on the project 21 so far, team B!','2025-05-09 13:17:28.213'),(56,2,32,'Keep up the good work.','2025-05-09 13:17:39.907'),(57,1,38,'bebebe','2025-05-25 16:34:21.775');
/*!40000 ALTER TABLE `Message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Projects`
--

DROP TABLE IF EXISTS `Projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Projects` (
  `id_project` int NOT NULL AUTO_INCREMENT,
  `name_project` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('COMPLETE','PLANNED','ONGOING') COLLATE utf8mb4_unicode_ci NOT NULL,
  `start_date` datetime(3) NOT NULL,
  `end_date` datetime(3) NOT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id_lift` int NOT NULL,
  `id_team` int NOT NULL,
  PRIMARY KEY (`id_project`),
  UNIQUE KEY `Projects_name_project_key` (`name_project`),
  KEY `Projects_id_lift_fkey` (`id_lift`),
  KEY `Projects_id_team_fkey` (`id_team`),
  CONSTRAINT `Projects_id_lift_fkey` FOREIGN KEY (`id_lift`) REFERENCES `Lifts` (`id_lift`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Projects_id_team_fkey` FOREIGN KEY (`id_team`) REFERENCES `Team` (`id_team`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Projects`
--

LOCK TABLES `Projects` WRITE;
/*!40000 ALTER TABLE `Projects` DISABLE KEYS */;
INSERT INTO `Projects` VALUES (15,'Technical inspection of chairs','PLANNED','2025-06-20 00:00:00.000','2025-06-30 00:00:00.000','Stability and wear check',5,1),(18,'Technical inspection of clamps','COMPLETE','2025-05-04 00:00:00.000','2025-05-06 00:00:00.000','Grip integrity evaluation',5,2),(19,'Technical inspection of balancers','COMPLETE','2025-05-10 00:00:00.000','2025-05-12 00:00:00.000','Load distribution analysis',7,2),(20,'Special technical inspection of drives','COMPLETE','2025-05-08 19:21:12.954','2025-05-08 19:21:12.954','Motor performance assessment',10,1),(21,'Special technical inspection of supports','COMPLETE','2025-05-08 19:21:12.954','2025-05-14 00:00:00.000','Structural load inspection',15,2);
/*!40000 ALTER TABLE `Projects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Team`
--

DROP TABLE IF EXISTS `Team`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Team` (
  `id_team` int NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id_team`),
  UNIQUE KEY `Team_name_key` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Team`
--

LOCK TABLES `Team` WRITE;
/*!40000 ALTER TABLE `Team` DISABLE KEYS */;
INSERT INTO `Team` VALUES (1,'Team A'),(2,'Team B');
/*!40000 ALTER TABLE `Team` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `User` (
  `id_user` int NOT NULL AUTO_INCREMENT,
  `username` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `position` enum('SHIFT_MANAGER','LOCKSMITH','MECHANIC','HEAD_MECHANIC') COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` enum('ADMIN','WORKER') COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone_number` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id_team` int NOT NULL,
  PRIMARY KEY (`id_user`),
  UNIQUE KEY `User_username_key` (`username`),
  KEY `User_id_team_fkey` (`id_team`),
  CONSTRAINT `User_id_team_fkey` FOREIGN KEY (`id_team`) REFERENCES `Team` (`id_team`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES (32,'admin','admin','HEAD_MECHANIC','Oleksii Moiseienko','ADMIN','+37098756565',2),(37,'adam456','123','MECHANIC','Adam Pokuzny','WORKER','none',2),(38,'321','321','MECHANIC','Micheal Downer','WORKER','+37066785755',1),(41,'ale','ale','HEAD_MECHANIC','Alexander Golubsky','ADMIN',NULL,2);
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET @OLD_SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-04  2:43:53
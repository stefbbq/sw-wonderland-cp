# ************************************************************
# Sequel Pro SQL dump
# Version 4096
#
# http://www.sequelpro.com/
# http://code.google.com/p/sequel-pro/
#
# Host: 127.0.0.1 (MySQL 5.6.17)
# Database: wonderland_cp
# Generation Time: 2014-09-22 15:54:24 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table adminUsers
# ------------------------------------------------------------

DROP TABLE IF EXISTS `adminUsers`;

CREATE TABLE `adminUsers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `guid` varchar(36) NOT NULL,
  `username` varchar(30) NOT NULL,
  `password` varchar(45) NOT NULL,
  `password_set` varchar(1) NOT NULL DEFAULT '0',
  `super_user` varchar(1) DEFAULT '0',
  `email` varchar(45) NOT NULL,
  `active` varchar(1) NOT NULL DEFAULT '1',
  `temp_password` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `guid_UNIQUE` (`guid`),
  UNIQUE KEY `email_UNIQUE` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `adminUsers` WRITE;
/*!40000 ALTER TABLE `adminUsers` DISABLE KEYS */;

INSERT INTO `adminUsers` (`id`, `guid`, `username`, `password`, `password_set`, `super_user`, `email`, `active`, `temp_password`)
VALUES
	(5,'246c84df-b3e9-4c5e-9869-56bfc854aa37','admin','098f6bcd4621d373cade4e832627b4f6','1','1','admin@wpl.com','1',''),
	(6,'f95f0d78-eae3-43f0-bbb9-f87bc7b47402','adel','c78996efd443e3dad7c497442ee4506b','0','0','adel@steamwalker.net','1','HC7lUoK1');

/*!40000 ALTER TABLE `adminUsers` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table clients
# ------------------------------------------------------------

DROP TABLE IF EXISTS `clients`;

CREATE TABLE `clients` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `guid` varchar(36) NOT NULL,
  `name` varchar(45) NOT NULL,
  `address` varchar(50) NOT NULL,
  `city` varchar(25) NOT NULL,
  `province` varchar(2) NOT NULL,
  `postal_code` varchar(7) NOT NULL,
  `email` varchar(45) NOT NULL,
  `phone` varchar(10) NOT NULL,
  `phone2` varchar(10) NOT NULL,
  `wplEmail` varchar(45) NOT NULL,
  `active` varchar(1) DEFAULT '1',
  `ext` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`,`guid`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `clients` WRITE;
/*!40000 ALTER TABLE `clients` DISABLE KEYS */;

INSERT INTO `clients` (`id`, `guid`, `name`, `address`, `city`, `province`, `postal_code`, `email`, `phone`, `phone2`, `wplEmail`, `active`, `ext`)
VALUES
	(12,'19883351-60fc-46d9-892c-476a25118609','Justice League','100 Justice Place','Burlington','ON','H4H4H4','orders@justiceleague1234.ca','5552649787','5556984113','rep@wpl.com','1',NULL),
	(13,'eb14a744-6711-47fa-b4fc-206f57c091b3','Avengers Inc.','Stark Tower, 100th Floor','Toronto','ON','S2S2S2','orders@avegers13123.ca','5558977766','5551231894','eerep@wpl.com','1',NULL),
	(14,'6a5faba3-7909-440c-9b4a-930f5e917063','Xavier Institute for Higher Learning','1407 Graymalkin Lane','Oakville','ON','X9W8X8','confirm@xavavier123.edu','5556454461','5559979743','account@wpl.com','1',NULL),
	(15,'25db102e-3cef-44b3-adff-907d0ba9bfd5','Oscorp','666 Goblin Way','London','ON','H4H4H4','confirm@oscorp123.com','5558979113','5559797431','account@wpl.com','0',NULL),
	(16,'e5f5200e-19c3-487f-94a7-9a42d1e3b938','Wayne Enterprises','643 Main St','London','ON','B4T8A7','confirm@wayne123.com','5559313132','5551213169','rep@wpl.com','1',NULL);

/*!40000 ALTER TABLE `clients` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table clientUsers
# ------------------------------------------------------------

DROP TABLE IF EXISTS `clientUsers`;

CREATE TABLE `clientUsers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `guid` varchar(36) NOT NULL,
  `client_id` int(11) NOT NULL,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `confirmation_email` varchar(45) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `phone2` varchar(20) DEFAULT NULL,
  `active` varchar(1) DEFAULT '1',
  `password` varchar(45) DEFAULT NULL,
  `password_set` varchar(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `clientUsers` WRITE;
/*!40000 ALTER TABLE `clientUsers` DISABLE KEYS */;

INSERT INTO `clientUsers` (`id`, `guid`, `client_id`, `first_name`, `last_name`, `email`, `confirmation_email`, `phone`, `phone2`, `active`, `password`, `password_set`)
VALUES
	(3,'593721c8-f7d1-4021-af8a-865b747897a2',13,'Tony','Stark','ironman@avengers123.com','','5559783113','5551213199','1',NULL,'0'),
	(4,'b5a3d6d9-3735-47d8-92f9-758ec249f918',13,'Thor','Odinson','themightythor@avengers123.com','','5552342424','5557314986','1',NULL,'0'),
	(5,'aebd5dc3-ef69-4bca-8d2d-1759c67282fc',13,'Phil','Hartman','phil@shield.com','','4164444444','3133333333','1',NULL,'0');

/*!40000 ALTER TABLE `clientUsers` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table collateral
# ------------------------------------------------------------

DROP TABLE IF EXISTS `collateral`;

CREATE TABLE `collateral` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `type` varchar(20) NOT NULL,
  `description` varchar(200) NOT NULL,
  `client_id` int(11) NOT NULL,
  `thumb_path` varchar(100) DEFAULT NULL,
  `asset_path` varchar(100) DEFAULT NULL,
  `guid` varchar(36) NOT NULL,
  `active` varchar(1) NOT NULL DEFAULT '1',
  `last_upload` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `collateral` WRITE;
/*!40000 ALTER TABLE `collateral` DISABLE KEYS */;

INSERT INTO `collateral` (`id`, `name`, `type`, `description`, `client_id`, `thumb_path`, `asset_path`, `guid`, `active`, `last_upload`)
VALUES
	(8,'Thor\\\'s Cards','businessCards','Thor\\\'s business cards.',13,'collateral/8/test.jpg','collateral/8/test.pdf','9a93f3da-9cef-42b2-af94-268b60a65b39','1','2014-07-30 11:03:07'),
	(9,'Wayne Enterprises Letterhead','stationary','Letterhead for Wayne Enterprises.',12,'collateral/9/test.jpg','collateral/9/test.pdf','8566175f-ad95-47ff-8587-a4f3031b1f11','1','2014-07-30 17:05:20'),
	(10,'Jean Grey Poster','poster','Poster for Wolverine\\\'s room.',14,'collateral/10/jean-grey.jpg','collateral/10/jean-grey.pdf','e77aea15-79cd-4186-858e-96df94d6ff80','1','2014-07-31 06:24:01'),
	(11,'Lantern Ring','special_other','Get me the ring!',12,'','','c09c2c1f-75ea-43b6-ba45-50ab7265bbcf','1','2014-08-28 17:27:46'),
	(12,'Lantern Ring','special_other','Get me the ring!',12,'','','c9a91132-77fe-497f-9313-c3639d4cf9af','1','2014-08-28 17:27:53'),
	(13,'Lantern Ring','special_other','Get me the ring!',12,'','','92dfcd98-d20d-4b10-8758-5982303060f7','1','2014-08-28 17:28:17'),
	(14,'Lantern Ring','special_other','Get me the ring!',12,'collateral/14/9.jpg','collateral/14/13.jpg','40883727-d10b-4b17-be6d-9b696ec643e6','1','2014-08-28 13:32:22'),
	(15,'Cerebro Users Manual','booklet','How to use Cerebro',14,'collateral/15/6.jpg','collateral/15/5.jpg','e7ed4e6e-b03f-4bff-868a-65542fb6a871','1','2014-08-28 13:43:39'),
	(16,'Avengers Cards','businessCards','Generic Cards',13,'collateral/16/5.jpg','collateral/16/5.jpg','94edf0c8-bed8-4554-847b-341af22cab2f','1','2014-08-28 13:48:36'),
	(17,'Avengers Cards','businessCards','Generic Cards',13,'collateral/17/5.jpg','collateral/17/5.jpg','bab9de70-93b1-40b2-9a76-f1cbd7556b3a','1','2014-08-28 14:30:15');

/*!40000 ALTER TABLE `collateral` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table collateralTypes
# ------------------------------------------------------------

DROP TABLE IF EXISTS `collateralTypes`;

CREATE TABLE `collateralTypes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(20) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `code_UNIQUE` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `collateralTypes` WRITE;
/*!40000 ALTER TABLE `collateralTypes` DISABLE KEYS */;

INSERT INTO `collateralTypes` (`id`, `code`, `name`)
VALUES
	(1,'leaflet','Leaflet'),
	(2,'directMail','Direct Mail'),
	(3,'poster','Poster'),
	(4,'stationary','Stationary'),
	(5,'businessCards','Business Cards'),
	(6,'folder','Folder'),
	(7,'packaging','Packaging'),
	(8,'customBox','Custom Box'),
	(9,'binder','Binder'),
	(10,'hrRecruitment','HR Recruitment'),
	(11,'largeFormat','Large Format'),
	(12,'special_other','Special / Other');

/*!40000 ALTER TABLE `collateralTypes` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table fakeDropdownContent
# ------------------------------------------------------------

DROP TABLE IF EXISTS `fakeDropdownContent`;

CREATE TABLE `fakeDropdownContent` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(20) NOT NULL,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `code_UNIQUE` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `fakeDropdownContent` WRITE;
/*!40000 ALTER TABLE `fakeDropdownContent` DISABLE KEYS */;

INSERT INTO `fakeDropdownContent` (`id`, `code`, `name`)
VALUES
	(1,'a','Option A'),
	(2,'b','Option B'),
	(3,'c','Option C'),
	(4,'d','Option D'),
	(5,'e','Option E');

/*!40000 ALTER TABLE `fakeDropdownContent` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table paperFinish
# ------------------------------------------------------------

DROP TABLE IF EXISTS `paperFinish`;

CREATE TABLE `paperFinish` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(20) NOT NULL,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `code_UNIQUE` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `paperFinish` WRITE;
/*!40000 ALTER TABLE `paperFinish` DISABLE KEYS */;

INSERT INTO `paperFinish` (`id`, `code`, `name`)
VALUES
	(1,'matte','Matte Coated'),
	(2,'gloss','Gloss Coated'),
	(3,'uncoated','Uncoated'),
	(4,'other','Other');

/*!40000 ALTER TABLE `paperFinish` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table quoteRequests
# ------------------------------------------------------------

DROP TABLE IF EXISTS `quoteRequests`;

CREATE TABLE `quoteRequests` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `clientName` varchar(45) NOT NULL,
  `clientEmail` varchar(45) NOT NULL,
  `type` int(11) DEFAULT NULL,
  `size` varchar(10) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `pageCount` int(11) DEFAULT NULL,
  `finish` int(11) DEFAULT NULL,
  `weight` int(11) DEFAULT NULL,
  `recycled` int(11) DEFAULT NULL,
  `colours` int(11) DEFAULT NULL,
  `sides` int(11) DEFAULT NULL,
  `specialFX` int(11) DEFAULT NULL,
  `binding` int(11) DEFAULT NULL,
  `description` varchar(200) DEFAULT NULL,
  `file` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

LOCK TABLES `quoteRequests` WRITE;
/*!40000 ALTER TABLE `quoteRequests` DISABLE KEYS */;

INSERT INTO `quoteRequests` (`id`, `clientName`, `clientEmail`, `type`, `size`, `quantity`, `pageCount`, `finish`, `weight`, `recycled`, `colours`, `sides`, `specialFX`, `binding`, `description`, `file`)
VALUES
	(16,'Norman Osborne','greengoblin@oscorp.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'jean-grey.jpg'),
	(17,'Norman Osborne','greengoblin@oscorp.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'jean-grey.jpg'),
	(18,'Norman Osborne','greengoblin@oscorp.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'jean-grey.jpg'),
	(19,'Norman Osborne','greengoblin@oscorp.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'test.jpg'),
	(20,'Norman Osborne','greengoblin@oscorp.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'jean-grey.jpg'),
	(21,'Norman Osborne','greengoblin@oscorp.com',3,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'jean-grey.jpg'),
	(22,'Norman Osborne','greengoblin@oscorp.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'jean-grey.jpg'),
	(23,'Norman Osborne','greengoblin@oscorp.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'jean-grey.jpg');

/*!40000 ALTER TABLE `quoteRequests` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

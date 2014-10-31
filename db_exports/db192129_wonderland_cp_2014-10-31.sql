# ************************************************************
# Sequel Pro SQL dump
# Version 4096
#
# http://www.sequelpro.com/
# http://code.google.com/p/sequel-pro/
#
# Host: external-db.s192129.gridserver.com (MySQL 5.1.72-rel14.10)
# Database: db192129_wonderland_cp
# Generation Time: 2014-10-31 15:07:50 +0000
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
	(7,'2b07aabf-a5a9-4985-a222-ecf1c61f4c62','testUser','5f4dcc3b5aa765d61d8327deb882cf99','1','0','sdgarson@gmail.com','1',''),
	(8,'bd6ca06e-58de-411a-8a99-69eea614b9af','adel','1d3172d7c9ef60cfdf2f26a323c994da','1','0','adel@steamwalker.net','1',''),
	(10,'62fabb84-5816-4697-b390-d6717bb1f6f8','adeltest','e6c0d37bd3e195164e4392fe463ac73c','1','0','adel@steamwalker.net','1','I701i6pN');

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
	(13,'eb14a744-6711-47fa-b4fc-206f57c091b3','Avengers Inc.','Stark Tower, 100th Floor','Toronto','ON','S2S2S2','sdgarson@gmail.com','5558977766','5551231894','sdgarson@gmail.com','1',NULL),
	(14,'6a5faba3-7909-440c-9b4a-930f5e917063','Xavier Institute for Higher Learning','1407 Graymalkin Lane','Oakville','ON','X9W8X8','confirm@xavavier123.edu','5556454461','5559979743','sdgarson@gmail.com','1',NULL),
	(15,'25db102e-3cef-44b3-adff-907d0ba9bfd5','Oscorp','666 Goblin Way','London','ON','H4H4H4','confirm@oscorp123.com','5558979113','5559797431','account@wpl.com','1',NULL),
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
  `temp_password` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `clientUsers` WRITE;
/*!40000 ALTER TABLE `clientUsers` DISABLE KEYS */;

INSERT INTO `clientUsers` (`id`, `guid`, `client_id`, `first_name`, `last_name`, `email`, `confirmation_email`, `phone`, `phone2`, `active`, `password`, `password_set`, `temp_password`)
VALUES
	(3,'593721c8-f7d1-4021-af8a-865b747897a2',13,'Tony','Stark','ironman@tekkromancer.com','sdgarson@gmail.com','5559783113','5551213198','1',NULL,'0',NULL),
	(7,'98565b1d-770b-4719-9688-2321bf10762e',13,'Clint','Barton','sdgarson@gmail.com','sdgarson@gmail.com','5555555555','5555555555','1','098f6bcd4621d373cade4e832627b4f6','1',''),
	(8,'11c9cb3a-518d-494f-80c0-a3b77acf3748',12,'Adel','Amodwala','adel@steamwalker.net','','4444444444','','1','3d16bd24f03916b067a8c074483505f3','0','j1D195Rd'),
	(9,'8d298945-b91c-4944-ba22-8da19347b093',15,'Adel','','bfists@gmail.com','','4444444444','','1','5ebe2294ecd0e0f08eab7690d2a6ee69','1',''),
	(10,'c4b8cb69-f84c-4ff8-8a94-9be36e8a9ef5',14,'Scott','Summers','cyclops@tekkromancer.com','emma.frost@tekkromancer.com','5551234567','5551231456','1','098f6bcd4621d373cade4e832627b4f6','1',''),
	(11,'5cfb815c-8290-46d8-87f3-10f7f64e8b93',13,'Bob','Bobson','adel@soundmelon.com','','','','1','5ebe2294ecd0e0f08eab7690d2a6ee69','1','');

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
	(8,'Thor\\\'s Cards','businessCards','Thor\\\'s business cards.',13,'collateral/8/thor_poster.jpg','collateral/8/thor_poster.pdf','9a93f3da-9cef-42b2-af94-268b60a65b39','1','2014-09-12 18:52:03'),
	(9,'Wayne Enterprises Letterhead','stationary','Letterhead for Wayne Enterprises.',12,'collateral/9/test.jpg','collateral/9/test.pdf','8566175f-ad95-47ff-8587-a4f3031b1f11','1','2014-07-30 17:05:20'),
	(10,'Jean Grey Poster','poster','Poster for Wolverine\\\'s room.',14,'collateral/10/jean-grey.jpg','collateral/10/jean-grey.pdf','e77aea15-79cd-4186-858e-96df94d6ff80','1','2014-07-31 06:24:01'),
	(11,'Black Widow Poster','poster','Poster of the Black Widow',13,'collateral/11/black_widow_poster.jpg','collateral/11/black_widow_poster.pdf','6768c399-5d39-4e79-98dd-74fa3520586a','1','2014-09-12 14:59:49'),
	(12,'Wasp Dossier','booklet','Information about Wasp',13,'collateral/12/wasp_poster.jpg','collateral/12/wasp_poster.pdf','3d790725-ade5-4d80-828e-8a86256e98da','1','2014-09-12 18:44:08'),
	(13,'Hulk\\\'s Cards','businessCards','Hulk\\\'s business cards',13,'collateral/13/hulk_poster.jpg','collateral/13/hulk_poster.pdf','a8eeb6c4-dcae-4059-835c-d84e8d3c1af2','1','2014-09-12 18:46:48'),
	(14,'landscaper','packaging','Some picture of great importance.',12,'','','c6713290-0e3a-42d7-a244-eee43a2dfe87','1','2014-09-19 11:02:46'),
	(15,'Mango','poster','Make it rather large.',16,'','','4f3eb48e-1eb1-45e5-aaad-93ab2e2d5ddb','1','2014-09-22 11:56:55'),
	(16,'Lemonade','special_other','Johnny Tightlips.',14,'collateral/16/lemon.jpg','','25696e0c-9524-4679-adc6-ea047d0a34d0','1','2014-09-22 12:07:15'),
	(17,'test 1','booklet','asdf',15,'collateral/17/28.jpg','','c6421747-448d-42a4-b076-39f278986f38','1','2014-10-24 10:29:27'),
	(18,'test 1','booklet','asdf',15,'collateral/18/28.jpg','','d7c6ecc2-bf2a-4a33-a696-240eda806131','1','2014-10-24 10:29:28'),
	(19,'test2','leaflet','asdf',15,'collateral/19/32.jpg','collateral/19/33.jpg','373bf899-e129-4b5f-a4a2-65ff040de4aa','1','2014-10-24 10:30:00'),
	(20,'test3','leaflet','afds',15,'collateral/20/38.jpg','collateral/20/52.jpg','57687572-6a84-4a0e-966e-678399e0bcd5','1','2014-10-24 10:31:04'),
	(21,'test3','leaflet','afds',15,'collateral/21/38.jpg','','a678edae-fae5-466e-b7c2-2d68050299ad','1','2014-10-24 10:31:12');

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


# Dump of table dd_coatingAQ
# ------------------------------------------------------------

DROP TABLE IF EXISTS `dd_coatingAQ`;

CREATE TABLE `dd_coatingAQ` (
  `id` int(11) NOT NULL,
  `code` varchar(20) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `iddd_coatingAQ_UNIQUE` (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

LOCK TABLES `dd_coatingAQ` WRITE;
/*!40000 ALTER TABLE `dd_coatingAQ` DISABLE KEYS */;

INSERT INTO `dd_coatingAQ` (`id`, `code`, `name`)
VALUES
	(1,'gloss ','Gloss '),
	(2,'satin','Satin'),
	(3,'softTouch','Soft Touch');

/*!40000 ALTER TABLE `dd_coatingAQ` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table dd_coatingVarnish
# ------------------------------------------------------------

DROP TABLE IF EXISTS `dd_coatingVarnish`;

CREATE TABLE `dd_coatingVarnish` (
  `id` int(11) NOT NULL,
  `code` varchar(20) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

LOCK TABLES `dd_coatingVarnish` WRITE;
/*!40000 ALTER TABLE `dd_coatingVarnish` DISABLE KEYS */;

INSERT INTO `dd_coatingVarnish` (`id`, `code`, `name`)
VALUES
	(1,'gloss','Gloss'),
	(2,'satin','Satin'),
	(3,'matte','Matte');

/*!40000 ALTER TABLE `dd_coatingVarnish` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table dd_finishing
# ------------------------------------------------------------

DROP TABLE IF EXISTS `dd_finishing`;

CREATE TABLE `dd_finishing` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(20) NOT NULL,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `code_UNIQUE` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `dd_finishing` WRITE;
/*!40000 ALTER TABLE `dd_finishing` DISABLE KEYS */;

INSERT INTO `dd_finishing` (`id`, `code`, `name`)
VALUES
	(1,'fold','Fold'),
	(2,'score','Score'),
	(3,'saddleStitch','Saddle Stitch'),
	(4,'perfectBind','Perfect Bind'),
	(5,'coil','Coil Bind'),
	(6,'wireobind','Wire-O Bind'),
	(7,'drill','Drill'),
	(8,'dieCut','Die Cut and Glue'),
	(9,'laminate','Laminate');

/*!40000 ALTER TABLE `dd_finishing` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table dd_inkColours
# ------------------------------------------------------------

DROP TABLE IF EXISTS `dd_inkColours`;

CREATE TABLE `dd_inkColours` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(20) NOT NULL,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `code_UNIQUE` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `dd_inkColours` WRITE;
/*!40000 ALTER TABLE `dd_inkColours` DISABLE KEYS */;

INSERT INTO `dd_inkColours` (`id`, `code`, `name`)
VALUES
	(1,'black','Black Only'),
	(2,'1_col','One Colour'),
	(3,'2_col','2 Colour'),
	(4,'3_col','3 Colour'),
	(5,'full','Full Process Colour');

/*!40000 ALTER TABLE `dd_inkColours` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table dd_paperFinish
# ------------------------------------------------------------

DROP TABLE IF EXISTS `dd_paperFinish`;

CREATE TABLE `dd_paperFinish` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(20) NOT NULL,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `code_UNIQUE` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `dd_paperFinish` WRITE;
/*!40000 ALTER TABLE `dd_paperFinish` DISABLE KEYS */;

INSERT INTO `dd_paperFinish` (`id`, `code`, `name`)
VALUES
	(1,'gloss','Gloss'),
	(2,'silk','Silk'),
	(3,'nonCoated','Non-coated Offset');

/*!40000 ALTER TABLE `dd_paperFinish` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table dd_paperWeightCover
# ------------------------------------------------------------

DROP TABLE IF EXISTS `dd_paperWeightCover`;

CREATE TABLE `dd_paperWeightCover` (
  `id` int(11) NOT NULL,
  `code` varchar(20) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

LOCK TABLES `dd_paperWeightCover` WRITE;
/*!40000 ALTER TABLE `dd_paperWeightCover` DISABLE KEYS */;

INSERT INTO `dd_paperWeightCover` (`id`, `code`, `name`)
VALUES
	(1,'80lb','80lb approx. 8pt'),
	(2,'100lbt','100lb approx. 10pt'),
	(3,'111lb','111lb approx. 12pt'),
	(4,'130lb','130lb approx. 14pt');

/*!40000 ALTER TABLE `dd_paperWeightCover` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table dd_paperWeightText
# ------------------------------------------------------------

DROP TABLE IF EXISTS `dd_paperWeightText`;

CREATE TABLE `dd_paperWeightText` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(20) NOT NULL,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `code_UNIQUE` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `dd_paperWeightText` WRITE;
/*!40000 ALTER TABLE `dd_paperWeightText` DISABLE KEYS */;

INSERT INTO `dd_paperWeightText` (`id`, `code`, `name`)
VALUES
	(1,'20lb','blank/na/20lb'),
	(2,'60lb','60lb'),
	(3,'70lb','70lb'),
	(4,'80lb','80lb'),
	(5,'100lb','100lb'),
	(6,'115lb','115lb');

/*!40000 ALTER TABLE `dd_paperWeightText` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table dd_recycledOpts
# ------------------------------------------------------------

DROP TABLE IF EXISTS `dd_recycledOpts`;

CREATE TABLE `dd_recycledOpts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(20) NOT NULL,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `code_UNIQUE` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `dd_recycledOpts` WRITE;
/*!40000 ALTER TABLE `dd_recycledOpts` DISABLE KEYS */;

INSERT INTO `dd_recycledOpts` (`id`, `code`, `name`)
VALUES
	(5,'recycle_1','Recycled Option 1'),
	(6,'recycle_2','Recycled Option 2');

/*!40000 ALTER TABLE `dd_recycledOpts` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table dd_sides
# ------------------------------------------------------------

DROP TABLE IF EXISTS `dd_sides`;

CREATE TABLE `dd_sides` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(20) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

LOCK TABLES `dd_sides` WRITE;
/*!40000 ALTER TABLE `dd_sides` DISABLE KEYS */;

INSERT INTO `dd_sides` (`id`, `code`, `name`)
VALUES
	(1,'1side','1 Side'),
	(2,'2sides','2 Sides');

/*!40000 ALTER TABLE `dd_sides` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table dd_specialEffects
# ------------------------------------------------------------

DROP TABLE IF EXISTS `dd_specialEffects`;

CREATE TABLE `dd_specialEffects` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(20) NOT NULL,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `code_UNIQUE` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `dd_specialEffects` WRITE;
/*!40000 ALTER TABLE `dd_specialEffects` DISABLE KEYS */;

INSERT INTO `dd_specialEffects` (`id`, `code`, `name`)
VALUES
	(5,'sfx_1','SFX Option 1'),
	(6,'sfx_2','SFX Option 2');

/*!40000 ALTER TABLE `dd_specialEffects` ENABLE KEYS */;
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


# Dump of table orders
# ------------------------------------------------------------

DROP TABLE IF EXISTS `orders`;

CREATE TABLE `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `guid` varchar(36) NOT NULL,
  `collateral_id` int(11) NOT NULL,
  `client_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `order_date` datetime NOT NULL,
  `quantity` int(11) NOT NULL,
  `comment` varchar(255) DEFAULT NULL,
  `authorized` varchar(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;

INSERT INTO `orders` (`id`, `guid`, `collateral_id`, `client_id`, `user_id`, `order_date`, `quantity`, `comment`, `authorized`)
VALUES
	(3,'d007efc0-6e06-4d77-b39b-36d88958588a',11,13,3,'2014-09-12 19:49:56',5,'','0'),
	(4,'49a2a084-8102-4714-8156-cb582dee00a3',13,13,3,'2014-09-12 20:08:43',1000,'Need to be extra durable.','0'),
	(5,'b2da7773-5fb3-4169-a2d7-fa5bc6846d0f',8,13,3,'2014-09-12 20:21:39',500,'In Asgardian Silver.','0'),
	(6,'af28c8b1-f8b8-4923-9089-44bfa5d56b9d',8,13,3,'2014-09-12 20:24:57',20,'','0'),
	(7,'4db191be-4fae-438e-b644-2bee62f29f32',13,13,3,'2014-09-12 20:25:14',5,'','0'),
	(8,'21e7f6d2-b267-4a8a-9a5f-65cf031588e2',11,0,11,'2014-10-09 12:40:37',5600,'','0'),
	(9,'6b664488-da24-446b-a5c1-52cc608eacfc',19,15,9,'2014-10-24 10:32:19',34,'asdfasdf','0'),
	(10,'22a068eb-ff1e-49bd-b04f-f136e98b9c8a',19,15,9,'2014-10-24 10:32:24',34,'asdfasdf','0'),
	(11,'23452120-9dd5-4988-8561-7d80621ee6c7',20,15,9,'2014-10-24 10:33:04',12,'asdf','0');

/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table quoteRequests
# ------------------------------------------------------------

DROP TABLE IF EXISTS `quoteRequests`;

CREATE TABLE `quoteRequests` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `clientName` varchar(45) NOT NULL,
  `clientEmail` varchar(45) NOT NULL,
  `clientPhone` varchar(25) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `description` varchar(200) DEFAULT NULL,
  `flatSize` varchar(20) DEFAULT NULL,
  `foldedSize` varchar(20) DEFAULT NULL,
  `sides` varchar(20) DEFAULT NULL,
  `ink` varchar(20) DEFAULT NULL,
  `coatingAQ` varchar(20) DEFAULT NULL,
  `coatingVarnish` varchar(20) DEFAULT NULL,
  `weightText` varchar(20) DEFAULT NULL,
  `weightCover` varchar(20) DEFAULT NULL,
  `paperFinish` varchar(20) DEFAULT NULL,
  `finishing` varchar(20) DEFAULT NULL,
  `finishingReq` varchar(100) DEFAULT NULL,
  `specialInstructions` varchar(100) DEFAULT NULL,
  `file` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

LOCK TABLES `quoteRequests` WRITE;
/*!40000 ALTER TABLE `quoteRequests` DISABLE KEYS */;

INSERT INTO `quoteRequests` (`id`, `clientName`, `clientEmail`, `clientPhone`, `quantity`, `description`, `flatSize`, `foldedSize`, `sides`, `ink`, `coatingAQ`, `coatingVarnish`, `weightText`, `weightCover`, `paperFinish`, `finishing`, `finishingReq`, `specialInstructions`, `file`)
VALUES
	(53,'Scott Garson','sdgarson@gmail.com','5551234567',1,'A poster for my bunk','24 x 30 flat','12 x 15 folded','1side','black','gloss ','gloss','20lb','80lb','gloss','coil','Make it shiny','Make it look nice','black_widow_poster.jpg'),
	(54,'Scott Garson','sdgarson@gmail.com','5551234567',1,'A poster for my bunk','24 x 30 flat','12 x 15 folded','1side','black','gloss ','gloss','20lb','80lb','gloss','coil','Make it shiny','Make it look nice','hulk_poster.jpg'),
	(55,'Scott Garson','sdgarson@gmail.com','5551234567',1,'A poster for my bunk','24 x 30 flat','12 x 15 folded','1side','black','gloss ','satin','20lb','80lb','nonCoated','coil','Make it shiny','Make it look nice','thor_poster.jpg'),
	(56,'Scott Summers (Xavier Institute for Higher Le','cyclops@tekkromancer.com','5551234567',1,'A poster for my bunk','24 x 30 flat','12 x 15 folded','1side','black','softTouch','satin','60lb','80lb','gloss','coil','Make it shiny','Make it look nice','hulk_poster.jpg');

/*!40000 ALTER TABLE `quoteRequests` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
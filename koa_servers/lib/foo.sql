-- MySQL dump 10.13  Distrib 5.6.41, for Win64 (x86_64)
--
-- Host: localhost    Database: userslistsql
-- ------------------------------------------------------
-- Server version	5.6.41-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '自增主键',
  `group_id` int(11) NOT NULL COMMENT '组id',
  `username` varchar(100) NOT NULL COMMENT '用户姓名',
  `password` varchar(100) NOT NULL COMMENT '用户密码',
  `mobile` varchar(20) NOT NULL COMMENT '用户密码',
  `email` varchar(64) DEFAULT NULL COMMENT '邮箱',
  `gender` int(11) DEFAULT NULL COMMENT '性别',
  `address` varchar(100) DEFAULT NULL COMMENT '地址',
  `age` int(11) DEFAULT NULL COMMENT '生日',
  `note` varchar(100) DEFAULT NULL COMMENT '备注',
  `gen_time` datetime DEFAULT NULL COMMENT '创建时间',
  `modify_time` datetime DEFAULT NULL COMMENT '修改时间',
  `last_login_time` datetime DEFAULT NULL COMMENT '上次登录时间',
  `updated_id` int(11) DEFAULT NULL COMMENT '修改id',
  `is_del` int(11) DEFAULT NULL COMMENT '是否删除',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COMMENT='用户表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,1,'admin','e10adc3949ba59abbe56e057f20f883e','17839928655','541216@qq.com',0,'test address',26,'test2','2018-10-25 20:14:52','2018-10-25 20:24:00',NULL,1,NULL),(2,2,'tom','e10adc3949ba59abbe56e057f20f883e','15623895623','985626@qq.com',1,'Hongyuan Hotel, Jingzhou city, Hubei Prov.',15,'test note','2018-10-25 21:04:31','2018-10-25 21:35:42',NULL,2,NULL),(3,3,'Atwell','e10adc3949ba59abbe56e057f20f883e','18695236984','52313212@qq.com',1,'Room 42， Zhongzhou Road，Nanyang City， Henan Prov.',12,'test1','2018-10-25 21:35:07',NULL,NULL,NULL,NULL),(4,3,'Spence','e10adc3949ba59abbe56e057f20f883e','15689253698','913123@qq.com',1,'Room 201,No.34,Lane 125,XiKang Road(South),HongKou District',25,'test','2018-10-25 22:14:55',NULL,NULL,NULL,NULL),(5,4,'Robin','e10adc3949ba59abbe56e057f20f883e','17789562698','15635165@qq.com',1,'Cheng Nuo Ban, Gong Jiao Zong Gong Si, Xiamen, Fujian',24,'test','2018-10-25 22:16:01',NULL,NULL,NULL,NULL),(6,4,'Arden','e10adc3949ba59abbe56e057f20f883e','18259862358','65121352@qq.com',0,'Hongyuan Hotel, Jingzhou city, Hubei Prov.',22,'note','2018-10-25 22:18:44',NULL,NULL,NULL,NULL),(7,1,'Alva','e10adc3949ba59abbe56e057f20f883e','15226895623','51005136@qq.com',0,'Hongyuan Hotel, Jingzhou city, Hubei Prov.',20,'note','2018-10-25 22:20:35',NULL,NULL,NULL,NULL),(8,2,'Anstice','e10adc3949ba59abbe56e057f20f883e','13989562895','4123162132@qq.com',1,'Cheng Nuo Ban, Gong Jiao Zong Gong Si, Xiamen, Fujian',18,'To the world you may be just one person. To the person you may be the whole world. ','2018-10-25 22:24:26',NULL,NULL,NULL,NULL),(9,3,'Benny','e10adc3949ba59abbe56e057f20f883e','15689524896','5123221212@qq.com',0,'Room 403,No.37,ShiFan Residential Quarter,BaoShan District',19,'I\'m working toward the slice of the unknown future step away, never stop.','2018-10-25 22:26:44',NULL,NULL,NULL,NULL),(10,2,'Galen','e10adc3949ba59abbe56e057f20f883e','13689524789','81512156123@qq.com',1,'Room 201,No.34,Lane 125,XiKang Road(South),HongKou District',20,'To the world you may be just one person. To the person you may be the whole world. ','2018-10-25 22:28:04',NULL,NULL,NULL,NULL),(11,3,'Keller','e10adc3949ba59abbe56e057f20f883e','13689524987','26489725412@qq.com',1,'Room 42， Zhongzhou Road，Nanyang City， Henan Prov.',21,'To the world you may be just one person. To the person you may be the whole world. ','2018-10-25 22:29:12',NULL,NULL,NULL,NULL),(12,2,'Ken','e10adc3949ba59abbe56e057f20f883e','15689527852','5613213@qq.com',1,'Room 42， Zhongzhou Road，Nanyang City， Henan Prov.',28,'To the world you may be just one person. To the person you may be the whole world. ','2018-10-25 22:49:57',NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-10-26  0:54:27

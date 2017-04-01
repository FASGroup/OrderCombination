USE [master]
GO
/****** Object:  Database [OrderCombinationAppDB]    Script Date: 2017/4/1 14:19:45 ******/
CREATE DATABASE [OrderCombinationAppDB]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'OrderCombinationAppDB', FILENAME = N'D:\Program Files\Microsoft SQL Server\MSSQL12.MSSQLSERVER\MSSQL\DATA\OrderCombinationAppDB.mdf' , SIZE = 5120KB , MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB )
 LOG ON 
( NAME = N'OrderCombinationAppDB_log', FILENAME = N'D:\Program Files\Microsoft SQL Server\MSSQL12.MSSQLSERVER\MSSQL\DATA\OrderCombinationAppDB_log.ldf' , SIZE = 2048KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
GO
ALTER DATABASE [OrderCombinationAppDB] SET COMPATIBILITY_LEVEL = 120
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [OrderCombinationAppDB].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [OrderCombinationAppDB] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [OrderCombinationAppDB] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [OrderCombinationAppDB] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [OrderCombinationAppDB] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [OrderCombinationAppDB] SET ARITHABORT OFF 
GO
ALTER DATABASE [OrderCombinationAppDB] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [OrderCombinationAppDB] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [OrderCombinationAppDB] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [OrderCombinationAppDB] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [OrderCombinationAppDB] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [OrderCombinationAppDB] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [OrderCombinationAppDB] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [OrderCombinationAppDB] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [OrderCombinationAppDB] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [OrderCombinationAppDB] SET  DISABLE_BROKER 
GO
ALTER DATABASE [OrderCombinationAppDB] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [OrderCombinationAppDB] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [OrderCombinationAppDB] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [OrderCombinationAppDB] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [OrderCombinationAppDB] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [OrderCombinationAppDB] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [OrderCombinationAppDB] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [OrderCombinationAppDB] SET RECOVERY FULL 
GO
ALTER DATABASE [OrderCombinationAppDB] SET  MULTI_USER 
GO
ALTER DATABASE [OrderCombinationAppDB] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [OrderCombinationAppDB] SET DB_CHAINING OFF 
GO
ALTER DATABASE [OrderCombinationAppDB] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [OrderCombinationAppDB] SET TARGET_RECOVERY_TIME = 0 SECONDS 
GO
ALTER DATABASE [OrderCombinationAppDB] SET DELAYED_DURABILITY = DISABLED 
GO
EXEC sys.sp_db_vardecimal_storage_format N'OrderCombinationAppDB', N'ON'
GO
USE [OrderCombinationAppDB]
GO
/****** Object:  Table [dbo].[OrderInfo]    Script Date: 2017/4/1 14:19:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[OrderInfo](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[CommodityName] [nvarchar](100) NULL,
	[CommodityUrl] [nvarchar](300) NOT NULL,
	[Price] [decimal](8, 2) NOT NULL,
	[Quantity] [int] NOT NULL,
	[Amount] [decimal](8, 2) NOT NULL,
	[Remark] [nvarchar](200) NULL,
	[MergeId] [nvarchar](500) NULL,
	[MergeDate] [datetime] NULL,
	[MergeBy] [int] NULL,
	[State] [int] NOT NULL,
	[CreateDate] [datetime] NOT NULL,
	[CreateBy] [int] NOT NULL,
 CONSTRAINT [PK_OrderInfo] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[User]    Script Date: 2017/4/1 14:19:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[User](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UserName] [nvarchar](50) NOT NULL,
	[Password] [nvarchar](200) NOT NULL,
	[Address] [nvarchar](100) NULL,
	[CreateDate] [datetime] NOT NULL,
 CONSTRAINT [PK_User] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
ALTER TABLE [dbo].[OrderInfo]  WITH CHECK ADD  CONSTRAINT [FK_OrderInfo_User_CreateBy] FOREIGN KEY([CreateBy])
REFERENCES [dbo].[User] ([Id])
GO
ALTER TABLE [dbo].[OrderInfo] CHECK CONSTRAINT [FK_OrderInfo_User_CreateBy]
GO
ALTER TABLE [dbo].[OrderInfo]  WITH CHECK ADD  CONSTRAINT [FK_OrderInfo_User_MergeBy] FOREIGN KEY([MergeBy])
REFERENCES [dbo].[User] ([Id])
GO
ALTER TABLE [dbo].[OrderInfo] CHECK CONSTRAINT [FK_OrderInfo_User_MergeBy]
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'主键' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'OrderInfo', @level2type=N'COLUMN',@level2name=N'Id'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'商品名称' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'OrderInfo', @level2type=N'COLUMN',@level2name=N'CommodityName'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'商品链接地址' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'OrderInfo', @level2type=N'COLUMN',@level2name=N'CommodityUrl'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'单价' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'OrderInfo', @level2type=N'COLUMN',@level2name=N'Price'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'数量' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'OrderInfo', @level2type=N'COLUMN',@level2name=N'Quantity'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'金额' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'OrderInfo', @level2type=N'COLUMN',@level2name=N'Amount'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'备注' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'OrderInfo', @level2type=N'COLUMN',@level2name=N'Remark'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'凑单ID，一起凑单的数据，该字段值相同,GUID' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'OrderInfo', @level2type=N'COLUMN',@level2name=N'MergeId'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'凑单日期' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'OrderInfo', @level2type=N'COLUMN',@level2name=N'MergeDate'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'凑单人(User->Id)' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'OrderInfo', @level2type=N'COLUMN',@level2name=N'MergeBy'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'状态(1:新增，2:已凑单)' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'OrderInfo', @level2type=N'COLUMN',@level2name=N'State'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'创建日期' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'OrderInfo', @level2type=N'COLUMN',@level2name=N'CreateDate'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'创建人(User->Id)' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'OrderInfo', @level2type=N'COLUMN',@level2name=N'CreateBy'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'订单信息表' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'OrderInfo'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'主键' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'User', @level2type=N'COLUMN',@level2name=N'Id'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'用户名' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'User', @level2type=N'COLUMN',@level2name=N'UserName'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'密码' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'User', @level2type=N'COLUMN',@level2name=N'Password'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'地址' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'User', @level2type=N'COLUMN',@level2name=N'Address'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'创建日期' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'User', @level2type=N'COLUMN',@level2name=N'CreateDate'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'用户信息表' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'User'
GO
USE [master]
GO
ALTER DATABASE [OrderCombinationAppDB] SET  READ_WRITE 
GO

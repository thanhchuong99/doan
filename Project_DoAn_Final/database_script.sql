USE [master]
GO
/****** Object:  Database [cofee]    Script Date: 2020-11-08 9:10:26 PM ******/
CREATE DATABASE [cofee]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'cofee', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.MSSQLSERVER\MSSQL\DATA\cofee.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'cofee_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.MSSQLSERVER\MSSQL\DATA\cofee_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
ALTER DATABASE [cofee] SET COMPATIBILITY_LEVEL = 140
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [cofee].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [cofee] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [cofee] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [cofee] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [cofee] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [cofee] SET ARITHABORT OFF 
GO
ALTER DATABASE [cofee] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [cofee] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [cofee] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [cofee] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [cofee] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [cofee] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [cofee] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [cofee] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [cofee] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [cofee] SET  DISABLE_BROKER 
GO
ALTER DATABASE [cofee] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [cofee] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [cofee] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [cofee] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [cofee] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [cofee] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [cofee] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [cofee] SET RECOVERY FULL 
GO
ALTER DATABASE [cofee] SET  MULTI_USER 
GO
ALTER DATABASE [cofee] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [cofee] SET DB_CHAINING OFF 
GO
ALTER DATABASE [cofee] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [cofee] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [cofee] SET DELAYED_DURABILITY = DISABLED 
GO
EXEC sys.sp_db_vardecimal_storage_format N'cofee', N'ON'
GO
ALTER DATABASE [cofee] SET QUERY_STORE = OFF
GO
USE [cofee]
GO
ALTER DATABASE SCOPED CONFIGURATION SET IDENTITY_CACHE = ON;
GO
ALTER DATABASE SCOPED CONFIGURATION SET LEGACY_CARDINALITY_ESTIMATION = OFF;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET LEGACY_CARDINALITY_ESTIMATION = PRIMARY;
GO
ALTER DATABASE SCOPED CONFIGURATION SET MAXDOP = 0;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET MAXDOP = PRIMARY;
GO
ALTER DATABASE SCOPED CONFIGURATION SET PARAMETER_SNIFFING = ON;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET PARAMETER_SNIFFING = PRIMARY;
GO
ALTER DATABASE SCOPED CONFIGURATION SET QUERY_OPTIMIZER_HOTFIXES = OFF;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET QUERY_OPTIMIZER_HOTFIXES = PRIMARY;
GO
USE [cofee]
GO
/****** Object:  Table [dbo].[Category]    Script Date: 2020-11-08 9:10:26 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Category](
	[CategoryId] [int] IDENTITY(1,1) NOT NULL,
	[CategoryName] [nvarchar](50) NULL,
 CONSTRAINT [PK_Category] PRIMARY KEY CLUSTERED 
(
	[CategoryId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Discounts]    Script Date: 2020-11-08 9:10:27 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Discounts](
	[DiscountId] [int] IDENTITY(1,1) NOT NULL,
	[DiscountName] [nvarchar](50) NOT NULL,
	[DiscountValue] [float] NOT NULL,
 CONSTRAINT [PK_Discount] PRIMARY KEY CLUSTERED 
(
	[DiscountId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[OrderDetails]    Script Date: 2020-11-08 9:10:27 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[OrderDetails](
	[OrderId] [int] NOT NULL,
	[ProductId] [int] NOT NULL,
	[Quantity] [int] NULL,
 CONSTRAINT [PK_OrderDetails] PRIMARY KEY CLUSTERED 
(
	[OrderId] ASC,
	[ProductId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Orders]    Script Date: 2020-11-08 9:10:27 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Orders](
	[OrderId] [int] IDENTITY(1,1) NOT NULL,
	[UserName] [varchar](50) NOT NULL,
	[OrderDate] [datetime] NOT NULL,
	[DiscountId] [int] NULL,
	[ShipAddress] [nvarchar](max) NOT NULL,
 CONSTRAINT [PK_Order] PRIMARY KEY CLUSTERED 
(
	[OrderId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Product]    Script Date: 2020-11-08 9:10:27 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Product](
	[ProductId] [int] IDENTITY(1,1) NOT NULL,
	[CategoryId] [int] NULL,
	[ProductName] [nvarchar](max) NULL,
	[UnitPrice] [bigint] NULL,
	[Description] [nvarchar](max) NULL,
	[Hot] [int] NULL,
 CONSTRAINT [PK_Product] PRIMARY KEY CLUSTERED 
(
	[ProductId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Roles]    Script Date: 2020-11-08 9:10:27 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Roles](
	[RoleId] [int] IDENTITY(1,1) NOT NULL,
	[RoleName] [nchar](50) NULL,
 CONSTRAINT [PK_Roles] PRIMARY KEY CLUSTERED 
(
	[RoleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[User]    Script Date: 2020-11-08 9:10:27 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[User](
	[UserName] [varchar](50) NOT NULL,
	[Password] [nchar](50) NOT NULL,
	[FullName] [nvarchar](50) NULL,
	[Phone] [nchar](50) NULL,
	[Location] [nvarchar](max) NULL,
	[RoleId] [int] NOT NULL,
 CONSTRAINT [PK_User] PRIMARY KEY CLUSTERED 
(
	[UserName] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Category] ON 

INSERT [dbo].[Category] ([CategoryId], [CategoryName]) VALUES (1, N'Cà phê')
INSERT [dbo].[Category] ([CategoryId], [CategoryName]) VALUES (2, N'Cà phê pha máy')
INSERT [dbo].[Category] ([CategoryId], [CategoryName]) VALUES (3, N'Trà Trái Cây')
INSERT [dbo].[Category] ([CategoryId], [CategoryName]) VALUES (4, N'Thức Uống Đá Xay')
INSERT [dbo].[Category] ([CategoryId], [CategoryName]) VALUES (6, N'Macchiato')
SET IDENTITY_INSERT [dbo].[Category] OFF
INSERT [dbo].[OrderDetails] ([OrderId], [ProductId], [Quantity]) VALUES (1, 2, 2)
INSERT [dbo].[OrderDetails] ([OrderId], [ProductId], [Quantity]) VALUES (1, 3, 2)
INSERT [dbo].[OrderDetails] ([OrderId], [ProductId], [Quantity]) VALUES (2, 1, 1)
INSERT [dbo].[OrderDetails] ([OrderId], [ProductId], [Quantity]) VALUES (2, 2, 1)
SET IDENTITY_INSERT [dbo].[Orders] ON 

INSERT [dbo].[Orders] ([OrderId], [UserName], [OrderDate], [DiscountId], [ShipAddress]) VALUES (1, N'testuser1', CAST(N'2020-11-07T15:19:57.000' AS DateTime), NULL, N'Gò Vấp')
INSERT [dbo].[Orders] ([OrderId], [UserName], [OrderDate], [DiscountId], [ShipAddress]) VALUES (2, N'testadmin1', CAST(N'2020-11-08T18:48:22.000' AS DateTime), NULL, N'Nguyễn Kiệm Gò Vấp')
SET IDENTITY_INSERT [dbo].[Orders] OFF
SET IDENTITY_INSERT [dbo].[Product] ON 

INSERT [dbo].[Product] ([ProductId], [CategoryId], [ProductName], [UnitPrice], [Description], [Hot]) VALUES (1, 1, N'Cà Phê Sữa Đá', 32000, N'Cà phê phin kết hợp cũng sữa đặc là một sáng tạo đầy tự hào của người Việt, được xem món uống thương hiệu của Việt Nam.', 1)
INSERT [dbo].[Product] ([ProductId], [CategoryId], [ProductName], [UnitPrice], [Description], [Hot]) VALUES (2, 1, N'Bạc Xỉu', 32000, N'Theo chân những người gốc Hoa đến định cư tại Sài Gòn, Bạc sỉu là cách gọi tắt của "Bạc tẩy xỉu phé" trong tiếng Quảng Đông, chính là: Ly sữa trắng kèm một chút cà phê.', 1)
INSERT [dbo].[Product] ([ProductId], [CategoryId], [ProductName], [UnitPrice], [Description], [Hot]) VALUES (3, 2, N'Caramel Macchiato Đá', 50000, N'Vị thơm béo của sữa tươi, vị đắng thanh thoát của cà phê Espresso hảo hạng, và vị ngọt đậm của sốt caramel.', 0)
INSERT [dbo].[Product] ([ProductId], [CategoryId], [ProductName], [UnitPrice], [Description], [Hot]) VALUES (4, 4, N'Cookie Đá Xay', 59000, N'Những mẩu bánh cookies giòn rụm kết hợp ăn ý với sữa tươi và kem tươi béo ngọt, đem đến cảm giác lạ miệng gây thích thú. Một món uống phá cách dễ thương.', 0)
INSERT [dbo].[Product] ([ProductId], [CategoryId], [ProductName], [UnitPrice], [Description], [Hot]) VALUES (6, 3, N'Trà Đào Cam Sả', 45000, N'Vị thanh ngọt của đào Hy Lạp, vị chua dịu của Cam Vàng nguyên vỏ, vị chát của trà đen tươi được ủ mới mỗi 4 tiếng, cùng hương thơm nồng đặc trưng của sả chính là điểm sáng làm nên sức hấp dẫn của thức uống này.', 1)
INSERT [dbo].[Product] ([ProductId], [CategoryId], [ProductName], [UnitPrice], [Description], [Hot]) VALUES (7, 3, N'Trà Sơ Ri Thanh Long Đỏ', 49000, N'Quả sơ ri chín mọng 100% tự nhiên từ Gò Công cùng thanh long đỏ cho vị chua, ngọt thanh mát thiệt đã. Thêm trân châu trắng giòn dai để cuộc hẹn hò cùng crush thêm rôm rả.', 0)
INSERT [dbo].[Product] ([ProductId], [CategoryId], [ProductName], [UnitPrice], [Description], [Hot]) VALUES (9, 6, N'Trà Đen Macchiato', 42000, N'Trà đen được ủ mới mỗi ngày, giữ nguyên được vị chát mạnh mẽ đặc trưng của lá trà, phủ bên trên là lớp Macchiato "homemade" bồng bềnh quyến rũ vị phô mai mặn mặn mà béo béo.', 0)
SET IDENTITY_INSERT [dbo].[Product] OFF
SET IDENTITY_INSERT [dbo].[Roles] ON 

INSERT [dbo].[Roles] ([RoleId], [RoleName]) VALUES (1, N'Admin                                             ')
INSERT [dbo].[Roles] ([RoleId], [RoleName]) VALUES (2, N'User                                              ')
SET IDENTITY_INSERT [dbo].[Roles] OFF
INSERT [dbo].[User] ([UserName], [Password], [FullName], [Phone], [Location], [RoleId]) VALUES (N'testadmin1', N'xWZzbqZQ7TE3k5N0anPWfpA9AU3ZDZmXCd0HZBvWhoI=      ', N'Nguyễn Thanh Chương', N'0937463024                                        ', N'Nguyễn Kiệm Gò Vấp', 1)
INSERT [dbo].[User] ([UserName], [Password], [FullName], [Phone], [Location], [RoleId]) VALUES (N'testuser1', N'8VNoPTsar63V7La/uW+g1lV93ch1KdHbXiBX2hc9B6Q=      ', N'Nguyễn Thanh Chương', N'0937463024                                        ', N'Gò Vấp', 2)
INSERT [dbo].[User] ([UserName], [Password], [FullName], [Phone], [Location], [RoleId]) VALUES (N'testuser2', N'koBzaePtIA+EhkcVXBa/cbCUH1tIJ+nG1VLpIrpRrN8=      ', N'Nguyễn Thanh Chương', N'0937463024                                        ', N'testadmin1', 2)
ALTER TABLE [dbo].[OrderDetails]  WITH CHECK ADD  CONSTRAINT [FK_OrderDetails_Order] FOREIGN KEY([OrderId])
REFERENCES [dbo].[Orders] ([OrderId])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[OrderDetails] CHECK CONSTRAINT [FK_OrderDetails_Order]
GO
ALTER TABLE [dbo].[OrderDetails]  WITH CHECK ADD  CONSTRAINT [FK_OrderDetails_Product] FOREIGN KEY([ProductId])
REFERENCES [dbo].[Product] ([ProductId])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[OrderDetails] CHECK CONSTRAINT [FK_OrderDetails_Product]
GO
ALTER TABLE [dbo].[Orders]  WITH CHECK ADD  CONSTRAINT [FK_Order_Discount] FOREIGN KEY([DiscountId])
REFERENCES [dbo].[Discounts] ([DiscountId])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Orders] CHECK CONSTRAINT [FK_Order_Discount]
GO
ALTER TABLE [dbo].[Orders]  WITH CHECK ADD  CONSTRAINT [FK_Order_User] FOREIGN KEY([UserName])
REFERENCES [dbo].[User] ([UserName])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Orders] CHECK CONSTRAINT [FK_Order_User]
GO
ALTER TABLE [dbo].[Product]  WITH CHECK ADD  CONSTRAINT [FK_Product_Category] FOREIGN KEY([CategoryId])
REFERENCES [dbo].[Category] ([CategoryId])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Product] CHECK CONSTRAINT [FK_Product_Category]
GO
ALTER TABLE [dbo].[User]  WITH CHECK ADD  CONSTRAINT [FK_User_Roles] FOREIGN KEY([RoleId])
REFERENCES [dbo].[Roles] ([RoleId])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[User] CHECK CONSTRAINT [FK_User_Roles]
GO
USE [master]
GO
ALTER DATABASE [cofee] SET  READ_WRITE 
GO

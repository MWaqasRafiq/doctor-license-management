USE [master]
GO
/****** Object:  Database [DoctorDB]    Script Date: 4/2/2026 11:43:56 AM ******/
CREATE DATABASE [DoctorDB]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'DoctorDB', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL17.MSSQLSERVER\MSSQL\DATA\DoctorDB.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'DoctorDB_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL17.MSSQLSERVER\MSSQL\DATA\DoctorDB_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE [DoctorDB] SET COMPATIBILITY_LEVEL = 170
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [DoctorDB].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [DoctorDB] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [DoctorDB] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [DoctorDB] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [DoctorDB] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [DoctorDB] SET ARITHABORT OFF 
GO
ALTER DATABASE [DoctorDB] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [DoctorDB] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [DoctorDB] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [DoctorDB] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [DoctorDB] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [DoctorDB] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [DoctorDB] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [DoctorDB] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [DoctorDB] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [DoctorDB] SET  DISABLE_BROKER 
GO
ALTER DATABASE [DoctorDB] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [DoctorDB] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [DoctorDB] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [DoctorDB] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [DoctorDB] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [DoctorDB] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [DoctorDB] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [DoctorDB] SET RECOVERY FULL 
GO
ALTER DATABASE [DoctorDB] SET  MULTI_USER 
GO
ALTER DATABASE [DoctorDB] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [DoctorDB] SET DB_CHAINING OFF 
GO
ALTER DATABASE [DoctorDB] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [DoctorDB] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [DoctorDB] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [DoctorDB] SET OPTIMIZED_LOCKING = OFF 
GO
ALTER DATABASE [DoctorDB] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'DoctorDB', N'ON'
GO
ALTER DATABASE [DoctorDB] SET QUERY_STORE = ON
GO
ALTER DATABASE [DoctorDB] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [DoctorDB]
GO
/****** Object:  Table [dbo].[Doctors]    Script Date: 4/2/2026 11:43:56 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Doctors](
	[Id] [uniqueidentifier] NOT NULL,
	[FullName] [nvarchar](150) NOT NULL,
	[Email] [nvarchar](150) NOT NULL,
	[Specialization] [nvarchar](100) NOT NULL,
	[LicenseNumber] [nvarchar](50) NOT NULL,
	[LicenseExpiryDate] [date] NOT NULL,
	[Status] [int] NOT NULL,
	[CreatedDate] [datetime2](7) NOT NULL,
	[IsDeleted] [bit] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
INSERT [dbo].[Doctors] ([Id], [FullName], [Email], [Specialization], [LicenseNumber], [LicenseExpiryDate], [Status], [CreatedDate], [IsDeleted]) VALUES (N'7840cce7-3b62-4719-b4b1-313d26d9de5d', N'Dr. waqas', N'waqas@test.com', N'Cardiology', N'LIC125', CAST(N'2026-12-31' AS Date), 1, CAST(N'2026-04-01T19:32:39.0066667' AS DateTime2), 0)
GO
INSERT [dbo].[Doctors] ([Id], [FullName], [Email], [Specialization], [LicenseNumber], [LicenseExpiryDate], [Status], [CreatedDate], [IsDeleted]) VALUES (N'0213bfbb-91bb-439b-a001-3720f15394f3', N'M Waqas', N'waqas@waqas.co', N'None', N'LC14', CAST(N'2026-04-08' AS Date), 1, CAST(N'2026-04-02T06:52:03.7100000' AS DateTime2), 1)
GO
INSERT [dbo].[Doctors] ([Id], [FullName], [Email], [Specialization], [LicenseNumber], [LicenseExpiryDate], [Status], [CreatedDate], [IsDeleted]) VALUES (N'cb07f4b9-72ea-4624-863e-3ce8dead30cc', N'Dr. Sara Ali', N'sara@test.com', N'Dermatology', N'LIC124', CAST(N'2023-01-01' AS Date), 1, CAST(N'2026-04-01T19:32:04.2266667' AS DateTime2), 0)
GO
INSERT [dbo].[Doctors] ([Id], [FullName], [Email], [Specialization], [LicenseNumber], [LicenseExpiryDate], [Status], [CreatedDate], [IsDeleted]) VALUES (N'1e98d0b6-a8af-47ce-af4c-8723d80ca2ff', N'Dr Waqas Rafique', N'waqas.rafique91@outlook.com', N'GP', N'GP-1024', CAST(N'2026-04-30' AS Date), 1, CAST(N'2026-04-02T07:28:01.6800000' AS DateTime2), 0)
GO
INSERT [dbo].[Doctors] ([Id], [FullName], [Email], [Specialization], [LicenseNumber], [LicenseExpiryDate], [Status], [CreatedDate], [IsDeleted]) VALUES (N'a0e8eba4-32f8-4b2f-8436-abbdbc437d9e', N'Dr. Rafique', N'rafique@test.com', N'Dermatology', N'LIC126', CAST(N'2023-06-01' AS Date), 1, CAST(N'2026-04-01T19:32:39.0066667' AS DateTime2), 0)
GO
INSERT [dbo].[Doctors] ([Id], [FullName], [Email], [Specialization], [LicenseNumber], [LicenseExpiryDate], [Status], [CreatedDate], [IsDeleted]) VALUES (N'b7ff5ca9-39d7-4a82-93d9-fb848bd5ea78', N'Dr. Ahmed Khan', N'ahmed@test.com', N'Cardiology', N'LIC123', CAST(N'2026-12-31' AS Date), 1, CAST(N'2026-04-01T19:32:04.2266667' AS DateTime2), 0)
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__Doctors__E8890166FCA8495C]    Script Date: 4/2/2026 11:43:56 AM ******/
ALTER TABLE [dbo].[Doctors] ADD UNIQUE NONCLUSTERED 
(
	[LicenseNumber] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Doctors] ADD  DEFAULT ((0)) FOR [IsDeleted]
GO
/****** Object:  StoredProcedure [dbo].[sp_CreateDoctor]    Script Date: 4/2/2026 11:43:57 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_CreateDoctor]
    @Id UNIQUEIDENTIFIER,
    @FullName NVARCHAR(150),
    @Email NVARCHAR(150),
    @Specialization NVARCHAR(100),
    @LicenseNumber NVARCHAR(50),
    @LicenseExpiryDate DATE,
    @Status INT,
    @CreatedDate DATETIME2
AS
BEGIN
    SET NOCOUNT ON;

    -- Check duplicate license
    IF EXISTS (
        SELECT 1 
        FROM Doctors 
        WHERE LicenseNumber = @LicenseNumber 
        AND IsDeleted = 0
    )
    BEGIN
        THROW 50001, 'License number already exists', 1;
    END

    -- Insert
    INSERT INTO Doctors
    (
        Id, FullName, Email, Specialization, LicenseNumber,
        LicenseExpiryDate, Status, CreatedDate, IsDeleted
    )
    VALUES
    (
        @Id, @FullName, @Email, @Specialization, @LicenseNumber,
        @LicenseExpiryDate, @Status, @CreatedDate, 0
    );
END
GO
/****** Object:  StoredProcedure [dbo].[sp_GetDoctors]    Script Date: 4/2/2026 11:43:57 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_GetDoctors]
    @Search NVARCHAR(100) = NULL,
    @Status INT = NULL
AS
BEGIN
    SELECT 
        Id,
        FullName,
        Email,
        Specialization,
        LicenseNumber,
        LicenseExpiryDate,

        -- Dynamic Status Logic
        CASE 
            WHEN LicenseExpiryDate < CAST(GETDATE() AS DATE) THEN 2
            ELSE Status
        END AS Status,

        CreatedDate

    FROM Doctors
    WHERE IsDeleted = 0

    -- Search
    AND (
        @Search IS NULL OR
        FullName LIKE '%' + @Search + '%' OR
        LicenseNumber LIKE '%' + @Search + '%'
    )

    -- Filter
    AND (
        @Status IS NULL OR
        (
            CASE 
                WHEN LicenseExpiryDate < CAST(GETDATE() AS DATE) THEN 2
                ELSE Status
            END
        ) = @Status
    )

    ORDER BY CreatedDate DESC
END
GO
/****** Object:  StoredProcedure [dbo].[sp_GetExpiredDoctors]    Script Date: 4/2/2026 11:43:57 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_GetExpiredDoctors]
AS
BEGIN
    SELECT *
    FROM Doctors
    WHERE LicenseExpiryDate < CAST(GETDATE() AS DATE)
    AND IsDeleted = 0
END
GO
USE [master]
GO
ALTER DATABASE [DoctorDB] SET  READ_WRITE 
GO

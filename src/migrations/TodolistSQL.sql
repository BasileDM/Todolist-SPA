#------------------------------------------------------------
#        Script MySQL.
#------------------------------------------------------------


#------------------------------------------------------------
# Table: User
#------------------------------------------------------------

CREATE TABLE todolist_users(
        ID         Int  Auto_increment  NOT NULL ,
        LAST_NAME  Varchar (50) NOT NULL ,
        FIRST_NAME Varchar (50) NOT NULL ,
        PASSWORD   Varchar (255) NOT NULL ,
        MAIL       Varchar (80) NOT NULL
	,CONSTRAINT AK_todolist_users UNIQUE (MAIL)
	,CONSTRAINT PK_todolist_users PRIMARY KEY (ID)
)ENGINE=InnoDB;

INSERT INTO `todolist_users` (`ID`, `LAST_NAME`, `FIRST_NAME`, `PASSWORD`, `MAIL`) VALUES
(1, 'admin', 'admin', '$2y$10$G9jHKu477jlO2agttc.XPOv6tWcaiB9hB7pxNDsLRQPeq0ecCL7Yy', 'admin@admin.admin');

#------------------------------------------------------------
# Table: Priority
#------------------------------------------------------------

CREATE TABLE todolist_priorities(
        ID   Int  Auto_increment  NOT NULL ,
        NAME Varchar (30) NOT NULL
	,CONSTRAINT PK_todolist_priorities PRIMARY KEY (ID)
)ENGINE=InnoDB;

INSERT INTO `todolist_priorities` (`ID`, `NAME`) VALUES
(1, 'Normal'),
(2, 'Important'),
(3, 'Urgent');


#------------------------------------------------------------
# Table: Task
#------------------------------------------------------------

CREATE TABLE todolist_tasks(
        ID          Int  Auto_increment  NOT NULL ,
        TITLE       Varchar (50) NOT NULL ,
        DESCRIPTION Varchar (255) ,
        DUE_DATE    Date NOT NULL ,
        ID_USER     Int NOT NULL ,
        ID_PRIORITY Int NOT NULL
	,CONSTRAINT PK_todolist_tasks PRIMARY KEY (ID)

	,CONSTRAINT FK_todolist_tasks_todolist_users FOREIGN KEY (ID_USER) REFERENCES todolist_users(ID)
	,CONSTRAINT FK_todolist_tasks_todolist_priorities0 FOREIGN KEY (ID_PRIORITY) REFERENCES todolist_priorities(ID)
)ENGINE=InnoDB;

INSERT INTO `todolist_tasks` (`ID`, `TITLE`, `DESCRIPTION`, `DUE_DATE`, `ID_USER`, `ID_PRIORITY`) VALUES
(1, 'Example Task 1', 'This is an example description', '2026-01-01', 1, 1),
(2, 'Example Task 2', 'This is an example description', '2026-01-01', 1, 2),
(3, 'Example Task 3', 'This is an example description', '2026-01-01', 1, 3),
(4, 'Example Task 4', 'This is an example description', '2026-01-01', 1, 2),
(5, 'Example Task 5', 'This is an example description', '2026-01-01', 1, 1);


#------------------------------------------------------------
# Table: Category
#------------------------------------------------------------

CREATE TABLE todolist_categories(
        ID   Int  Auto_increment  NOT NULL ,
        NAME Varchar (30) NOT NULL
	,CONSTRAINT PK_todolist_categories PRIMARY KEY (ID)
)ENGINE=InnoDB;

INSERT INTO `todolist_categories` (`ID`, `NAME`) VALUES
(1, 'Personal'),
(2, 'Work'),
(3, 'Family'),
(4, 'Friends'),
(5, 'Study'),
(6, 'Other');


#------------------------------------------------------------
# Table: Avoir
#------------------------------------------------------------

CREATE TABLE todolist_relation_tasks_categories(
        ID_CATEGORY Int NOT NULL ,
        ID_TASK Int NOT NULL
	,CONSTRAINT PK_AVOIR PRIMARY KEY (ID_CATEGORY,ID_TASK)

	,CONSTRAINT FK_AVOIR_todolist_categories FOREIGN KEY (ID_CATEGORY) REFERENCES todolist_categories(ID)
	,CONSTRAINT FK_AVOIR_todolist_tasks0 FOREIGN KEY (ID_TASK) REFERENCES todolist_tasks(ID)
)ENGINE=InnoDB;

INSERT INTO `todolist_relation_tasks_categories` (`ID_CATEGORY`, `ID_TASK`) VALUES
(1, 1),
(4, 1),
(5, 2),
(6, 2),
(1, 2),
(6, 3),
(5, 4),
(2, 4),
(1, 4),
(3, 4),
(3, 5),
(5, 5);

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
(1, 'admin', 'admin', 'admin', 'admin@admin.admin');

#------------------------------------------------------------
# Table: Priority
#------------------------------------------------------------

CREATE TABLE todolist_priorities(
        ID   Int  Auto_increment  NOT NULL ,
        NAME Varchar (30) NOT NULL
	,CONSTRAINT PK_todolist_priorities PRIMARY KEY (ID)
)ENGINE=InnoDB;


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


#------------------------------------------------------------
# Table: Category
#------------------------------------------------------------

CREATE TABLE todolist_categories(
        ID   Int  Auto_increment  NOT NULL ,
        NAME Varchar (30) NOT NULL
	,CONSTRAINT PK_todolist_categories PRIMARY KEY (ID)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: Avoir
#------------------------------------------------------------

CREATE TABLE todolist_relation_tasks_categories(
        ID      Int NOT NULL ,
        ID_TASK Int NOT NULL
	,CONSTRAINT PK_AVOIR PRIMARY KEY (ID,ID_TASK)

	,CONSTRAINT FK_AVOIR_todolist_categories FOREIGN KEY (ID) REFERENCES todolist_categories(ID)
	,CONSTRAINT FK_AVOIR_todolist_tasks0 FOREIGN KEY (ID_TASK) REFERENCES todolist_tasks(ID)
)ENGINE=InnoDB;

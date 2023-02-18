#------------------------------------------------------------
#        Script MySQL.
#------------------------------------------------------------


#------------------------------------------------------------
# Table: Categories
#------------------------------------------------------------

CREATE TABLE Categories(
        id        Int  Auto_increment  NOT NULL ,
        name      Varchar (50) NOT NULL ,
        createdAt Datetime NOT NULL ,
        updatedAt Datetime NOT NULL
	,CONSTRAINT Categories_PK PRIMARY KEY (id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: Products
#------------------------------------------------------------

CREATE TABLE Products(
        id            Int  Auto_increment  NOT NULL ,
        name          Varchar (50) NOT NULL ,
        description   Text NOT NULL ,
        price         Float NOT NULL ,
        isBest        Bool NOT NULL ,
        quantity      Int NOT NULL ,
        imageUrl      Varchar (5) NOT NULL ,
        weight        Float NOT NULL ,
        createdAt     Datetime NOT NULL ,
        updatedAt     Datetime NOT NULL ,
        id_Categories Int NOT NULL
	,CONSTRAINT Products_PK PRIMARY KEY (id)

	,CONSTRAINT Products_Categories_FK FOREIGN KEY (id_Categories) REFERENCES Categories(id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: carrier
#------------------------------------------------------------

CREATE TABLE carrier(
        id        Int  Auto_increment  NOT NULL ,
        name      Varchar (50) NOT NULL ,
        price     Float NOT NULL ,
        minWeight Float NOT NULL ,
        maxWeight Float NOT NULL ,
        createdAt Datetime NOT NULL ,
        updatedAt Datetime NOT NULL
	,CONSTRAINT carrier_PK PRIMARY KEY (id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: user
#------------------------------------------------------------

CREATE TABLE user(
        id        Int  Auto_increment  NOT NULL ,
        email     Varchar (50) NOT NULL ,
        password  Varchar (50) NOT NULL ,
        firstname Varchar (50) NOT NULL ,
        lastname  Varchar (50) NOT NULL ,
        phone     Varchar (50) NOT NULL ,
        createdAt Datetime NOT NULL ,
        updatedAt Datetime NOT NULL
	,CONSTRAINT user_PK PRIMARY KEY (id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: order
#------------------------------------------------------------

CREATE TABLE order(
        id           Int  Auto_increment  NOT NULL ,
        reference    Varchar (50) NOT NULL ,
        userName     Varchar (50) NOT NULL ,
        userAdress   Varchar (50) NOT NULL ,
        carrier      Varchar (50) NOT NULL ,
        carrierPrice Varchar (50) NOT NULL ,
        totalPrice   Float NOT NULL ,
        totalWeight  Float NOT NULL ,
        createdAt    Datetime NOT NULL ,
        updateAt     Datetime NOT NULL ,
        id_user      Int NOT NULL ,
        id_carrier   Int NOT NULL
	,CONSTRAINT order_PK PRIMARY KEY (id)

	,CONSTRAINT order_user_FK FOREIGN KEY (id_user) REFERENCES user(id)
	,CONSTRAINT order_carrier0_FK FOREIGN KEY (id_carrier) REFERENCES carrier(id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: orderDetail
#------------------------------------------------------------

CREATE TABLE orderDetail(
        id          Int  Auto_increment  NOT NULL ,
        productName Varchar (50) NOT NULL ,
        reference   Varchar (50) NOT NULL ,
        price       Float NOT NULL ,
        quantity    Int NOT NULL ,
        total       Float NOT NULL ,
        createdAt   Datetime NOT NULL ,
        updatedAt   Datetime NOT NULL ,
        id_order    Int NOT NULL
	,CONSTRAINT orderDetail_PK PRIMARY KEY (id)

	,CONSTRAINT orderDetail_order_FK FOREIGN KEY (id_order) REFERENCES order(id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: addresses
#------------------------------------------------------------

CREATE TABLE addresses(
        id        Int  Auto_increment  NOT NULL ,
        firstName Varchar (50) NOT NULL ,
        lastName  Varchar (50) NOT NULL ,
        number    Int NOT NULL ,
        street    Varchar (255) NOT NULL ,
        postCode  Int NOT NULL ,
        city      Varchar (50) NOT NULL ,
        country   Varchar (100) NOT NULL ,
        createdAt Datetime NOT NULL ,
        updatedAt Datetime NOT NULL ,
        id_user   Int NOT NULL
	,CONSTRAINT addresses_PK PRIMARY KEY (id)

	,CONSTRAINT addresses_user_FK FOREIGN KEY (id_user) REFERENCES user(id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: role
#------------------------------------------------------------

CREATE TABLE role(
        id        Int  Auto_increment  NOT NULL ,
        name      Varchar (50) NOT NULL ,
        createdAt Datetime NOT NULL ,
        updatedAt Datetime NOT NULL
	,CONSTRAINT role_PK PRIMARY KEY (id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: Etre
#------------------------------------------------------------

CREATE TABLE Etre(
        id      Int NOT NULL ,
        id_role Int NOT NULL
	,CONSTRAINT Etre_PK PRIMARY KEY (id,id_role)

	,CONSTRAINT Etre_user_FK FOREIGN KEY (id) REFERENCES user(id)
	,CONSTRAINT Etre_role0_FK FOREIGN KEY (id_role) REFERENCES role(id)
)ENGINE=InnoDB;

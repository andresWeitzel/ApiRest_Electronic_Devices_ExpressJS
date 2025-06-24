
/* -----------------------------------------
 * ------ DISPOSITIVOS ELECTRONICOS ---------
 * -----------------------------------------
 * 
 * 
 * ========= DDL =============
 */

--Tables
drop table if exists componentes cascade;
drop table if exists componentes_detalles cascade;
drop table if exists transistores_bipolares cascade;
drop table if exists transistores_mosfet cascade;
drop table if exists capacitores_electroliticos cascade;
drop table if exists resistores_alta_frecuencia cascade;
drop table if exists microcontroladores_especif cascade;
drop table if exists microcontroladores_risc_pics cascade;
drop table if exists microcontroladores_risc_avrs cascade;
drop table if exists placas_arduinos cascade;
drop table if exists placas_esp8266 cascade;
drop table if exists placas_esp32 cascade;


--Sequences
drop sequence if exists id_seq_comp cascade;
drop sequence if exists id_seq_comp_det cascade;
drop sequence if exists id_seq_trans_bip cascade;
drop sequence if exists id_seq_trans_mosf cascade;
drop sequence if exists id_seq_cap_elect cascade;
drop sequence if exists id_seq_resis_alt_frec cascade;
drop sequence if exists id_seq_micr_especif cascade;
drop sequence if exists id_seq_micr_risc_pics cascade;
drop sequence if exists id_seq_micr_risc_avrs cascade;
drop sequence if exists id_seq_plac_arduinos cascade;
drop sequence if exists id_seq_plac_esp8266 cascade;
drop sequence if exists id_seq_plac_esp32 cascade;


-- Create sequences
create sequence id_seq_comp;
create sequence id_seq_comp_det;
create sequence id_seq_trans_bip;
create sequence id_seq_trans_mosf;
create sequence id_seq_cap_elect;
create sequence id_seq_resis_alt_frec;
create sequence id_seq_micr_especif;
create sequence id_seq_micr_risc_pics;
create sequence id_seq_micr_risc_avrs;
create sequence id_seq_plac_arduinos;
create sequence id_seq_plac_esp8266;
create sequence id_seq_plac_esp32;



-- ---------------------------------------------------------------------------

-- ---------------------------------------------------------------------------

-- ======= TABLA COMPONENTES ===========
create table componentes(

id int primary key,
codigo varchar(100) not null, -- ej: mh-r-447y8
imagen varchar(1000), -- link de la imagen
nro_pieza varchar(200) not null, -- ej: KSH13005
categoria varchar(100) not null, -- ej: sensor, circuito integrado, transistor,etc
descripcion varchar(400) not null, -- ej:transistor bjt npn
fabricante varchar(100) not null, -- ej: SHANTOU HUASHAN, generico
stock int not null, -- ej: 100, 200, etc
precio decimal(8,2) not null -- ej: 5.55 dolares 
);



-- ======= Restricciones Tabla componentes ===========

-- UNIQUE CODIGO
alter table componentes
add constraint UNIQUE_componentes_codigo
unique (codigo);


-- CHECK STOCK
alter table componentes
add constraint CHECK_componentes_stock
check (stock >= 0 );


-- CHECK PRECIO
alter table componentes
add constraint CHECK_componentes_precio
check (precio > 0 );

-- ADDED SEQUENCE
alter table componentes alter id 
set default nextval('id_seq_comp');


-- ---------------------------------------------------------------------------

-- ---------------------------------------------------------------------------

-- ======= TABLA COMPONENTES_DETALLES ===========


create table componentes_detalles(
	
id 	int primary key,
id_componente int not null,
hoja_de_datos varchar(3000)	not null, --link datasheet
longitud varchar(30),-- 69.0 mm
ancho varchar(30),-- 56.7 mm
peso varchar(30),-- 19.4 gramos
material varchar(50),-- silicio,acero, plastico, etc
voltaje_recomendado	varchar(30), -- 5 voltios
voltaje_min_entrada	varchar(30),-- 7  voltios (recomendado)
voltaje_max_entrada	varchar(30)-- 12  voltios (recomendado)

);

-- ======= Restricciones Tabla componentes_detalles ===========

-- UNIQUE ID_COMPONENTE
alter table componentes_detalles
add constraint UNIQUE_componentes_detalles_id_componente
unique (id_componente);


-- FK ID_COMPONENTE
alter table componentes_detalles 
add constraint FK_componentes_detalles_id_componente
foreign key(id_componente)
references componentes(id)
on delete cascade;

-- ADDED SEQUENCE
alter table componentes_detalles alter id 
set default nextval('id_seq_comp_det');


-- ---------------------------------------------------------------------------

-- ---------------------------------------------------------------------------

-- ======= TABLA TRANSISTORES_BIPOLARES ===========

create table transistores_bipolares(
	
id int primary key,
id_componente int not null,
tipo varchar(10) not null, -- NPN, PNP
--Desempe�o
voltaje_colec_emis varchar(30), ---30V, 5.5V
voltaje_colec_base varchar(30), ---30V, 5.5V
voltaje_emis_base varchar(30), ---30V, 5.5V
voltaje_colec_emis_sat varchar(30), ---30V, 5.5V
corriente_colec varchar(30), ---1.5A
ganancia_hfe varchar(30), ---1.5A
--Caract. T�rmicas			
disip_max varchar(30), ---0.645W
temp_juntura varchar(50)    ----55a+155 �C

);

-- ======= Restricciones Tabla transistores_bipolares ===========

-- UNIQUE ID_COMPONENTE
alter table transistores_bipolares
add constraint UNIQUE_transistores_bipolares_id_componente
unique (id_componente);


-- FK ID_COMPONENTE
alter table transistores_bipolares 
add constraint FK_transistores_bipolares_id_componente
foreign key(id_componente)
references componentes(id)
on delete cascade;

-- ADDED SEQUENCE
alter table transistores_bipolares alter id 
set default nextval('id_seq_trans_bip');


-- ---------------------------------------------------------------------------

-- ---------------------------------------------------------------------------

-- ======= TABLA TRANSISTORES_MOSFET ===========

create table transistores_mosfet(
	
id int primary key,
id_componente int not null,
tipo varchar(10) not null, -- nMos, pMos
--Espec M�ximas
voltaje_drenaje_fuente varchar(30), ---40v
corriente_cc_drenaje   varchar(30), ---0.15A
--Caract. T�rmicas			
disip_max varchar(30), ---0.35W
temp_op_max varchar(50), ----150 �C
--Caract. El�ctricas
conduct_drenaje_sustrato varchar(50), ---14 pF 
resist_drenaje_fuente varchar(50)---30 Ohm

);

-- ======= Restricciones Tabla transistores_mosfet ===========

-- UNIQUE ID_COMPONENTE 
alter table transistores_mosfet
add constraint UNIQUE_transistores_mosfet_id_componente
unique (id_componente);

-- FK ID_COMPONENTE
alter table transistores_mosfet
add constraint FK_transistores_mosfet_id_componente
foreign key(id_componente)
references componentes(id)
on delete cascade;

-- ADDED SEQUENCE
alter table transistores_mosfet alter id 
set default nextval('id_seq_trans_mosf');


-- ---------------------------------------------------------------------------

-- ---------------------------------------------------------------------------

-- ======= TABLA CAPACITORES_ELECTROLITICOS ===========

create table capacitores_electroliticos(
	
id int primary key,
id_componente int not null,
tipo varchar(30) not null, -- plomo axial, plomo radial, etc
--Espec 
capacitancia varchar(30), ---10000 uF
tolerancia varchar(30), --- +/- 20%
--Caract. T�rmicas			
rango_temperatura varchar(50), --- -55 �C to +105 �C
--Caract. El�ctricas
rango_tension_nominal varchar(50)--- 10 V to 100 V

);

-- ======= Restricciones Tabla capacitores_electroliticos ===========

-- UNIQUE ID_COMPONENTE 
alter table capacitores_electroliticos
add constraint UNIQUE_capacitores_electroliticos_id_componente
unique (id_componente);

-- FK ID_COMPONENTE
alter table capacitores_electroliticos
add constraint CHECK_capacitores_electroliticos_id_componente
foreign key(id_componente)
references componentes(id)
on delete cascade;

-- ADDED SEQUENCE
alter table capacitores_electroliticos alter id 
set default nextval('id_seq_cap_elect');



-- ---------------------------------------------------------------------------

-- ---------------------------------------------------------------------------

-- ======= TABLA RESISTORES_ALTA_FRECUENCIA ===========

create table resistores_alta_frecuencia(
	
id int primary key,
id_componente int not null,
--Espec 
capacitancia varchar(50), ---10000 uF
rango_tolerancia varchar(50), ---  � 5, � 10, � 20 standard
rango_resis_gral varchar(30), ---  20 ? to 1000 ?
rango_resis_microondas varchar(30), ---  20 ? to 100 ?
capacitancia_parasita varchar(30), ---   0.2 pF
--Caract. T�rmicas			
rango_temperatura varchar(50), --- -55 to +125 �C
--Caract. El�ctricas
tension_operativa varchar(50)---  100 V

);

-- ======= Restricciones Tabla resistores_alta_frecuencia ===========

-- UNIQUE ID_COMPONENTE 
alter table resistores_alta_frecuencia
add constraint UNIQUE_resistores_alta_frecuencia_id_componente
unique (id_componente);

-- FK ID_COMPONENTE
alter table resistores_alta_frecuencia
add constraint CHECK_resistores_alta_frecuencia_id_componente
foreign key(id_componente)
references componentes(id)
on delete cascade;

-- ADDED SEQUENCE
alter table resistores_alta_frecuencia alter id 
set default nextval('id_seq_resis_alt_frec');



-- ---------------------------------------------------------------------------

-- ---------------------------------------------------------------------------

-- ======= TABLA MICROCONTROLADORES_ESPECIF ===========

create table microcontroladores_especif(
	
id int primary key,
empaquetado varchar(100), ---Tray Alternate Packaging
estilo_montaje varchar(50), ---	SMD/SMT
cantidad_entr_sal varchar(50), -- 36 E/S
temp_funcionamiento varchar(100), ---  -40�C ~ 85�C (TA)
comunic_protocolos varchar(200), --- I�C, SPI, UART/USART
frec_operacion varchar(50) --- DC-40 Mhz
);


-- ======= Restricciones Tabla microcontroladores_especif ===========


-- ADDED SEQUENCE
alter table microcontroladores_especif alter id 
set default nextval('id_seq_micr_especif');




-- ---------------------------------------------------------------------------

-- ---------------------------------------------------------------------------

-- ======= TABLA MICROCONTROLADORES_RISC_PICS ===========

create table microcontroladores_risc_pics(
	
id int primary key,
id_componente int not null,
id_especificacion int,
memoria_programa varchar(50), ---  16384 bytes
memoria_datos varchar(50), ---  768 bytes
memoria_datos_eeprom varchar(50), ---  256 bytes
cantidad_fuentes_interrup varchar(5), ---  19   
cantidad_timers varchar(5), ---  4     
set_instrucciones varchar(200)---  75 Instructions; 83 with Extended Instruction Set Enabled     

);

-- ======= Restricciones Tabla microcontroladores_risc_pics ===========


-- UNIQUE ID_COMPONENTE 
alter table microcontroladores_risc_pics
add constraint UNIQUE_microcontroladores_risc_pics_id_componente
unique (id_componente);


-- FK ID_COMPONENTE
alter table microcontroladores_risc_pics
add constraint CHECK_microcontroladores_risc_pics_id_componente
foreign key(id_componente)
references componentes(id)
on delete cascade;	

-- FK ID_ESPECIFICACION
alter table microcontroladores_risc_pics
add constraint CHECK_microcontroladores_risc_pics_id_especif
foreign key(id_especificacion)
references microcontroladores_especif(id)
on delete cascade;	

-- ADDED SEQUENCE
alter table microcontroladores_risc_pics alter id 
set default nextval('id_seq_micr_risc_pics');



-- ---------------------------------------------------------------------------

-- ---------------------------------------------------------------------------

-- ======= TABLA MICROCONTROLADORES_RISC_AVRS ===========

create table microcontroladores_risc_avrs(
	
id int primary key,
id_componente int not null,
id_especificacion int,
tam_nucleo varchar(50), --- 8 bits
tam_memoria_programa varchar(50), ---  16384 bytes
tipo_memoria varchar(50) -- Memoria Flash
);


-- ======= Restricciones Tabla microcontroladores_risc_avrs ===========

-- UNIQUE ID_COMPONENTE 
alter table microcontroladores_risc_avrs
add constraint UNIQUE_microcontroladores_risc_avrs_id_componente
unique (id_componente);


-- FK ID_COMPONENTE
alter table microcontroladores_risc_avrs
add constraint CHECK_microcontroladores_risc_avrs_id_componente
foreign key(id_componente)
references componentes(id)
on delete cascade;

-- FK ID_ESPECIFICACION
alter table microcontroladores_risc_avrs
add constraint CHECK_microcontroladores_risc_avrs_id_especif
foreign key(id_especificacion)
references microcontroladores_especif(id)
on delete cascade;	

-- ADDED SEQUENCE
alter table microcontroladores_risc_avrs alter id 
set default nextval('id_seq_micr_risc_avrs');


-- ---------------------------------------------------------------------------

-- ---------------------------------------------------------------------------

-- ======= TABLA PLACAS_ARDUINOS ===========

create table placas_arduinos(
	
id int primary key,
id_componente int not null,
procesador varchar(50), --- ATMega328P 
frec_mem   varchar(20), -- 16 MHz
tam_flash  varchar(20), -- 32 KB
tam_sram   varchar(20), -- 2 KB
tam_eeprom varchar(20), -- 1 KB
cantidad_entr_sal varchar(5), ---  22   
comunic_protocolos varchar(200)--- I2C, SPI, UART
);

-- ======= Restricciones Tabla placas_arduinos ===========

-- UNIQUE ID_COMPONENTE 
alter table placas_arduinos
add constraint UNIQUE_placas_arduinos
unique (id_componente);


-- FK ID_COMPONENTE
alter table placas_arduinos
add constraint CHECK_placas_arduinos
foreign key(id_componente)
references componentes(id)
on delete cascade;

-- ADDED SEQUENCE
alter table placas_arduinos alter id 
set default nextval('id_seq_plac_arduinos');


-- ---------------------------------------------------------------------------

-- ---------------------------------------------------------------------------

-- ======= TABLA PLACAS_ESP8266 ===========

create table placas_esp8266(
	
id int primary key,
id_componente int not null,
procesador varchar(100), --- CPU RISC de 32-bit: Tensilica Xtensa LX106 
frec_mem varchar(20), -- 80 MHz
tam_flash varchar(20), --  512 KB a 4 MB
tam_sram varchar(20), -- 64 KB
cantidad_entr_sal varchar(5), --- 16  
comunic_protocolos varchar(100),  --- UART/SDIO/SPI/I2C/I2S/IR Remote Control
prot_wifi varchar(100),  -- 802.11 b/g/n
rango_frec varchar(100) -- 2.4G-2.5G (2400M-2483.5M)  
);

-- ======= Restricciones Tabla placas_esp8266 ===========

-- UNIQUE ID_COMPONENTE 
alter table placas_esp8266
add constraint UNIQUE_placas_esp8266
unique (id_componente);


-- FK ID_COMPONENTE
alter table placas_esp8266
add constraint CHECK_placas_esp8266
foreign key(id_componente)
references componentes(id)
on delete cascade;

-- ADDED SEQUENCE
alter table placas_esp8266 alter id 
set default nextval('id_seq_plac_esp8266');


-- ---------------------------------------------------------------------------

-- ---------------------------------------------------------------------------

-- ======= TABLA PLACAS_ESP32 ===========

create table placas_esp32(
	
id int primary key,
id_componente int not null,
procesador varchar(100), --- Procesador ARM Xtensa single-/dual-core 32-bit LX6
frec_mem varchar(20), -- -
tam_flash varchar(20), --  -
tam_sram varchar(20), -- -
cantidad_entr_sal varchar(5), --- -  
comunic_protocolos varchar(100),  --- UART/SDIO/SPI/I2C/I2S/IR Remote Control
prot_wifi varchar(100),  -- 802.11 b/g/n (802.11n up to 150 Mbps)
rango_frec varchar(100), -- 2.4G-2.5G 
modo_wifi varchar(100), -- Station/SoftAP/SoftAP+Station/P2P
seg_wifi varchar(100), -- WPA/WPA2/WPA2-Enterprise/WPS
prot_bluetooth varchar(100) -- Bluetooth v4.2 BR/EDR and BLE specification 
);

-- ======= Restricciones Tabla placas_esp32 ===========

-- UNIQUE ID_COMPONENTE 
alter table placas_esp32
add constraint UNIQUE_placas_esp32
unique (id_componente);


-- FK ID_COMPONENTE
alter table placas_esp32
add constraint CHECK_placas_esp32
foreign key(id_componente)
references componentes(id)
on delete cascade;


-- ADDED SEQUENCE
alter table placas_esp32 alter id 
set default nextval('id_seq_plac_esp32');


-- ---------------------------------------------------------------------------
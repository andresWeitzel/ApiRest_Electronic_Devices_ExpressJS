/* -----------------------------------------
 * ------ DISPOSITIVOS ELECTRONICOS  ---------
 * -----------------------------------------
 * 
 * 
 * ========= DML DELETE =============
 */


-- =====================================
-- ======= TABLA COMPONENTES ===========
-- =====================================

select * from componentes;
select * from componentes_detalles;
select * from information_schema.columns where table_name='componentes';

delete from componentes where id = 30;

-- insert esp32 deleted for components
insert into componentes(codigo , imagen , nro_pieza , categoria , descripcion , fabricante , stock , precio) values
 ('H789DHJUi-ESP32' , 'https://raw.githubusercontent.com/andresWeitzel/db_microelectronica_Oracle/master/files/placasEsp32/02_Placa%20ESP32%20WROOM.webp' 
 , 'DHJUi-ESP32i' , 'Placas Esp32' , 'Placa ESP32 WROOM' , 'Espressif Systems' , 5 , 15  );


select * from componentes_detalles;

-- insert esp32 deleted for components_detalles
insert into componentes_detalles(id_componente , hoja_de_datos , longitud , ancho 
, peso ,material, voltaje_recomendado , voltaje_min_entrada , voltaje_max_entrada)values
(31 , 'https://www.mouser.com/datasheet/2/891/esp-wroom-32_datasheet_en-1223836.pdf' 
, '154mm' , '132mm' , '0.120 g' , 'Aluminio' , '2.7 a 3.6 VDC' , '2.7 VDC' , '3.6 VDC');

select * from placas_esp32;

-- insert esp32 deleted for placas_esp32
insert into placas_esp32(id_componente , procesador
, frec_mem , tam_flash , tam_sram  , comunic_protocolos
, prot_wifi, rango_frec, modo_wifi , seg_wifi , prot_bluetooth) values 
(31 ,'ARM Xtensa single-/dual-core 32-bit LX6' , '-' , '-' , '-'  
 , 'UART/SDIO/SPI/I2C/I2S/IR Remote Control' ,'802.11 b/g/n (802.11n up to 150 Mbps)'
 , '2.4G-2.5G ' , 'Station/SoftAP/SoftAP+Station/P2P' , 'WPA/WPA2/WPA2-Enterprise/WPS'
 , 'Bluetooth v4.2 BR/EDR and BLE specification');


-- ---------------------------------------------------------------------------
-- ---------------------------------------------------------------------------


-- ==============================================
-- ======= TABLA COMPONENTES_DETALLES ===========
-- ==============================================

select * from componentes;
select * from componentes_detalles;
select * from information_schema.columns where table_name='componentes_detalles';

delete from componentes_detalles where id_componente = 31;

-- insert esp32 deleted for components_detalles
insert into componentes_detalles(id_componente , hoja_de_datos , longitud , ancho 
, peso ,material, voltaje_recomendado , voltaje_min_entrada , voltaje_max_entrada)values
(31 , 'https://www.mouser.com/datasheet/2/891/esp-wroom-32_datasheet_en-1223836.pdf' 
, '154mm' , '132mm' , '0.120 g' , 'Aluminio' , '2.7 a 3.6 VDC' , '2.7 VDC' , '3.6 VDC');


-- ---------------------------------------------------------------------------
-- ---------------------------------------------------------------------------


-- ==============================================
-- ======= TABLA TRANSISTORES_BIPOLARES==========
-- ==============================================

select * from componentes;
select * from componentes_detalles;
select * from transistores_bipolares;
select * from information_schema.columns where table_name='transistores_bipolares';


delete from transistores_bipolares where id_componente = 8 and tipo ='NPN';

select * from componentes where id = 8;

insert into transistores_bipolares(id_componente , tipo , voltaje_colec_emis
, voltaje_colec_base , voltaje_emis_base , voltaje_colec_emis_sat , corriente_colec 
, ganancia_hfe , disip_max , temp_juntura)values
(8 , 'NPN' , '-25 VDC' , '-25 VDC' , '-12 VDC' , '-5 VDC' , '1.8 A' , '25'  ,'15 W' , '130°C' );




-- ---------------------------------------------------------------------------
-- ---------------------------------------------------------------------------


-- =============================================
-- ======= TABLA TRANSISTORES_MOSFET ===========
-- =============================================

select * from componentes;
select * from componentes_detalles;
select * from transistores_mosfet;
select * from information_schema.columns where table_name='transistores_mosfet';



delete from transistores_mosfet  where tipo ='pMOS' and corriente_cc_drenaje = '6.2 A';

insert into transistores_mosfet(id_componente , tipo , voltaje_drenaje_fuente
, corriente_cc_drenaje , disip_max, temp_op_max , conduct_drenaje_sustrato
, resist_drenaje_fuente)values
(9 , 'pMOS' , '35 VDC' , '6.2 A' , '30W' , '150°C' , ' 90(115) pF' , '0.032(0.064) Ohm');


-- ---------------------------------------------------------------------------
-- ---------------------------------------------------------------------------


-- ====================================================
-- ======= TABLA CAPACITORES_ELECTROLITICOS ===========
-- ====================================================

select * from componentes;
select * from componentes_detalles;
select * from capacitores_electroliticos;
select * from information_schema.columns where table_name='capacitores_electroliticos';


delete from capacitores_electroliticos where tipo = 'Plomo Radial Encaje a Presión' 
and rango_tension_nominal = '25  220 VDC';

insert into capacitores_electroliticos(id_componente , tipo , capacitancia
, tolerancia , rango_temperatura , rango_tension_nominal)values
(18 , 'Plomo Radial Encaje a Presión' , '110  1,200 µF' , '40/+10%' , '10 to +120°C' , '25  220 VDC');


-- ---------------------------------------------------------------------------
-- ---------------------------------------------------------------------------


-- ====================================================
-- ======= TABLA RESISTORES_ALTA_FRECUENCIA ===========
-- ====================================================

select * from componentes;
select * from componentes_detalles;
select * from resistores_alta_frecuencia;
select * from information_schema.columns where table_name='resistores_alta_frecuencia';


delete from resistores_alta_frecuencia where id_componente = 20;


 
insert into resistores_alta_frecuencia(id_componente, capacitancia ,rango_tolerancia
, rango_resis_gral , rango_resis_microondas , capacitancia_parasita , rango_temperatura , tension_operativa
)values( 20 , '4' , ' +- 40 standard' , '15 to 90' , '+- 120' , '-' , ' -' , '120 max.');




-- ---------------------------------------------------------------------------
-- ---------------------------------------------------------------------------


-- ==========================================================
-- ======= TABLA MICROCONTROLADORES_ESPECIF ===============
-- ==========================================================

select * from componentes;
select * from componentes_detalles;
select * from microcontroladores_especif;
select * from information_schema.columns where table_name='microcontroladores_especif';


delete from microcontroladores_especif where estilo_montaje = 'SMD/SMT';



insert into microcontroladores_especif (empaquetado, estilo_montaje, cantidad_entr_sal
, temp_funcionamiento, comunic_protocolos, frec_operacion) values
('Tray Alternate Packaging', 'SMD/SMT', '36 E/S', '-40°C ~ 85°C (TA)', 'I²C, SPI, UART/USART', ' DC-40 Mhz'),
('Standard Packaging', 'SMD/SMT', '40 E/S', '-60°C ~ 115°C (TA)', 'SPI, UART/USART', ' DC-40 Mhz'),
('Production Packaging', 'SMD/SMT', '50 E/S', '-80°C ~ 130°C (TA)', 'SPI, UART/USART', ' DC-50 Mhz'),
('Standard Packaging', 'SMD/SMT', '45 E/S', '-70°C ~ 115°C (TA)', 'UART/USART', ' DC-60 Mhz');



select * from microcontroladores_risc_pics;

insert into microcontroladores_risc_pics(id_componente, id_especificacion
, memoria_programa , memoria_datos , memoria_datos_eeprom , cantidad_fuentes_interrup
, cantidad_timers, set_instrucciones ) values 
(21, 5 , '16384 bytes' , '768 bytes' , '256 bytes' , 19 , 4 
, '75 Instructions; 83 with Extended Instruction Set Enabled');



insert into microcontroladores_risc_pics(id_componente, id_especificacion
, memoria_programa , memoria_datos , memoria_datos_eeprom , cantidad_fuentes_interrup
, cantidad_timers, set_instrucciones ) values 
(22 , 6, '21444 bytes' , '1200 bytes' , '256 bytes' , 19 , 4
, '115 with Extended Instruction Set Enabled');



select * from microcontroladores_risc_avrs;

insert into microcontroladores_risc_avrs(id_componente, id_especificacion
, tam_nucleo, tam_memoria_programa , tipo_memoria) values 
(23, 7, '8 bits' , '32KB (16K x 16)' , 'Memoria Flash');


insert into microcontroladores_risc_avrs(id_componente, id_especificacion
, tam_nucleo, tam_memoria_programa , tipo_memoria) values 
(24, 8, '8 bits' , '36KB (18K x 16)' , 'Memoria Flash');



-- ---------------------------------------------------------------------------
-- ---------------------------------------------------------------------------


-- ==========================================================
-- ======= TABLA MICROCONTROLADORES_RISC_PICS ===============
-- ==========================================================
select * from componentes;
select * from componentes_detalles;
select * from microcontroladores_risc_pics;
select * from information_schema.columns where table_name='microcontroladores_risc_pics';


delete from microcontroladores_risc_pics where id_especificacion = 6;

insert into microcontroladores_risc_pics(id_componente, id_especificacion
, memoria_programa , memoria_datos , memoria_datos_eeprom , cantidad_fuentes_interrup
, cantidad_timers, set_instrucciones ) values 
(22 , 6, '21444 bytes' , '1200 bytes' , '256 bytes' , 19 , 4
, '115 with Extended Instruction Set Enabled');


-- ---------------------------------------------------------------------------
-- ---------------------------------------------------------------------------


-- ==========================================================
-- ======= TABLA MICROCONTROLADORES_RISC_AVRS ===============
-- ==========================================================
select * from componentes;
select * from componentes_detalles;
select * from microcontroladores_risc_avrs;
select * from information_schema.columns where table_name='microcontroladores_risc_avrs';

delete from microcontroladores_risc_avrs where id = 4;


insert into microcontroladores_risc_avrs(id_componente, id_especificacion
, tam_nucleo, tam_memoria_programa , tipo_memoria) values 
(24, 8, '8 bits' , '36KB (18K x 16)' , 'Memoria Flash');


-- ---------------------------------------------------------------------------
-- ---------------------------------------------------------------------------


-- ======================================
-- ======= TABLA PLACAS_ARDUINO =========
-- ======================================
select * from componentes;
select * from componentes_detalles;
select * from placas_arduinos;
select * from information_schema.columns where table_name='placas_arduinos';


delete from placas_arduinos where procesador = 'ATmega328p';

insert into placas_arduinos(id_componente , procesador
, frec_mem , tam_flash , tam_sram , tam_eeprom , cantidad_entr_sal 
, comunic_protocolos ) values 
(26 ,'ATmega328p' , '16 MHz' , '32KB Flash' , '2 KB' , '1 KB' 
, 14 , 'I²C, SPI, UART/USART');



-- ---------------------------------------------------------------------------
-- ---------------------------------------------------------------------------


-- ======================================
-- ======= TABLA PLACAS_ESP8266 =========
-- ======================================

select * from componentes;
select * from componentes_detalles;
select * from placas_esp8266;
select * from information_schema.columns where table_name='placas_esp8266';

delete from placas_esp8266 where id = 2;

insert into placas_esp8266(id_componente , procesador
, frec_mem , tam_flash , tam_sram , cantidad_entr_sal , comunic_protocolos
, prot_wifi, rango_frec ) values 
(28 ,'CPU RISC de 32-bit: Tensilica Xtensa LX1012 ' , '80 MHz' , '200 KB a 2 MB' , '45 KB'  
, 9 , 'UART/SDIO/SPI/I2C' , '802.11 b/g/n' , '2.4G-2.5G (2400M-2483.5M)');



-- ---------------------------------------------------------------------------
-- ---------------------------------------------------------------------------


-- ====================================
-- ======= TABLA PLACAS_ESP32 =========
-- ====================================

select * from componentes;
select * from componentes_detalles;
select * from placas_esp32;
select * from information_schema.columns where table_name='placas_esp32';


delete from placas_esp32 where id = 3;

select * from componentes;


insert into placas_esp32(id_componente , procesador
, frec_mem , tam_flash , tam_sram  , comunic_protocolos
, prot_wifi, rango_frec, modo_wifi , seg_wifi , prot_bluetooth) values 
(31 ,'ARM Xtensa single-/dual-core 32-bit LX6' , '-' , '-' , '-'  
 , 'UART/SDIO/SPI/I2C/I2S/IR Remote Control' ,'802.11 b/g/n (802.11n up to 150 Mbps)'
 , '2.4G-2.5G ' , 'Station/SoftAP/SoftAP+Station/P2P' , 'WPA/WPA2/WPA2-Enterprise/WPS'
 , 'Bluetooth v4.2 BR/EDR and BLE specification');
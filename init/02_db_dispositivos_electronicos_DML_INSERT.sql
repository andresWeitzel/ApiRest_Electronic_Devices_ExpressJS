/* -----------------------------------------
 * ------ DISPOSITIVOS ELECTRONICOS  ---------
 * -----------------------------------------
 * 
 * 
 * ========= DML INSERT =============
 */

-- Delete records
delete from componentes cascade ;
delete from componentes_detalles cascade;
delete from transistores_bipolares cascade;
delete from transistores_mosfet cascade;
delete from capacitores_electroliticos cascade;
delete from resistores_alta_frecuencia cascade;
delete from microcontroladores_especif cascade ;
delete from microcontroladores_risc_pics cascade ;
delete from microcontroladores_risc_avrs cascade ;
delete from placas_arduinos cascade;
delete from placas_esp8266 cascade;
delete from placas_esp32 cascade;


-- Restart sequences
alter sequence id_seq_comp restart;
alter sequence id_seq_comp_det restart;
alter sequence id_seq_trans_bip restart;
alter sequence id_seq_cap_elect restart;
alter sequence id_seq_resis_alt_frec restart;
alter sequence id_seq_micr_especif restart;
alter sequence id_seq_micr_risc_pics restart;
alter sequence id_seq_micr_risc_avrs restart;
alter sequence id_seq_plac_arduinos restart;
alter sequence id_seq_plac_esp8266 restart;
alter sequence id_seq_plac_esp32 restart;


-- ---------------------------------------------------------------------------
-- ---------------------------------------------------------------------------


-- =====================================
-- ======= TABLA COMPONENTES ===========
-- =====================================


select * from componentes;
select * from information_schema.columns where table_name='componentes';

-- ----- INSERTS TRANSISTORES BJT ------
insert into componentes(codigo , imagen , nro_pieza , categoria , descripcion , fabricante , stock , precio) values
('HDGHFK-KSH13005' , 'https://raw.githubusercontent.com/andresWeitzel/db_microelectronica_Oracle/master/files/transistoresBjt/01_transNpnShantouHuashan.jpg' 
,'KSH13005' , 'Transistores BJT' , 'Transistor BJT NPN', 'SHANTOU HUASHAN', 300, 2.0
);

insert into componentes(codigo , imagen , nro_pieza , categoria , descripcion , fabricante , stock , precio) values
('DFHSDK-3CD010G' , 'https://raw.githubusercontent.com/andresWeitzel/db_microelectronica_Oracle/master/files/transistoresBjt/02_transPnpInchangeSemiConduc.jpg' 
,'3CD010G' , 'Transistores BJT' , 'Transistor BJT PNP', 'INCHANGE SEMICONDUCTOR', 400, 5.0
);

insert into componentes(codigo , imagen , nro_pieza , categoria , descripcion , fabricante , stock , precio) values
('JSHDLO-112JK8' , 'https://raw.githubusercontent.com/andresWeitzel/db_microelectronica_Oracle/master/files/transistoresBjt/03_transNpnCentralSemiConduc.webp' 
,'112JK8' , 'Transistores BJT' , 'Transistor BJT NPN', 'CENTRAL SEMICONDUCTOR', 200, 10.0
);

insert into componentes(codigo , imagen , nro_pieza , categoria , descripcion , fabricante , stock , precio) values
('KSJSDK-3CD005H' , 'https://raw.githubusercontent.com/andresWeitzel/db_microelectronica_Oracle/master/files/transistoresBjt/04_transPnpCentralSemiConduc.jpg' 
,'3CD005H' , 'Transistores BJT' , 'Transistor BJT PNP', 'CENTRAL SEMICONDUCTOR', 320, 6.0
);

insert into componentes(codigo , imagen , nro_pieza , categoria , descripcion , fabricante , stock , precio) values
('JSKSHDD-10QQKAA' , 'https://raw.githubusercontent.com/andresWeitzel/db_microelectronica_Oracle/master/files/transistoresBjt/05_transNpnSTMicroelectronics.webp' 
,'10QQKAA' , 'Transistores BJT' , 'Transistor BJT NPN', 'STMicroelectronics', 212, 4.0
);

insert into componentes(codigo , imagen , nro_pieza , categoria , descripcion , fabricante , stock , precio) values
('KALDSHY-222AASA' , 'https://raw.githubusercontent.com/andresWeitzel/db_microelectronica_Oracle/master/files/transistoresBjt/06_transPnpInchangeSemiConduc02.webp' 
,'222AASA' , 'Transistores BJT' , 'Transistor BJT PNP', 'INCHANGE SEMICONDUCTOR', 120, 3.0
);

insert into componentes(codigo , imagen , nro_pieza , categoria , descripcion , fabricante , stock , precio) values
('JAKYQQW-918SPAA' , 'https://raw.githubusercontent.com/andresWeitzel/db_microelectronica_Oracle/master/files/transistoresBjt/07_transNpnRenesasElectr.jpg' 
,'918SPAA' , 'Transistores BJT' , 'Transistor BJT NPN', 'Renesas Electronics', 100, 9.0
);

insert into componentes(codigo , imagen , nro_pieza , categoria , descripcion , fabricante , stock , precio) values
('KSUTEYU-9A0SNS' , 'https://raw.githubusercontent.com/andresWeitzel/db_microelectronica_Oracle/master/files/transistoresBjt/08_transPnpRenesasElectr.webp' 
,'9A0SNS' , 'Transistores BJT' , 'Transistor BJT PNP', 'RENESAS ELECTRONIC', 310, 8.0
);




-- ----- INSERTS TRANSISTORES MOSFET ------

insert into componentes(codigo , imagen , nro_pieza , categoria , descripcion , fabricante , stock , precio) values
 ('JDHFYT-AP4519GED' , 'https://raw.githubusercontent.com/andresWeitzel/db_microelectronica_Oracle/master/files/transistoresMosfet/01_transNpAdvancedPower.webp'
 ,'AP4519GED' , 'Transistores MOSFET' , 'Transistor Mosfet NP' , 'Advanced Power' , 200 ,4.0
 );
 
 
 insert into componentes(codigo , imagen , nro_pieza , categoria , descripcion , fabricante , stock , precio) values
 ('HJDGHF-SL60N06' , 'https://raw.githubusercontent.com/andresWeitzel/db_microelectronica_Oracle/master/files/transistoresMosfet/02_transNSlkor.webp'
 ,'SL60N06' , 'Transistores MOSFET' , 'Transistor Mosfet N' , 'Slkor' , 50 , 7.0
 );
 



-- ----- INSERTS CAPACITORES ELECTROLITICOS ------

insert into componentes(codigo , imagen , nro_pieza , categoria , descripcion , fabricante , stock , precio) values
 ('009-KLDIUAOASS','https://raw.githubusercontent.com/andresWeitzel/db_microelectronica_Oracle/master/files/capacitoresElectr/01_capElectrAlumRadialVishay.webp' 
 , 'KLDIUAOASS' , 'Capacitores Electroliticos' , 'Capacitor Electrolitico de Aluminio Radial' , 'VISHAY', 20 , 1);
 
  insert into componentes(codigo , imagen , nro_pieza , categoria , descripcion , fabricante , stock , precio) values
 ('3097-JKSJHSBS6DVBDG','https://raw.githubusercontent.com/andresWeitzel/db_microelectronica_Oracle/master/files/capacitoresElectr/02_capElectrAlumAxialVishay.webp' 
 , 'BS6DVBDG' , 'Capacitores Electroliticos' , 'Capacitor Electrolitico de Aluminio Axial' , 'VISHAY', 18 , 1.6);
 
   insert into componentes(codigo , imagen , nro_pieza , categoria , descripcion , fabricante , stock , precio) values
 ('KLSIO9-A0EOSAA','https://raw.githubusercontent.com/andresWeitzel/db_microelectronica_Oracle/master/files/capacitoresElectr/03_Capacitor%20Electrolitico%20de%20Polimero%20Organico%20panasonic.jpg' 
 , 'A0EOSAA' , 'Capacitores Electroliticos' , 'Capacitor Electrolitico de Polimero Organico' , 'PANASONIC', 50 , 2);
 
 
   insert into componentes(codigo , imagen , nro_pieza , categoria , descripcion , fabricante , stock , precio) values
 ('LSÑK871-JSKU99','https://raw.githubusercontent.com/andresWeitzel/db_microelectronica_Oracle/master/files/capacitoresElectr/04_Capacitor%20Electrolitico%20de%20Aluminio%20Encaje%20a%20Presi%C3%B3n%20hitachi.webp' 
 , 'JSKU99' , 'Capacitores Electroliticos' , 'Capacitor Electrolitico de Aluminio Encaje a Presión' , 'HITACHI', 67 , 3);
 
   insert into componentes(codigo , imagen , nro_pieza , categoria , descripcion , fabricante , stock , precio) values
 ('JSUKOW987-029IOKKL','https://raw.githubusercontent.com/andresWeitzel/db_microelectronica_Oracle/master/files/capacitoresElectr/05_Capacitor%20Electrolitico%20de%20Aluminio%20Terminal%20Roscado%20elna.webp' 
 , '029IOKKL' , 'Capacitores Electroliticos' , 'Capacitor Electrolitico de Aluminio Terminal Roscado' , 'ELNA', 34 , 5);
 
   insert into componentes(codigo , imagen , nro_pieza , categoria , descripcion , fabricante , stock , precio) values
 ('LAKSHJ7-0SOJD7DD','https://raw.githubusercontent.com/andresWeitzel/db_microelectronica_Oracle/master/files/capacitoresElectr/06_Capacitor%20Electrolitico%20de%20Aluminio%20Axial%20suncon.webp' 
 , '0SOJD7DD' , 'Capacitores Electroliticos' , 'Capacitor Electrolitico de Aluminio Axial' , 'SUNCON', 22 , 2.5);
 
   insert into componentes(codigo , imagen , nro_pieza , categoria , descripcion , fabricante , stock , precio) values
 ('KSLPO0AH7-JS8SJ9KA','https://raw.githubusercontent.com/andresWeitzel/db_microelectronica_Oracle/master/files/capacitoresElectr/07_Capacitor%20Electrolitico%20de%20Aluminio%20Radial%20hitachi.jpg' 
 , 'JS8SJ9KA' , 'Capacitores Electroliticos' , 'Capacitor Electrolitico de Aluminio Radial' , 'HITACHI', 11 , 2.6);
 
   insert into componentes(codigo , imagen , nro_pieza , categoria , descripcion , fabricante , stock , precio) values
 ('ISUYTY89-0A0SHHHS','https://raw.githubusercontent.com/andresWeitzel/db_microelectronica_Oracle/master/files/capacitoresElectr/08_Capacitor%20Electrolitico%20de%20Aluminio%20Terminal%20Roscado%20rubycon.webp' 
 , '0A0SHHHS' , 'Capacitores Electroliticos' , 'Capacitor Electrolitico de Aluminio Terminal Roscado' , 'RUBYCON', 32 , 2.5);
 


-- ----- INSERTS RESISTORES ALTA FRECUENCIA ------

insert into componentes(codigo , imagen , nro_pieza , categoria , descripcion , fabricante , stock , precio) values
 ('594-MIF2500BFKMGNHT5' , 'https://raw.githubusercontent.com/andresWeitzel/db_microelectronica_Oracle/master/files/resisAltaFrec/01_Resistores%20de%20alta%20frecuencia%20RF%2025ohms%201%25%20100ppm%20vishay.webp' 
 , 'FKMGNHT5' , 'Resistores de Alta Frecuencia' , 'Resistores de alta frecuencia RF 25ohms 1% 100ppm' 
 , 'VISHAY' , 800 , 5);

 insert into componentes(codigo , imagen , nro_pieza , categoria , descripcion , fabricante , stock , precio) values
 ('581-CS12010T0100GTR' , 'https://raw.githubusercontent.com/andresWeitzel/db_microelectronica_Oracle/master/files/resisAltaFrec/02_Resistores%20de%20alta%20frecuencia%20RF%20100ohms%202%25%2010W%20kyshocera.webp' 
 , 'T0100GTR' , 'Resistores de Alta Frecuencia' , 'Resistores de alta frecuencia RF 100ohms 2% 10W' 
 , 'KYSHOCERA' , 1200 , 3);
 



-- ----- INSERTS MICROCONTROLADORES_RISC_PICS ------

insert into componentes(codigo , imagen , nro_pieza , categoria , descripcion , fabricante , stock , precio) values
 ('HSFGDTTEE-KY0-PIC18F4520-I/PT' , 'https://raw.githubusercontent.com/andresWeitzel/db_microelectronica_Oracle/master/files/microsRiscPics/01_Microcontrolador%20PIC18F4520-IPT%20microcrip.webp' 
 , 'KY0-PIC18F4520-I/PT' , 'Microcontroladores PICS' , 'Microcontrolador PIC18F4520-I/PT' , 'Microchip' , 40 , 20 );

insert into componentes(codigo , imagen , nro_pieza , categoria , descripcion , fabricante , stock , precio) values
 ('HJDYETU-KY32-PIC-00130-001' , 'https://raw.githubusercontent.com/andresWeitzel/db_microelectronica_Oracle/master/files/microsRiscPics/02_Microcontrolador%20PIC-00130-001%20t-winds.webp' 
 , 'KY32-PIC-00130-001' , 'Microcontroladores PICS' , 'Microcontrolador PIC-00130-001' , 'T-Wins' , 34 , 30 );
 



-- ----- INSERTS MICROCONTROLADORES_RISC_AVRS ------

insert into componentes(codigo , imagen , nro_pieza , categoria , descripcion , fabricante , stock , precio) values
 ('ATMEGA32-16AURTR-ND' , 'https://raw.githubusercontent.com/andresWeitzel/db_microelectronica_Oracle/master/files/microsRiscAvrs/01_Microcontrolador%20AVR%20ATMEGA32-16AURmicrochip.webp' 
 , '16AURTR-ND' , 'Microcontroladores AVRS' , 'Microcontrolador AVR ATMEGA32-16AUR' , 'Microchip Technology' , 10 , 30 );
 

insert into componentes(codigo , imagen , nro_pieza , categoria , descripcion , fabricante , stock , precio) values
 ('ATMEGA328P-MUR-JKSHJ67' , 'https://raw.githubusercontent.com/andresWeitzel/db_microelectronica_Oracle/master/files/microsRiscAvrs/02_Microcontrolador%20AVR%20ATMEGA328P-MUR%20microchip.jpg' 
 , 'MUR-JKSHJ67' , 'Microcontroladores AVRS' , 'Microcontrolador AVR ATMEGA328P-MUR' , 'Microchip Technology' , 15 , 25 );
 
    


-- ----- INSERTS PLACAS_ARDUINO ------

insert into componentes(codigo , imagen , nro_pieza , categoria , descripcion , fabricante , stock , precio) values
 ('KSHJETA-ARDUINO-UNO' , 'https://raw.githubusercontent.com/andresWeitzel/db_microelectronica_Oracle/master/files/placasArduino/01_Placa%20Arduino%20Uno%20R3.webp' 
 , 'ETA-ARDUINO-UNO' , 'Placas Arduino' , 'Placa Arduino Uno R3' , 'Arduino' , 30 , 10 );

 
insert into componentes(codigo , imagen , nro_pieza , categoria , descripcion , fabricante , stock , precio) values
 ('JSHYUTT-ARDUINO-NANO' , 'https://raw.githubusercontent.com/andresWeitzel/db_microelectronica_Oracle/master/files/placasArduino/02_Placa%20Arduino%20Nano%20V3.0.webp' 
 , 'UTT-ARDUINO-NANO' , 'Placas Arduino' , 'Placa Arduino Nano V3.0' , 'Arduino' , 40 , 8 );




-- ----- INSERTS PLACAS_ESP8266------

insert into componentes(codigo , imagen , nro_pieza , categoria , descripcion , fabricante , stock , precio) values
 ('2471S0A-ESP8266' , 'https://raw.githubusercontent.com/andresWeitzel/db_microelectronica_Oracle/master/files/placasEsp8266/01_Placa%20Esp8266%20EX.webp' 
 , '0A-ESP8266' , 'Placas Esp8266' , 'Placa Esp8266 EX' , 'Espressif Systems' , 10 , 10 );

 
insert into componentes(codigo , imagen , nro_pieza , categoria , descripcion , fabricante , stock , precio) values
 ('JD76FG6-DOIT-WEMOS-Mini' , 'https://raw.githubusercontent.com/andresWeitzel/db_microelectronica_Oracle/master/files/placasEsp8266/02_Placa%20Wemos%20D1%20Mini.webp' 
 , 'DOIT-WEMOS-Mini' , 'Placas Esp8266' , 'Placa Wemos D1 Mini' , 'Wemos' , 12 , 8 );
 



-- ----- INSERTS PLACAS_ESP32------

insert into componentes(codigo , imagen , nro_pieza , categoria , descripcion , fabricante , stock , precio) values
 ('HJSHKWROOM-ESP32' , 'https://raw.githubusercontent.com/andresWeitzel/db_microelectronica_Oracle/master/files/placasEsp32/01_Placa%20Esp32%20WROOM%2032ue.webp' 
 , 'WROOM-ESP32' , 'Placas Esp32' , 'Placa Esp32 WROOM 32ue' , 'Espressif Systems' , 5 , 20 );


insert into componentes(codigo , imagen , nro_pieza , categoria , descripcion , fabricante , stock , precio) values
 ('H789DHJUi-ESP32' , 'https://raw.githubusercontent.com/andresWeitzel/db_microelectronica_Oracle/master/files/placasEsp32/02_Placa%20ESP32%20WROOM.webp' 
 , 'DHJUi-ESP32i' , 'Placas Esp32' , 'Placa ESP32 WROOM' , 'Espressif Systems' , 5 , 15  );



-- ---------------------------------------------------------------------------
-- ---------------------------------------------------------------------------


-- ==============================================
-- ======= TABLA COMPONENTES_DETALLES ===========
-- ==============================================

select * from componentes_detalles;


-- ----- INSERTS TRANSISTORES BJT ------

insert into componentes_detalles(id_componente , hoja_de_datos , longitud , ancho 
, peso ,material, voltaje_recomendado , voltaje_min_entrada , voltaje_max_entrada)values
(1 , 'https://www.alldatasheet.com/datasheet-pdf/pdf/335783/HUASHAN/KSH13005.html?gclid=CjwKCAiAlrSPBhBaEiwAuLSDUFeS6YrIZoRclGdfPAGVxkvXDpENZQ76uvZ1PCot50KcnlLYfYgNwBoCdwoQAvD_BwE' 
, '45mm' , '25mm' , '0.23 g' , 'silicio' , '25 VDC' , '12 VDC', '40 VDC');

insert into componentes_detalles(id_componente , hoja_de_datos , longitud , ancho 
, peso ,material, voltaje_recomendado , voltaje_min_entrada , voltaje_max_entrada)values
(2 , 'https://alltransistors.com/adv/pdfdatasheet_inchange_semiconductor/3cd010g.pdf' 
, '39mm' , '22mm' , '0.19 g' , 'silicio' , '5 VDC' , '-24 VDC', '20 VDC');

insert into componentes_detalles(id_componente , hoja_de_datos , longitud , ancho 
, peso ,material, voltaje_recomendado , voltaje_min_entrada , voltaje_max_entrada)values
(3 , 'https://category.alldatasheet.com/index.jsp?components=TRANSISTOR' 
, '47mm' , '32mm' , '0.27 g' , 'silicio' , '12 VDC' , '-24 VDC', '20 VDC');

insert into componentes_detalles(id_componente , hoja_de_datos , longitud , ancho 
, peso ,material, voltaje_recomendado , voltaje_min_entrada , voltaje_max_entrada)values
(4 , 'https://www.alldatasheet.com/datasheet-pdf/pdf/907361/ROHM/DTA143EMFHA.html' 
, '41mm' , '28mm' , '0.25 g' , 'silicio' , '5 VDC' , '-12 VDC', '35 VDC');

insert into componentes_detalles(id_componente , hoja_de_datos , longitud , ancho 
, peso ,material, voltaje_recomendado , voltaje_min_entrada , voltaje_max_entrada)values
(5 , 'https://www.alldatasheet.com/datasheet-pdf/pdf/907361/ROHM/DTA143EMFHA.html' 
, '37mm' , '19mm' , '0.16 g' , 'silicio' , '5 VDC' , '-24 VDC', '20 VDC');

insert into componentes_detalles(id_componente , hoja_de_datos , longitud , ancho 
, peso ,material, voltaje_recomendado , voltaje_min_entrada , voltaje_max_entrada)values
(6 , 'https://alltransistors.com/adv/pdfdatasheet_inchange_semiconductor/3cd010g.pdf' 
, '39mm' , '22mm' , '0.19 g' , 'silicio' , '5 VDC' , '-24 VDC', '25 VDC');

insert into componentes_detalles(id_componente , hoja_de_datos , longitud , ancho 
, peso ,material, voltaje_recomendado , voltaje_min_entrada , voltaje_max_entrada)values
(7 , 'https://www.alldatasheet.com/datasheet-pdf/pdf/1131400/ROHM/DTC124EU3HZG.html' 
, '26mm' , '21mm' , '0.18 g' , 'silicio' , '3.3 VDC' , '-12 VDC', '12 VDC');

insert into componentes_detalles(id_componente , hoja_de_datos , longitud , ancho 
, peso ,material, voltaje_recomendado , voltaje_min_entrada , voltaje_max_entrada)values
(8 , 'https://www.alldatasheet.com/datasheet-pdf/pdf/1131400/ROHM/DTC124EU3HZG.html' 
, '29mm' , '19mm' , '0.23 g' , 'silicio' , '3.3 VDC' , '-30 VDC', '30 VDC');




-- ----- INSERTS TRANSISTORES MOSFET ------

insert into componentes_detalles(id_componente , hoja_de_datos , longitud , ancho 
, peso ,material, voltaje_recomendado , voltaje_min_entrada , voltaje_max_entrada)values
(9 , 'https://alltransistors.com/es/mosfet/transistor.php?transistor=18313' 
, '56mm' , '38mm' , '0.45 g' , ' metal-óxido-silicio' , '35 VDC' , '20 VDC', '100 VDC');


insert into componentes_detalles(id_componente , hoja_de_datos , longitud , ancho 
, peso ,material, voltaje_recomendado , voltaje_min_entrada , voltaje_max_entrada)values
(10 , 'https://alltransistors.com/adv/pdfdatasheet_slkor/sl60n06.pdf' 
, '64mm' , '31mm' , '0.67 g' , ' metal-óxido-silicio' , '40 VDC' , '5 VDC', '60 VDC');





-- ----- INSERTS CAPACITORES ELECTROLITICOS ------
insert into componentes_detalles(id_componente , hoja_de_datos , longitud , ancho 
, peso ,material, voltaje_recomendado , voltaje_min_entrada , voltaje_max_entrada)values
(11 , 'https://ar.mouser.com/datasheet/2/427/136rvi-2888792.pdf' , '71mm' , '21mm' , '0.97 g' , 'electrolito'
, '10 a 100 VDC' , '10 VDC' , '100 VDC');


insert into componentes_detalles(id_componente , hoja_de_datos , longitud , ancho 
, peso ,material, voltaje_recomendado , voltaje_min_entrada , voltaje_max_entrada)values
(12 , 'https://ar.mouser.com/datasheet/2/212/1/KEM_A4095_PEG228-1919468.pdf' ,  '76mm' , '19mm' , '0.87 g' , 'electrolito'
, '25 a 64 VDC' , '10 VDC' , '100 VDC');

insert into componentes_detalles(id_componente , hoja_de_datos , longitud , ancho 
, peso ,material, voltaje_recomendado , voltaje_min_entrada , voltaje_max_entrada)values
(13 , 'https://ar.mouser.com/c/ds/passive-components/capacitors/aluminum-electrolytic-capacitors/aluminum-electrolytic-capacitors-screw-terminal/' ,  '76mm' , '19mm' , '0.87 g' , 'electrolito'
, '12 a 45 VDC' , '12 VDC' , '60 VDC');


insert into componentes_detalles(id_componente , hoja_de_datos , longitud , ancho 
, peso ,material, voltaje_recomendado , voltaje_min_entrada , voltaje_max_entrada)values
(14 , 'https://ar.mouser.com/c/ds/passive-components/capacitors/aluminum-electrolytic-capacitors/aluminum-electrolytic-capacitors-screw-terminal/' ,  '76mm' , '19mm' , '0.87 g' , 'electrolito'
, '110 a 220 VDC' , '110 VDC' , '220 VDC');


insert into componentes_detalles(id_componente , hoja_de_datos , longitud , ancho 
, peso ,material, voltaje_recomendado , voltaje_min_entrada , voltaje_max_entrada)values
(15 , 'https://ar.mouser.com/c/ds/passive-components/capacitors/aluminum-electrolytic-capacitors/aluminum-electrolytic-capacitors-screw-terminal/' ,  '76mm' , '19mm' , '0.87 g' , 'electrolito'
, '25 a 45 VDC' , '10 VDC' , '50 VDC');


insert into componentes_detalles(id_componente , hoja_de_datos , longitud , ancho 
, peso ,material, voltaje_recomendado , voltaje_min_entrada , voltaje_max_entrada)values
(16 , 'https://ar.mouser.com/c/ds/passive-components/capacitors/aluminum-electrolytic-capacitors/aluminum-electrolytic-capacitors-screw-terminal/' ,  '76mm' , '19mm' , '0.87 g' , 'electrolito'
, '12 a 24 VDC' , '12 VDC' , '24 VDC');


insert into componentes_detalles(id_componente , hoja_de_datos , longitud , ancho 
, peso ,material, voltaje_recomendado , voltaje_min_entrada , voltaje_max_entrada)values
(17 , 'https://ar.mouser.com/c/ds/passive-components/capacitors/aluminum-electrolytic-capacitors/aluminum-electrolytic-capacitors-screw-terminal/' ,  '76mm' , '19mm' , '0.87 g' , 'electrolito'
, '5 a 24 VDC' , '5 VDC' , '35 VDC');


insert into componentes_detalles(id_componente , hoja_de_datos , longitud , ancho 
, peso ,material, voltaje_recomendado , voltaje_min_entrada , voltaje_max_entrada)values
(18 , 'https://ar.mouser.com/c/ds/passive-components/capacitors/aluminum-electrolytic-capacitors/aluminum-electrolytic-capacitors-screw-terminal/' ,  '76mm' , '19mm' , '0.87 g' , 'electrolito'
, '25 a 110 VDC' , '10 VDC' , '110 VDC');




-- ----- INSERTS RESISTORES DE ALTA FRECUENCIA------
insert into componentes_detalles(id_componente , hoja_de_datos , longitud , ancho 
, peso ,material, voltaje_recomendado , voltaje_min_entrada , voltaje_max_entrada)values
(19 , 'https://www.vishay.com/docs/61038/mif.pdf' ,  '19mm' , '12mm' , '0.11 g' , 'Nitrito de Tantanio'
, '0 a 300 VDC' , '0 VDC' , '400 VDC');


insert into componentes_detalles(id_componente , hoja_de_datos , longitud , ancho 
, peso ,material, voltaje_recomendado , voltaje_min_entrada , voltaje_max_entrada)values
(20 , 'https://ar.mouser.com/datasheet/2/40/resistive_prod_cs-1920496.pdf' , '17mm' , '9mm' , '0.08 g' , 'Nitrito de Tantanio'
, '0 a 300 VDC' , '0 VDC' , '400 VDC');





-- ----- INSERTS MICROCONTROLADORES_RISC_PICS ------

insert into componentes_detalles(id_componente , hoja_de_datos , longitud , ancho 
, peso ,material, voltaje_recomendado , voltaje_min_entrada , voltaje_max_entrada)values
(21 , 'https://www.kynix.com/uploadfiles/pdf8798/PIC18F4520-I2fPT_10386.pdf' , '189mm' , '110mm' , '0.110 g' , 'Metal'
, '2 a 5.5 VDC' , '2.0 VDC' , '5.5 VDC');

insert into componentes_detalles(id_componente , hoja_de_datos , longitud , ancho 
, peso ,material, voltaje_recomendado , voltaje_min_entrada , voltaje_max_entrada)values
(22 , 'https://www.alldatasheet.com/view.jsp?Searchword=PIC-00130-001' ,  '192mm' , '190mm' , '0.130 g' , 'Metal'
, '4.5 a 17 VDC' , '4.5 VDC' , '17 VDC');



-- ----- INSERTS MICROCONTROLADORES_RISC_AVRS ------

insert into componentes_detalles(id_componente , hoja_de_datos , longitud , ancho 
, peso ,material, voltaje_recomendado , voltaje_min_entrada , voltaje_max_entrada)values
(23 , 'https://ww1.microchip.com/downloads/en/DeviceDoc/2503S.pdf' , '212mm' , '112mm' , '0.180 g' , 'Metal'
, '2.7 a 5.5 VDC' , '2.7 VDC' , '5.5 VDC');


insert into componentes_detalles(id_componente , hoja_de_datos , longitud , ancho 
, peso ,material, voltaje_recomendado , voltaje_min_entrada , voltaje_max_entrada)values
(24 , 'https://www.farnell.com/datasheets/2047852.pdf' , '222mm' , '177mm' , '0.123 g' , 'Metal'
, '1.8 a 5.5 VDC' , '1.8 VDC' , '5.5 VDC');





-- ----- INSERTS PLACAS ARDUINO------

insert into componentes_detalles(id_componente , hoja_de_datos , longitud , ancho 
, peso ,material, voltaje_recomendado , voltaje_min_entrada , voltaje_max_entrada)values
(25 , 'https://docs.arduino.cc/resources/datasheets/A000066-datasheet.pdf' ,   '334mm' , '223mm' , '0.230 g' , 'Metal-Aluminio'
, '3.3 a 5.0 VDC' , '3.3 VDC' , '5.0 VDC');

 -- http://www.agspecinfo.com/pdfs/M/MB0016.PDF
insert into componentes_detalles(id_componente , hoja_de_datos , longitud , ancho 
, peso ,material, voltaje_recomendado , voltaje_min_entrada , voltaje_max_entrada)values
(26 , 'http://www.agspecinfo.com/pdfs/M/MB0016.PDF' ,  '324mm' , '224mm' , '0.213 g' , 'Metal-Aluminio'
, '3.0 a 3.3 VDC' , '3.0 VDC' , '3.3 VDC');




-- ----- INSERTS PLACAS_ESP8266------

insert into componentes_detalles(id_componente , hoja_de_datos , longitud , ancho 
, peso ,material, voltaje_recomendado , voltaje_min_entrada , voltaje_max_entrada)values
(27 , 'https://cdn-shop.adafruit.com/product-files/2471/0A-ESP8266__Datasheet__EN_v4.3.pdf' 
, '182mm' , '115mm' , '0.330 g' , 'Aluminio' , '3.0 a 3.6 VDC' , '3.0 VDC' , '3.6 VDC');



insert into componentes_detalles(id_componente , hoja_de_datos , longitud , ancho 
, peso ,material, voltaje_recomendado , voltaje_min_entrada , voltaje_max_entrada)values
(28 , 'https://www.esploradores.com/doitwemos-d1-mini-nodemcu/' , '199mm' , '176mm' , '0.220 g' , 'Aluminio'
, '3.3 a 5.0 VDC' , '3.3 VDC' , '5.0 VDC');


 
-- ----- INSERTS PLACAS_ESP32------

insert into componentes_detalles(id_componente , hoja_de_datos , longitud , ancho 
, peso ,material, voltaje_recomendado , voltaje_min_entrada , voltaje_max_entrada)values
(29 , 'https://pdf1.alldatasheet.com/datasheet-pdf/view/1148034/ESPRESSIF/ESP-WROOM-02U.html' 
, '123mm' , '112mm' , '0.167 g' , 'Aluminio', '2.7 a 3.6 VDC' , '2.7 VDC' , '3.6 VDC');


insert into componentes_detalles(id_componente , hoja_de_datos , longitud , ancho 
, peso ,material, voltaje_recomendado , voltaje_min_entrada , voltaje_max_entrada)values
(30 , 'https://www.mouser.com/datasheet/2/891/esp-wroom-32_datasheet_en-1223836.pdf' 
, '154mm' , '132mm' , '0.120 g' , 'Aluminio' , '2.7 a 3.6 VDC' , '2.7 VDC' , '3.6 VDC');







-- ---------------------------------------------------------------------------
-- ---------------------------------------------------------------------------


-- ================================================
-- ======= TABLA TRANSISTORES_BIPOLARES ===========
-- ================================================


insert into transistores_bipolares(id_componente , tipo , voltaje_colec_emis
, voltaje_colec_base , voltaje_emis_base , voltaje_colec_emis_sat , corriente_colec 
, ganancia_hfe , disip_max , temp_juntura )values
(1 , 'NPN' , '5 VDC' , '0.5 VDC' , '0.2 VDC' , '1.2 VDC' , '0.75 A' , '200' ,'75 W' , '150°C');

insert into transistores_bipolares(id_componente , tipo , voltaje_colec_emis
, voltaje_colec_base , voltaje_emis_base , voltaje_colec_emis_sat , corriente_colec 
, ganancia_hfe , disip_max , temp_juntura)values
(2 , 'PNP' , '-200 VDC' , '-200 VDC' , '-5 VDC' , '-1 VDC' , '1.5 A' , '15'  ,'10 W' , '175°C' );


insert into transistores_bipolares(id_componente , tipo , voltaje_colec_emis
, voltaje_colec_base , voltaje_emis_base , voltaje_colec_emis_sat , corriente_colec 
, ganancia_hfe , disip_max , temp_juntura)values
(3 , 'NPN' , '-110 VDC' , '-220 VDC' , '-3.3 VDC' , '-2.2 VDC' , '2.5 A' , '15'  ,'12 W' , '185°C' );

insert into transistores_bipolares(id_componente , tipo , voltaje_colec_emis
, voltaje_colec_base , voltaje_emis_base , voltaje_colec_emis_sat , corriente_colec 
, ganancia_hfe , disip_max , temp_juntura)values
(4 , 'PNP' , '-200 VDC' , '-200 VDC' , '-5 VDC' , '-5 VDC' , '1.5 A' , '25'  ,'10 W' , '250°C' );

insert into transistores_bipolares(id_componente , tipo , voltaje_colec_emis
, voltaje_colec_base , voltaje_emis_base , voltaje_colec_emis_sat , corriente_colec 
, ganancia_hfe , disip_max , temp_juntura)values
(5 , 'NPN' , '-220 VDC' , '-220 VDC' , '-12 VDC' , '-12 VDC' , '1.5 A' , '5'  ,'15 W' , '120°C' );

insert into transistores_bipolares(id_componente , tipo , voltaje_colec_emis
, voltaje_colec_base , voltaje_emis_base , voltaje_colec_emis_sat , corriente_colec 
, ganancia_hfe , disip_max , temp_juntura)values
(6 , 'PNP' , '-110 VDC' , '-110 VDC' , '-25 VDC' , '-12 VDC' , '1 A' , '15'  ,'25 W' , '330°C' );

insert into transistores_bipolares(id_componente , tipo , voltaje_colec_emis
, voltaje_colec_base , voltaje_emis_base , voltaje_colec_emis_sat , corriente_colec 
, ganancia_hfe , disip_max , temp_juntura)values
(7 , 'PNP' , '-70 VDC' , '-70 VDC' , '-5 VDC' , '-12 VDC' , '2 A' , '25'  ,'30 W' , '230°C' );

insert into transistores_bipolares(id_componente , tipo , voltaje_colec_emis
, voltaje_colec_base , voltaje_emis_base , voltaje_colec_emis_sat , corriente_colec 
, ganancia_hfe , disip_max , temp_juntura)values
(8 , 'NPN' , '-25 VDC' , '-25 VDC' , '-12 VDC' , '-5 VDC' , '1.8 A' , '25'  ,'15 W' , '130°C' );





-- ---------------------------------------------------------------------------
-- ---------------------------------------------------------------------------


-- =============================================
-- ======= TABLA TRANSISTORES_MOSFET ===========
-- =============================================


insert into transistores_mosfet(id_componente , tipo , voltaje_drenaje_fuente
, corriente_cc_drenaje , disip_max, temp_op_max , conduct_drenaje_sustrato
, resist_drenaje_fuente)values
(9 , 'pMOS' , '35 VDC' , '6.2 A' , '30W' , '150°C' , ' 90(115) pF' , '0.032(0.064) Ohm');

insert into transistores_mosfet(id_componente , tipo , voltaje_drenaje_fuente
, corriente_cc_drenaje , disip_max, temp_op_max , conduct_drenaje_sustrato
, resist_drenaje_fuente)values
(10 , 'nMOS' , '100 VDC' , '20A' , '50W' , '240°C' , '-' , '-' );





-- ---------------------------------------------------------------------------
-- ---------------------------------------------------------------------------


-- ====================================================
-- ======= TABLA CAPACITORES_ELECTROLITICOS ===========
-- ====================================================


insert into capacitores_electroliticos(id_componente , tipo , capacitancia
, tolerancia , rango_temperatura , rango_tension_nominal)values
(11 , 'Plomo Radial' , '22 ?F a 10 000 ?F' , '± 20 %' , '-55 °C a +105 °C' , '10 V to 100 V'); 

insert into capacitores_electroliticos(id_componente , tipo , capacitancia
, tolerancia , rango_temperatura , rango_tension_nominal)values
(12 , 'Plomo Axial' , '520  7,000 µF' , '10/+30%' , '40 to +150°C' , '25  63 VDC');


insert into capacitores_electroliticos(id_componente , tipo , capacitancia
, tolerancia , rango_temperatura , rango_tension_nominal)values
(13 , 'Plomo Axial Terminal Roscado' , '220  1,000 µF' , '20/+40%' , '20 to +170°C' , '110  220 VDC');

insert into capacitores_electroliticos(id_componente , tipo , capacitancia
, tolerancia , rango_temperatura , rango_tension_nominal)values
(14 , 'Plomo Axial Encaje a Presión' , '221  2,000 µF' , '30/+50%' , '10 to +187°C' , '60  110 VDC');

insert into capacitores_electroliticos(id_componente , tipo , capacitancia
, tolerancia , rango_temperatura , rango_tension_nominal)values
(15 , 'Plomo Radial' , '559  1,000 µF' , '10/+10%' , '32 to +120°C' , '110  220 VDC');

insert into capacitores_electroliticos(id_componente , tipo , capacitancia
, tolerancia , rango_temperatura , rango_tension_nominal)values
(16 , 'Plomo Axial' , '670  2,200 µF' , '10/+20%' , '12 to +130°C' , '25  110 VDC');

insert into capacitores_electroliticos(id_componente , tipo , capacitancia
, tolerancia , rango_temperatura , rango_tension_nominal)values
(17 , 'Plomo Terminal Roscado' , '670  2,100 µF' , '30/+10%' , '50 to +110°C' , '12  53 VDC');

insert into capacitores_electroliticos(id_componente , tipo , capacitancia
, tolerancia , rango_temperatura , rango_tension_nominal)values
(18 , 'Plomo Radial Encaje a Presión' , '110  1,200 µF' , '40/+10%' , '10 to +120°C' , '25  220 VDC');



-- ---------------------------------------------------------------------------
-- ---------------------------------------------------------------------------


-- ===========================================================
-- ======= TABLA RESISTORES DE ALTA FRECUENCIA ===============
-- ===========================================================

insert into resistores_alta_frecuencia(id_componente, capacitancia ,rango_tolerancia
, rango_resis_gral , rango_resis_microondas , capacitancia_parasita , rango_temperatura , tension_operativa
)values( 19 , '-' , ' +- 1, +- 5, +- 10, +- 20 standard' , '20 to 100' , '+- 100' , '-' , ' - 55 to + 125' , '100 max.');

 
insert into resistores_alta_frecuencia(id_componente, capacitancia ,rango_tolerancia
, rango_resis_gral , rango_resis_microondas , capacitancia_parasita , rango_temperatura , tension_operativa
)values( 20 , '4' , ' +- 40 standard' , '15 to 90' , '+- 120' , '-' , ' -' , '120 max.');



-- ---------------------------------------------------------------------------
-- ---------------------------------------------------------------------------


-- ==========================================================
-- ======= TABLA MICROCONTROLADORES_ESPECIF ===============
-- ==========================================================

insert into microcontroladores_especif (empaquetado, estilo_montaje, cantidad_entr_sal
, temp_funcionamiento, comunic_protocolos, frec_operacion) values
('Tray Alternate Packaging', 'SMD/SMT', '36 E/S', '-40°C ~ 85°C (TA)', 'I²C, SPI, UART/USART', ' DC-40 Mhz'),
('Standard Packaging', 'SMD/SMT', '40 E/S', '-60°C ~ 115°C (TA)', 'SPI, UART/USART', ' DC-40 Mhz'),
('Production Packaging', 'SMD/SMT', '50 E/S', '-80°C ~ 130°C (TA)', 'SPI, UART/USART', ' DC-50 Mhz'),
('Standard Packaging', 'SMD/SMT', '45 E/S', '-70°C ~ 115°C (TA)', 'UART/USART', ' DC-60 Mhz');


-- ---------------------------------------------------------------------------
-- ---------------------------------------------------------------------------


-- ==========================================================
-- ======= TABLA MICROCONTROLADORES_RISC_PICS ===============
-- ==========================================================

insert into microcontroladores_risc_pics(id_componente, id_especificacion
, memoria_programa , memoria_datos , memoria_datos_eeprom , cantidad_fuentes_interrup
, cantidad_timers, set_instrucciones ) values 
(21, 1 , '16384 bytes' , '768 bytes' , '256 bytes' , 19 , 4 
, '75 Instructions; 83 with Extended Instruction Set Enabled');



insert into microcontroladores_risc_pics(id_componente, id_especificacion
, memoria_programa , memoria_datos , memoria_datos_eeprom , cantidad_fuentes_interrup
, cantidad_timers, set_instrucciones ) values 
(22 , 2, '21444 bytes' , '1200 bytes' , '256 bytes' , 19 , 4
, '115 with Extended Instruction Set Enabled');



-- ---------------------------------------------------------------------------
-- ---------------------------------------------------------------------------


-- ==========================================================
-- ======= TABLA MICROCONTROLADORES_RISC_AVRS ===============
-- ==========================================================


insert into microcontroladores_risc_avrs(id_componente, id_especificacion
, tam_nucleo, tam_memoria_programa , tipo_memoria) values 
(23, 3, '8 bits' , '32KB (16K x 16)' , 'Memoria Flash');


insert into microcontroladores_risc_avrs(id_componente, id_especificacion
, tam_nucleo, tam_memoria_programa , tipo_memoria) values 
(24, 4, '8 bits' , '36KB (18K x 16)' , 'Memoria Flash');



-- ---------------------------------------------------------------------------
-- ---------------------------------------------------------------------------


-- ======================================
-- ======= TABLA PLACAS_ARDUINO =========
-- ======================================

insert into placas_arduinos(id_componente , procesador
, frec_mem , tam_flash , tam_sram , tam_eeprom , cantidad_entr_sal 
, comunic_protocolos ) values 
(25 ,'ATMega 16U2 ' , '16 MHz' , '32KB Flash' , '2 KB' , '1 KB' 
, 23 , 'I²C, SPI, UART/USART');


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

insert into placas_esp8266(id_componente , procesador
, frec_mem , tam_flash , tam_sram , cantidad_entr_sal , comunic_protocolos
, prot_wifi, rango_frec ) values 
(27 ,'CPU RISC de 32-bit: Tensilica Xtensa LX106 ' , '80 MHz' , '512 KB a 4 MB' , '64 KB'  
, 16 , 'UART/SDIO/SPI/I2C/I2S/IR Remote Control' ,'802.11 b/g/n' , '2.4G-2.5G (2400M-2483.5M)');


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

insert into placas_esp32(id_componente , procesador
, frec_mem , tam_flash , tam_sram  , comunic_protocolos
, prot_wifi, rango_frec, modo_wifi , seg_wifi , prot_bluetooth) values 
(29 ,' ARM Xtensa 32-bit' , '-' , '-' , '-'  
 , 'UART/HSPI/I2C/I2S/IR Remote Control' ,'802.11 b/g/n'
 , '(2400M ~ 2483.5M) ' , 'Station/SoftAP/SoftAP + Station' , 'WPA/WPA2'
 , 'Bluetooth v4.2 BR/EDR and BLE specification');


insert into placas_esp32(id_componente , procesador
, frec_mem , tam_flash , tam_sram  , comunic_protocolos
, prot_wifi, rango_frec, modo_wifi , seg_wifi , prot_bluetooth) values 
(30 ,'ARM Xtensa single-/dual-core 32-bit LX6' , '-' , '-' , '-'  
 , 'UART/SDIO/SPI/I2C/I2S/IR Remote Control' ,'802.11 b/g/n (802.11n up to 150 Mbps)'
 , '2.4G-2.5G ' , 'Station/SoftAP/SoftAP+Station/P2P' , 'WPA/WPA2/WPA2-Enterprise/WPS'
 , 'Bluetooth v4.2 BR/EDR and BLE specification');
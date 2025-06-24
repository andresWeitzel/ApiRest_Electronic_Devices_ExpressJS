/* -----------------------------------------
 * ------ DISPOSITIVOS ELECTRONICOS  ---------
 * -----------------------------------------
 * 
 * 
 * ========= DML UPDATES =============
 */


-- =====================================
-- ======= TABLA COMPONENTES ===========
-- =====================================


select * from componentes;
select * from componentes_detalles;
select * from information_schema.columns where table_name='componentes';

-- Actualizamos los codigos segun el ID
update componentes set codigo = 'HDGHFK-KSH13006' where id = 1;
update componentes set nro_pieza = 'KSH13006' where id = 1;

-- Actualizamos el stock para transistores según hoja de datos
update componentes as comp set stock = 450
from componentes_detalles as comp_det where 
(comp.categoria = 'Transistores BJT' 
and comp.id = comp_det.id_componente
and comp_det.hoja_de_datos = 'https://alltransistors.com/adv/pdfdatasheet_inchange_semiconductor/3cd010g.pdf');

-- Actualizamos el precio para capacitores segun hoja de datos y fabricante
update componentes as comp set precio = 12
from componentes_detalles as comp_det where 
(comp.categoria = 'Capacitores Electroliticos' 
and comp.id = comp_det.id_componente
and comp_det.hoja_de_datos = 'https://ar.mouser.com/c/ds/passive-components/capacitors/aluminum-electrolytic-capacitors/aluminum-electrolytic-capacitors-screw-terminal/'
and comp.fabricante = 'RUBYCON');

-- Actualizamos nombre de fabricante
update componentes  set fabricante = replace(fabricante, 'Renesas Electronics' , 'RENESAS ELECTRONICS');



-- ---------------------------------------------------------------------------
-- ---------------------------------------------------------------------------


-- ==============================================
-- ======= TABLA COMPONENTES_DETALLES ===========
-- ==============================================

select * from componentes;
select * from componentes_detalles;
select * from information_schema.columns where table_name='componentes_detalles';

select * from componentes_detalles as comp_det 
inner join componentes as comp
on comp_det.id_componente  = comp.id
where categoria = 'Resistores de Alta Frecuencia'; 


-- Actualizamos longitud, ancho y peso para resistores de alta frecuencia
update componentes_detalles as comp_det set longitud = '19.5mm', ancho='12.3mm', peso = '0.18 g'
from componentes as comp
where (comp_det.id_componente = comp.id 
and comp.categoria = 'Resistores de Alta Frecuencia'
and comp_det.hoja_de_datos = 'https://www.vishay.com/docs/61038/mif.pdf');


select * from componentes_detalles as comp_det 
inner join componentes as comp
on comp_det.id_componente  = comp.id
where categoria = 'Placas Arduino' and nro_pieza='UTT-ARDUINO-NANO';


-- Actualizamos material y voltajes para placas arduino según nro de pieza
update componentes_detalles as comp_det set material = 'Aluminio aleación'
, voltaje_recomendado='3 - 3.3 vdc', voltaje_min_entrada = '3 vdc'
, voltaje_max_entrada = '3.3 vdc'
from componentes as comp
where comp_det.id_componente  = comp.id 
and categoria = 'Placas Arduino' and nro_pieza='UTT-ARDUINO-NANO';

-- Reemplazamos el caracter 'a' por el  '-' del campo VOLTAJE_RECOMENDADO
update componentes_detalles set voltaje_recomendado = replace(voltaje_recomendado, 'a' , '-');

-- Reemplazamos vdc por VDC
update componentes_detalles set voltaje_recomendado = replace(voltaje_recomendado, 'vdc' , 'VDC');
update componentes_detalles set voltaje_min_entrada = replace(voltaje_min_entrada, 'vdc' , 'VDC');
update componentes_detalles set voltaje_max_entrada = replace(voltaje_max_entrada, 'vdc' , 'VDC');



-- ---------------------------------------------------------------------------
-- ---------------------------------------------------------------------------


-- ==============================================
-- ======= TABLA TRANSISTORES_BIPOLARES==========
-- ==============================================

select * from componentes;
select * from componentes_detalles;
select * from transistores_bipolares;
select * from information_schema.columns where table_name='transistores_bipolares';


select * from transistores_bipolares as trans_bip 
inner join componentes_detalles as comp_det
on trans_bip.id_componente = comp_det.id_componente
inner join componentes as comp
on comp_det.id_componente = comp.id
where comp.categoria = 'Transistores BJT' 
and comp_det.hoja_de_datos = 'https://category.alldatasheet.com/index.jsp?components=TRANSISTOR'
and trans_bip.tipo = 'NPN';

-- Actualizamos voltajes segun tipo de transistor
update transistores_bipolares as trans_bip
set voltaje_colec_emis = '-120 VDC', voltaje_colec_base = '-230 VDC'
, voltaje_emis_base = '-3.2 VDC', voltaje_colec_emis_sat = '-2.5 VDC'
from componentes as comp
inner join componentes_detalles as comp_det
on comp.id = comp_det.id_componente
where (comp.categoria = 'Transistores BJT' 
and comp_det.hoja_de_datos = 'https://category.alldatasheet.com/index.jsp?components=TRANSISTOR'
and trans_bip.tipo = 'NPN');

-- Obtenemos hoja de datos segun id_componente
select hoja_de_datos from componentes_detalles where id=5; 

-- Actualizamos corrientes y ganancias segun hoja de datos, tipo e id_componente
update transistores_bipolares as trans_bip
set corriente_colec  = '1.86 A', ganancia_hfe  = '110'
from componentes as comp
inner join componentes_detalles as comp_det
on comp.id = comp_det.id_componente
where (comp.categoria = 'Transistores BJT' 
and comp_det.hoja_de_datos = 'https://www.alldatasheet.com/datasheet-pdf/pdf/907361/ROHM/DTA143EMFHA.html'
and trans_bip.tipo = 'NPN'
and trans_bip.id_componente = 5);

-- Actualizamos disip_max y temp_juntura segun id_componente
update transistores_bipolares as trans_bip
set disip_max  = '15 W', temp_juntura  = '186� C'
from componentes as comp
inner join componentes_detalles as comp_det
on comp.id = comp_det.id_componente
where (trans_bip.id_componente = 2);


select * from transistores_bipolares;



-- ---------------------------------------------------------------------------
-- ---------------------------------------------------------------------------


-- =============================================
-- ======= TABLA TRANSISTORES_MOSFET ===========
-- =============================================

select * from componentes;
select * from componentes_detalles;
select * from transistores_mosfet;
select * from information_schema.columns where table_name='transistores_mosfet';



-- Actualizar todas las especificaciones seg�n id_componente y tipo
update transistores_mosfet as trans_mosf
set corriente_cc_drenaje = '10.4 A'
, disip_max = '35 W'
, temp_op_max = '170 �C'
, conduct_drenaje_sustrato = '95 (118) pF'
, resist_drenaje_fuente = '0.178 (0.142) Ohm'
from componentes as comp
inner join componentes_detalles as comp_det
on comp.id = comp_det.id_componente
where (trans_mosf.id_componente = 9 and tipo = 'pMOS');


-- Actualizar todas las especificaciones seg�n id_componente y tipo
update transistores_mosfet as trans_mosf
set voltaje_drenaje_fuente = '120 VDC'
,corriente_cc_drenaje = '22.2 A'
, disip_max = '55 W'
, temp_op_max = '250 �C'
, conduct_drenaje_sustrato = '120 (135) pF'
, resist_drenaje_fuente = '1.872 (1.242) Ohm'
from componentes as comp
inner join componentes_detalles as comp_det
on comp.id = comp_det.id_componente
where (trans_mosf.id_componente = 10 and tipo = 'nMOS');


select * from transistores_mosfet;



-- ---------------------------------------------------------------------------
-- ---------------------------------------------------------------------------


-- ====================================================
-- ======= TABLA CAPACITORES_ELECTROLITICOS ===========
-- ====================================================

select * from componentes;
select * from componentes_detalles;
select * from capacitores_electroliticos;
select * from information_schema.columns where table_name='capacitores_electroliticos';

-- Actualizamos capac y toler seg�n id_componente y hoja de datos
update capacitores_electroliticos as cap_electr
set capacitancia = '22 �F a 12000 �F'
, tolerancia = '5/+20%'
from componentes as comp
inner join componentes_detalles as comp_det
on comp.id = comp_det.id_componente
where (cap_electr.id_componente=11
and comp_det.hoja_de_datos='https://ar.mouser.com/datasheet/2/427/136rvi-2888792.pdf');

--Actualizamos todos los registros de rango_temp
update capacitores_electroliticos set rango_temperatura  = 
replace(rango_temperatura , '+' , ' to ');


-- Actualizamos rango_temp y rango_tension seg�n id y tipo
update capacitores_electroliticos as cap_electr
set rango_temperatura = '50 to 145�C'
, rango_tension_nominal = '25-63 VDC'
from componentes as comp
inner join componentes_detalles as comp_det
on comp.id = comp_det.id_componente
where (cap_electr.id=2 and cap_electr.tipo='Plomo Axial');




-- ---------------------------------------------------------------------------
-- ---------------------------------------------------------------------------


-- ====================================================
-- ======= TABLA RESISTORES_ALTA_FRECUENCIA ===========
-- ====================================================

select * from componentes;
select * from componentes_detalles;
select * from resistores_alta_frecuencia;
select * from information_schema.columns where table_name='resistores_alta_frecuencia';

-- Actualizamos todos los campos del registro seg�n id
update resistores_alta_frecuencia as res_alt_frec
set capacitancia = '12 �F'
, rango_tolerancia = ' +- 1%, +- 5%, +- 10%, +- 20%'
, rango_resis_gral = '20 to 100 Ohms'
, rango_resis_microondas = '+- 100 Ohms'
, capacitancia_parasita = '0.05 �F'
, rango_temperatura = '-55 / +125 �C'
, tension_operativa = '110 Vmax'
from componentes as comp
inner join componentes_detalles as comp_det
on comp.id = comp_det.id_componente
where (res_alt_frec.id = 1);


-- Actualizamos todos los campos del registro seg�n id
update resistores_alta_frecuencia as res_alt_frec
set capacitancia = '4 �F'
, rango_tolerancia = ' +- 40%'
, rango_resis_gral = '15 to 90 Ohms'
, rango_resis_microondas = '+- 120 Ohms'
, capacitancia_parasita = '0.08 �F'
, rango_temperatura = '-80 / +150 �C'
, tension_operativa = '120 Vmax'
from componentes as comp
inner join componentes_detalles as comp_det
on comp.id = comp_det.id_componente
where (res_alt_frec.id = 2);



-- ---------------------------------------------------------------------------
-- ---------------------------------------------------------------------------


-- ==========================================================
-- ======= TABLA MICROCONTROLADORES_ESPECIF ===============
-- ==========================================================

select * from componentes;
select * from componentes_detalles;
select * from microcontroladores_especif;
select * from information_schema.columns where table_name='microcontroladores_especif';

--Actualizamos todos los registros para temp_funcionamiento
update microcontroladores_especif set temp_funcionamiento  = 
replace(temp_funcionamiento , '~' , 'to');

--Actualizamos todos los registros para frec_operacion
update microcontroladores_especif set frec_operacion  = 
replace(frec_operacion , 'DC-' , '');
update microcontroladores_especif set frec_operacion  = 
replace(frec_operacion , 'Mhz' , 'Mhz (DC)');



-- ---------------------------------------------------------------------------
-- ---------------------------------------------------------------------------


-- ==========================================================
-- ======= TABLA MICROCONTROLADORES_RISC_PICS ===============
-- ==========================================================
select * from componentes;
select * from componentes_detalles;
select * from microcontroladores_risc_pics;
select * from information_schema.columns where table_name='microcontroladores_risc_pics';

update microcontroladores_risc_pics as micr_risc_pics 
set memoria_programa = '16700 bytes'
, memoria_datos = '800 bytes', memoria_datos_eeprom = '256 bytes'
, cantidad_fuentes_interrup = '22', cantidad_timers = '6'
, set_instrucciones = '75 Instructions; 83 with Extended Instruction Set Enabled.'
from componentes as comp
inner join componentes_detalles as comp_det
on comp.id = comp_det.id_componente
where micr_risc_pics.id_componente = 22;

-- ---------------------------------------------------------------------------
-- ---------------------------------------------------------------------------


-- ==========================================================
-- ======= TABLA MICROCONTROLADORES_RISC_AVRS ===============
-- ==========================================================
select * from componentes;
select * from componentes_detalles;
select * from microcontroladores_risc_avrs;
select * from information_schema.columns where table_name='microcontroladores_risc_avrs';

update microcontroladores_risc_avrs as micr_risc_avrs 
set tam_nucleo = '8 bits'
, tam_memoria_programa = '32KB (16K x 16)'
, tipo_memoria = 'Memoria Flash'
from componentes as comp
inner join componentes_detalles as comp_det
on comp.id = comp_det.id_componente
where micr_risc_avrs.id_especificacion = 3;

-- ---------------------------------------------------------------------------
-- ---------------------------------------------------------------------------


-- ======================================
-- ======= TABLA PLACAS_ARDUINO =========
-- ======================================

select * from componentes;
select * from componentes_detalles;
select * from placas_arduinos;
select * from information_schema.columns where table_name='placas_arduinos';

update placas_arduinos as plac_ard
set procesador = 'ATMega 18U2'
, frec_mem = '17-18 MHz'
, tam_flash = '32 KB'
, tam_sram = '2 KB'
from componentes as comp
inner join componentes_detalles as comp_det
on comp.id = comp_det.id_componente
where plac_ard.id_componente = 25;


-- ---------------------------------------------------------------------------
-- ---------------------------------------------------------------------------


-- ======================================
-- ======= TABLA PLACAS_ESP8266 =========
-- ======================================

select * from componentes;
select * from componentes_detalles;
select * from placas_esp8266;
select * from information_schema.columns where table_name='placas_esp8266';

update placas_esp8266 as plac_esp8266
set procesador = 'CPU RISC de 32-bit: Tensilica Xtensa LX109'
, frec_mem = '80-90 MHz'
, tam_flash = '600 KB a 4 MB'
, tam_sram = '64 KB'
from componentes as comp
inner join componentes_detalles as comp_det
on comp.id = comp_det.id_componente
where plac_esp8266.id_componente = 27;

-- ---------------------------------------------------------------------------
-- ---------------------------------------------------------------------------


-- ====================================
-- ======= TABLA PLACAS_ESP32 =========
-- ====================================

select * from componentes;
select * from componentes_detalles;
select * from placas_esp32;
select * from information_schema.columns where table_name='placas_esp32';

update placas_esp32 as plac_esp32
set procesador = 'ARM Xtensa 32-bit | dua-core 32 bits'
, frec_mem = '40-80 MHz'
, tam_flash = '16 MB'
, tam_sram = '230 KB'
, cantidad_entr_sal = 12
from componentes as comp
inner join componentes_detalles as comp_det
on comp.id = comp_det.id_componente
where plac_esp32.id_componente = 29;

update placas_esp32 as plac_esp32
set frec_mem = '40-90 MHz'
, tam_flash = '14-18 MB'
, tam_sram = '270 KB'
, cantidad_entr_sal = 12
from componentes as comp
inner join componentes_detalles as comp_det
on comp.id = comp_det.id_componente
where plac_esp32.id_componente = 30;
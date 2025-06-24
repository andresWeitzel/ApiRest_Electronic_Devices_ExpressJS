/* -----------------------------------------
 * ------ DISPOSITIVOS ELECTRONICOS  ---------
 * -----------------------------------------
 * 
 * 
 * ========= DML QUERIES =============
 */


-- =====================================
-- ======= TABLA COMPONENTES ===========
-- =====================================

select * from componentes;
select * from componentes_detalles;
select * from information_schema.columns where table_name='componentes';

--select all transistor bjt components
select * from componentes comp where lower(categoria) = lower('transistores bjt');

--select all transistor bjt npn components
select * from componentes comp where lower(categoria) = lower('transistores bjt') 
and (lower(descripcion) like lower('%npn%'));

--select all transistor bjt pnp components
select * from componentes comp where lower(categoria) = lower('transistores bjt') 
and (lower(descripcion) like lower('%pnp%'));

--select all bjt transistor components with stock greater than 100 
select * from componentes comp where lower(categoria) = lower('transistores bjt') and stock >= 100;

--select all bjt transistor components with stock less than 100 
select * from componentes comp where lower(categoria) = lower('transistores bjt') and stock < 100;

--select all bjt transistor components with stock greater than 100 and price less than 6
select * from componentes comp where lower(categoria) = lower('transistores bjt') 
and stock >= 100 and precio < 6;

--select all bjt transistor components with inchange manufacturer
select * from componentes comp where lower(fabricante) like lower('%shantou%');
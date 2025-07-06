const {
  checkOrderBy,
  checkOrderAt
} = require('../../../../helpers/pagination/mosfet-transistor/mosfet-transistor');

describe('MOSFET Transistor Pagination Helpers', () => {
  describe('checkOrderBy', () => {
    it('should return "id" for valid id field', async () => {
      const result = await checkOrderBy('id');
      expect(result).toBe('id');
    });

    it('should return "id" for ID (uppercase)', async () => {
      const result = await checkOrderBy('ID');
      expect(result).toBe('id');
    });

    it('should return "tipo" for valid tipo field', async () => {
      const result = await checkOrderBy('tipo');
      expect(result).toBe('tipo');
    });

    it('should return "tipo" for TIPO (uppercase)', async () => {
      const result = await checkOrderBy('TIPO');
      expect(result).toBe('tipo');
    });

    it('should return "voltaje_drenaje_fuente" for valid voltage field', async () => {
      const result = await checkOrderBy('voltaje_drenaje_fuente');
      expect(result).toBe('voltaje_drenaje_fuente');
    });

    it('should return "voltaje_drenaje_fuente" for VOLTAJE_DRENAJE_FUENTE (uppercase)', async () => {
      const result = await checkOrderBy('VOLTAJE_DRENAJE_FUENTE');
      expect(result).toBe('voltaje_drenaje_fuente');
    });

    it('should return "corriente_cc_drenaje" for valid current field', async () => {
      const result = await checkOrderBy('corriente_cc_drenaje');
      expect(result).toBe('corriente_cc_drenaje');
    });

    it('should return "corriente_cc_drenaje" for CORRIENTE_CC_DRENAJE (uppercase)', async () => {
      const result = await checkOrderBy('CORRIENTE_CC_DRENAJE');
      expect(result).toBe('corriente_cc_drenaje');
    });

    it('should return "disip_max" for valid dissipation field', async () => {
      const result = await checkOrderBy('disip_max');
      expect(result).toBe('disip_max');
    });

    it('should return "disip_max" for DISIP_MAX (uppercase)', async () => {
      const result = await checkOrderBy('DISIP_MAX');
      expect(result).toBe('disip_max');
    });

    it('should return "temp_op_max" for valid temperature field', async () => {
      const result = await checkOrderBy('temp_op_max');
      expect(result).toBe('temp_op_max');
    });

    it('should return "temp_op_max" for TEMP_OP_MAX (uppercase)', async () => {
      const result = await checkOrderBy('TEMP_OP_MAX');
      expect(result).toBe('temp_op_max');
    });

    it('should return "conduct_drenaje_sustrato" for valid conductance field', async () => {
      const result = await checkOrderBy('conduct_drenaje_sustrato');
      expect(result).toBe('conduct_drenaje_sustrato');
    });

    it('should return "conduct_drenaje_sustrato" for CONDUCT_DRENAJE_SUSTRATO (uppercase)', async () => {
      const result = await checkOrderBy('CONDUCT_DRENAJE_SUSTRATO');
      expect(result).toBe('conduct_drenaje_sustrato');
    });

    it('should return "resist_drenaje_fuente" for valid resistance field', async () => {
      const result = await checkOrderBy('resist_drenaje_fuente');
      expect(result).toBe('resist_drenaje_fuente');
    });

    it('should return "resist_drenaje_fuente" for RESIST_DRENAJE_FUENTE (uppercase)', async () => {
      const result = await checkOrderBy('RESIST_DRENAJE_FUENTE');
      expect(result).toBe('resist_drenaje_fuente');
    });

    it('should return null for invalid field', async () => {
      const result = await checkOrderBy('invalid_field');
      expect(result).toBeNull();
    });

    it('should return null for number input', async () => {
      const result = await checkOrderBy(123);
      expect(result).toBeNull();
    });

    it('should return null for boolean input', async () => {
      const result = await checkOrderBy(true);
      expect(result).toBeNull();
    });

    it('should return null for null input', async () => {
      const result = await checkOrderBy(null);
      expect(result).toBeNull();
    });

    it('should return null for undefined input', async () => {
      const result = await checkOrderBy(undefined);
      expect(result).toBeNull();
    });

    it('should return null for empty string', async () => {
      const result = await checkOrderBy('');
      expect(result).toBeNull();
    });

    it('should return null for multiple arguments', async () => {
      const result = await checkOrderBy('tipo', 'id', 'voltaje');
      expect(result).toBe('tipo');
    });
  });

  describe('checkOrderAt', () => {
    it('should return "ASC" for valid ASC value', async () => {
      const result = await checkOrderAt('ASC');
      expect(result).toBe('ASC');
    });

    it('should return "ASC" for asc (lowercase)', async () => {
      const result = await checkOrderAt('asc');
      expect(result).toBe('ASC');
    });

    it('should return "ASC" for Asc (mixed case)', async () => {
      const result = await checkOrderAt('Asc');
      expect(result).toBe('ASC');
    });

    it('should return "DESC" for valid DESC value', async () => {
      const result = await checkOrderAt('DESC');
      expect(result).toBe('DESC');
    });

    it('should return "DESC" for desc (lowercase)', async () => {
      const result = await checkOrderAt('desc');
      expect(result).toBe('DESC');
    });

    it('should return "DESC" for Desc (mixed case)', async () => {
      const result = await checkOrderAt('Desc');
      expect(result).toBe('DESC');
    });

    it('should return null for invalid order direction', async () => {
      const result = await checkOrderAt('INVALID');
      expect(result).toBeNull();
    });

    it('should return null for number input', async () => {
      const result = await checkOrderAt(123);
      expect(result).toBeNull();
    });

    it('should return null for boolean input', async () => {
      const result = await checkOrderAt(true);
      expect(result).toBeNull();
    });

    it('should return null for null input', async () => {
      const result = await checkOrderAt(null);
      expect(result).toBeNull();
    });

    it('should return null for undefined input', async () => {
      const result = await checkOrderAt(undefined);
      expect(result).toBeNull();
    });

    it('should return null for empty string', async () => {
      const result = await checkOrderAt('');
      expect(result).toBeNull();
    });

    it('should return null for multiple arguments', async () => {
      const result = await checkOrderAt('ASC', 'DESC', 'INVALID');
      expect(result).toBe('ASC');
    });
  });
}); 
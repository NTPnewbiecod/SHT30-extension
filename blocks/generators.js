Blockly.Python['sht30_read'] = function (block) {
  Blockly.Python.definitions_['import_SHT30'] = 'import SHT30';

  var dropdown_addr = block.getFieldValue('addr');
  var dropdown_type = block.getFieldValue('type');

  var code = `SHT30.read(${dropdown_addr})[${dropdown_type}]`;
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.JavaScript['sht30_read'] = function (block) {
  Blockly.JavaScript.definitions_['include']['Wire.h'] = '#include <Wire.h>';
  Blockly.JavaScript.definitions_['include']['ArtronShop_SHT3x.h'] = '#include <ArtronShop_SHT3x.h>';

  var dropdown_addr = block.getFieldValue('addr');
  var dropdown_type = block.getFieldValue('type');

  var functionName = Blockly.JavaScript.provideFunction_(
    'SHT30_read',
    [
      'float ' + Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_ + '(uint8_t addr, uint8_t type) {',
      '  static ArtronShop_SHT3x * sht3x = NULL;',
      '  static uint8_t last_addr = 0;',
      '  if ((!sht3x) || (last_addr != addr)) {',
      '    if (sht3x) {',
      '      delete sht3x;',
      '      sht3x = NULL;',
      '    }',
      '    sht3x = new ArtronShop_SHT3x(addr, &Wire);',
      '    Wire.begin();',
      '    sht3x->begin();',
      '    last_addr = addr;',
      '  }',
      '  sht3x->measure();',
      '  return type == 0 ? sht3x->temperature() : sht3x->humidity();',
      '}'
    ]);

  var value_pin = Blockly.JavaScript.valueToCode(block, 'pin', Blockly.JavaScript.ORDER_ATOMIC);
  var code = `${functionName}(${value_pin})`;

  var code = `${functionName}(${dropdown_addr}, ${dropdown_type})`;
  return [code, Blockly.JavaScript.ORDER_NONE];
};

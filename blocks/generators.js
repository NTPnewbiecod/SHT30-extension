Blockly.Python['sht30_read'] = function (block) {
  Blockly.Python.definitions_['import_SHT30'] = 'import SHT30';

  var dropdown_addr = block.getFieldValue('addr');
  var dropdown_type = block.getFieldValue('type');

  var code = `SHT30.read(${dropdown_addr})[${dropdown_type}]`;
  return [code, Blockly.Python.ORDER_NONE];
};

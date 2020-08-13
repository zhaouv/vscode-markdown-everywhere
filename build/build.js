const { rules } = require('./rules');
require('./generateGrammar').updateGrammars(rules);
require('./generateInjection').updateInjection(rules);
require('./generateDocs').updateDocs(rules);
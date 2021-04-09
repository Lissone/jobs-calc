const { EntitySchema} = require('typeorm')

module.exports = new EntitySchema ({
  name: 'Jobs',
  tableName: 'jobs',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true
    },
    name: {
      type: 'varchar'
    },
    daily_hours: {
      type: 'int'
    },
    total_hours: {
      type: 'int'
    },
    created_at: {
      type: 'datetime'
    }
  }
})
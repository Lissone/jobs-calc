const { EntitySchema } = require('typeorm')

module.exports = new EntitySchema ({
  name: 'Profile',
  tableName: 'profile',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true
    },
    name: {
      type: 'varchar'
    },
    avatar: {
      type: 'varchar'
    },
    monthly_budget: {
      type: 'int'
    },
    days_per_week: {
      type: 'int'
    },
    hours_per_day: {
      type: 'int'
    },
    vacation_per_year: {
      type: 'int'
    },
    value_hour: {
      type: 'int'
    }
  }
})
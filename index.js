const assert = require('assert')
const url = require('url')
const rp = require('request-promise')

describe('object operations', () => {
  let data

  before(async () => {
    /**
     * INSTRUCTIONS:
     *
     * - Visit https://www.coindesk.com/api
     * - You will find "Historical BPI data" at the bottom of the page with instructions on composing the query
     * - Make a request for prices between January 1, 2019 - January 31, 2019
     * - Populate the params to complete the request (you don't have to use the `url` package)
     * - Attach the response to the data variable defined above
     */
    const params = {
      uri: "https://api.coindesk.com/v1/bpi/historical/close.json?start=2019-01-01&end=2019-01-31",
      json: true
    }

    const {bpi} = await rp(params) || {}
    data = bpi
    // NOTE: you might find it useful to log the response here
  })

  it('should handle basic arithmetic', () => {
    /**
     * NOTE:
     *
     * The first test has been completed for demonstration.
     * It should pass if the query is acurate
     */
    const actual = Object.keys(data).reduce((sum, date) => sum + data[date], 0)
    const expected = 114390.02239999999
    assert.equal(actual, expected)
  })

  it('should create new object', () => {
    /**
     * INSTRUCTIONS:
     *
     * Extract only the results from Mondays
     * See expected result below
     */
    Object.filter = (obj, predicate) => 
      Object.assign(...Object.keys(obj)
        .filter( key => predicate(key) )
        .map( key => ({ [key]: obj[key] })
        )
      );

    const actual = Object.filter(data, date => new Date(date).getDay() == 2)
    const expected = {
      '2019-01-01': 3869.47,
      '2019-01-08': 4029.9917,
      '2019-01-15': 3604.1333,
      '2019-01-22': 3598.2183,
      '2019-01-29': 3421.12
    }
    assert.deepEqual(actual, expected)
  })

  it('should handle finding', () => {
    /**
     * INSTRUCTIONS:
     *
     * Find the top value (Number) from any date
     * See expected result below
     */
    const actual = Math.max(...Object.values(data))
    const expected = 4083.165
    assert.equal(actual, expected)
  })

  it('should handle sorting', () => {
    /**
     * INSTRUCTIONS:
     *
     * Return the top 5 dates in descending order
     * See expected result below
     */
    Object.custom_sort = (obj) => 
      Object.assign(...Object.keys(obj)
        .sort((a, b) => obj[b] - obj[a])
        .slice(0, 5)
        .map( key => ({ [key]: obj[key] })
        )
      );

    const actual = Object.custom_sort(data)
    const expected = {
      '2019-01-06': 4083.165,
      '2019-01-07': 4041.4583,
      '2019-01-08': 4029.9917,
      '2019-01-09': 4028.2917,
      '2019-01-02': 3941.2167
    }
    assert.deepEqual(actual, expected)
  })
})
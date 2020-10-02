/**
 
 ** Exercise 2: What 's your Monday worth? **
 
 Write a function that finds out what your hourly rate on a Monday would be
 Use the map array function to take out the duration time for each task.
 Avoid using for loop or forEach.
 Multiply each duration by a per - hour rate for billing and sum it all up.
 Output a formatted Euro amount, rounded to Euro cents, e.g: €11.34.
 Make sure the function can be used on any array of objects that contain a duration property with a number value

 */

// Write a function that finds out what your hourly rate on a Monday would be

// I suppose, the task actually was to find the total sum for the day
// because 'hourly rate' is already known from the func parameter
function dayWorth(tasks, hourlyRate) {
  // put your code in here, the function does returns a euro formatted string
  if (!Array.isArray(tasks) || !isFinite(hourlyRate))
    throw new TypeError('Wrong parameter types in dayWorth()')
  const minuteRate = hourlyRate / 60
  const totalSum = tasks.map(object => {
    if (!object.hasOwnProperty('duration'))
      throw new TypeError('Object in passed array has to have "duration" property')
    if (!isFinite(object.duration))
      throw new TypeError('Value of a "duration" property must be a number')
    return object.duration * minuteRate
  }).reduce((s, x) => s + x, 0)
  return `€${totalSum.toFixed(2)}`
}

const mondayTasks = [{
  name: 'Daily standup',
  duration: '30', // specified in minutes
},
{
  name: 'Feature discussion',
  duration: 120,
},
{
  name: 'Development time',
  duration: 240,
},
{
  name: 'Talk to different members from the product team',
  duration: 60,
},
];
try {
  console.log(dayWorth(mondayTasks, '25'))
  console.log(dayWorth(mondayTasks, 13.37))
} catch (error) {
  console.log(error.message)
}
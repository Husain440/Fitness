const express = require('express');
const cors = require('cors');

const app = express();
const port = 3010;

app.use(cors());

let activities = [
  { activityId: 1, type: 'Running', duration: 30, caloriesBurned: 300 },
  { activityId: 2, type: 'Swimming', duration: 45, caloriesBurned: 400 },
  { activityId: 3, type: 'Cycling', duration: 60, caloriesBurned: 500 },
];

app.get('/activities/add', (req, res) => {
  const activityId = parseInt(req.query.activityId);
  const type = req.query.type;
  const duration = parseInt(req.query.duration);
  const caloriesBurned = parseInt(req.query.caloriesBurned);

  const task = {
    activityId: activityId,
    type: type,
    duration: duration,
    caloriesBurned: caloriesBurned,
  };
  activities.push(task);
  res.json({ activities: activities });
});

app.get('/activities/sort-by-duration', (req, res) => {
  const copyActivities = [...activities];
  const result = copyActivities.sort((a, b) => {
    return a.duration - b.duration;
  });
  res.json({ activities: result });
});

app.get('/activities/filter-by-type', (req, res) => {
  const type = req.query.type;
  const result = activities.filter((activity) => {
    return activity.type === type;
  });
  res.json({ activities: result });
});

app.get('/activities/total-calories', (req, res) => {
  let sum = 0;
  for (let i = 0; i < activities.length; i++) {
    sum = sum + activities[i].caloriesBurned;
  }
  res.json({ totalCaloriesBurned: sum });
});

app.get('/activities/update-duration', (req, res) => {
  const activityId = parseInt(req.query.activityId);
  const duration = parseInt(req.query.duration);
  for (let i = 0; i < activities.length; i++) {
    if (activities[i].activityId === activityId) {
      activities[i].duration = duration;
    }
  }
  res.json({ activities: activities });
});

app.get('/activities/delete', (req, res) => {
  const activityId = parseInt(req.query.activityId);
  const result = activities.filter((activity) => {
    return activity.activityId != activityId;
  });
  res.json({ activities: result });
});

app.get('/activities/delete-by-type', (req, res) => {
  const type = req.query.type;
  const result = activities.filter((activity) => {
    return activity.type != type;
  });
  res.json({ activities: result });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

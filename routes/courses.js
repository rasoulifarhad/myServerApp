var express = require('express');
var router = express.Router();

var data = require('../db-data')
const {COURSES} = data; 

router.get('/', (req, res, next) => {
	res.json({ payload:Object.values(COURSES).sort( (c1, c2) => c1.seqNo - c2.seqNo )})
});

router.get('/:id', (req, res, next) => {
	const courseId = req.params["id"];
	const courses = Object.values(COURSES);
	const course = courses.find((course) => course.id === courseId);
	res.status(200).json(course);
});

module.exports = router;
  
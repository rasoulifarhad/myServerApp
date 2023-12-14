var express = require('express');
var router = express.Router();
var data = require('../db-data')
const {COURSES, LESSONS} = data; 

router.get('/', (req, res, next) =>{
	const queryParams = req.query;
	const courseId = queryParams.courseId,
		  filter = queryParams.filter || '',
		  sortOrder = queryParams.sortOrder,
		  pageNumber = parseInt(queryParams.pageNumber),
		  pageSize = parseInt(queryParams.pageSize),
		  sortColumn = queryParams.sortColumn ?? "seqNo";
  
  
		  let lessons = Object.values(LESSONS)
			  .filter(lesson => lesson.courseId === courseId)
			  .sort((l1, l2) => {
				if(l1[sortColumn] > l2[sortColumn]) {
				  return 1;
				} else if(l1[sortColumn] < l2[sortColumn]) {
				  return -1
				} else {
				  return 0;
				}
			  });
  
			  if (filter) {
				lessons = lessons.filter(lesson => lesson.description.trim().toLowerCase().search(filter.toLowerCase()) >= 0);
			 }
  
			 if (sortOrder == "desc") {
				 lessons = lessons.reverse();
			 }
  
			 const initialPos = pageNumber * pageSize;
  
			 const lessonsPage = lessons.slice(initialPos, initialPos + pageSize);
  
			 setTimeout(() => {
				 res.status(200).json({payload: lessonsPage});
			 },1000);
  
});

module.exports = router;
  
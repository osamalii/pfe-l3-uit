// const express = require('express');
// const router = express.Router();
// const City = require('../models/User');
//
// const query = async cityname => {
//     const queryResult = await City.aggregate([])
//         .search({
//             autocomplete: {
//                 path: 'lastname',
//                 query: cityname
//             }
//         })
//         .limit(5);
//     return queryResult;
// };
//
// router.get('/:city', (req, res)=>{
//    console.log(req.params);
//    query(req.params.city).then(e => console.log(e));
// });
//
// module.exports = router;

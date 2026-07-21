import express from 'express'

import { createChapter , ViewAllChapter , Chapter ,updateChapter,deleteChapter } from '../Controllers/chapterController.js'

 const chapterRoutes = express.Router()

chapterRoutes.post('/createChapter',createChapter)


chapterRoutes.get("/chapters",ViewAllChapter)

chapterRoutes.get("/chapter/:id",Chapter)

chapterRoutes.put("/UpdateChapter/:id",updateChapter)

chapterRoutes.delete("/deleteChapter/:id",deleteChapter)


export default chapterRoutes
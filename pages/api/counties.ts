import fs from 'fs'
import data from '../../data/counties.json'
export default async function(req, res) {
   try {
      // Do stuff
      res.status(200).json(data)
   } catch (error) {
      console.log(error)
      res.status(500).json({
         error: 'Error reading data'
      })
   }
}
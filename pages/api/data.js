var data = []
export default (req, res) => {
    console.log('req')
    console.log(req)
    console.log('req.body')
    console.log(req.body)
    console.log('res.json')
    console.log(res.json)
    if (req.method === 'POST') {
      // Process a POST request
      res.status(200).json('ok')
      
      
    } else if(req.method === 'GET') {
      // Handle any other HTTP method
      res.status(200).json('ok')
    }else{
        res.status(404).json('paila')
    }
    
    
  }